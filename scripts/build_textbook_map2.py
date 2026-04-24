import json
import re
import os

base = r'C:\Users\haro\.openclaw\workspace\fe-exam-study\src\data'

# Only the 3 failing categories
cat_files = {
    'database': 'fe-database.ts',
    'network': 'fe-network.ts',
    'project-mgmt': 'fe-project-mgmt.ts',
}

tb_files = {
    'database': 'textbook-database.json',
    'network': 'textbook-network.json',
    'project-mgmt': 'textbook-project-mgmt.json',
}

def parse_ts_array(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    eq_idx = content.index('=')
    arr_start = content.index('[', eq_idx)

    depth = 0
    arr_end = arr_start
    for i in range(arr_start, len(content)):
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                arr_end = i + 1
                break

    arr = content[arr_start:arr_end]

    # Better TS to JSON conversion
    # Replace 'strings' with "strings", handling escaped chars
    result = []
    i = 0
    while i < len(arr):
        c = arr[i]
        if c == "'":
            # Start of single-quoted string
            j = i + 1
            chars = []
            while j < len(arr):
                if arr[j] == "'" and arr[j-1:j] != "\\":
                    break
                if arr[j] == "\\" and j + 1 < len(arr):
                    next_c = arr[j + 1]
                    if next_c == "'":
                        chars.append("'")
                        j += 2
                        continue
                    elif next_c == "n":
                        chars.append("\n")
                        j += 2
                        continue
                    elif next_c == "t":
                        chars.append("\t")
                        j += 2
                        continue
                chars.append(arr[j])
                j += 1
            val = ''.join(chars)
            # Escape double quotes for JSON
            val = val.replace('"', '\\"')
            result.append('"' + val + '"')
            i = j + 1
        elif c == '"':
            # Already double-quoted string - keep as is
            j = i + 1
            chars = ['"']
            while j < len(arr) and arr[j] != '"':
                if arr[j] == "\\" and j + 1 < len(arr):
                    chars.append(arr[j])
                    chars.append(arr[j + 1])
                    j += 2
                    continue
                chars.append(arr[j])
                j += 1
            chars.append('"')
            result.append(''.join(chars))
            i = j + 1
        else:
            result.append(c)
            i += 1

    json_str = ''.join(result)

    # Add quotes around unquoted keys
    json_str = re.sub(r'\b(\w+)\s*:', r'"\1":', json_str)

    # Remove trailing commas
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

    try:
        data = json.loads(json_str)
        return data
    except json.JSONDecodeError as e:
        print(f"  Parse error at pos {e.pos}: {e.msg}")
        start = max(0, e.pos - 100)
        end = min(len(json_str), e.pos + 100)
        print(f"  Context: ...{json_str[start:end]}...")
        # Try to fix: replace unescaped quotes inside strings
        # Find the problematic area and fix
        return []


def main():
    existing_path = os.path.join(base, 'textbook-question-map.json')
    with open(existing_path, 'r', encoding='utf-8') as f:
        result = json.load(f)

    for cat, ts_file in cat_files.items():
        ts_path = os.path.join(base, ts_file)
        tb_path = os.path.join(base, tb_files[cat])

        print(f"Processing {cat}...")

        questions = parse_ts_array(ts_path)
        print(f"  Parsed {len(questions)} questions")

        if not questions:
            continue

        with open(tb_path, 'r', encoding='utf-8') as f:
            topics = json.load(f)

        tq = {}
        for topic in topics:
            tq[topic['topicId']] = []

        for q in questions:
            text_parts = [q.get('question', ''), q.get('explanation', '')]
            for opt in q.get('options', []):
                text_parts.append(opt.get('text', ''))
            text = ' '.join(text_parts).lower()

            for topic in topics:
                kws = [kw for kw in topic['keywords'] if len(kw) >= 2]
                score = 0
                for kw in kws:
                    if kw.lower() in text:
                        score += 1
                title_words = [w for w in re.split(r'[\(\)\uff0f]', topic['title']) if len(w) >= 2]
                for tw in title_words:
                    if tw.lower() in text:
                        score += 2
                if score >= 2:
                    tq[topic['topicId']].append(q['id'])

        matched = sum(1 for v in tq.values() if v)
        print(f"  Matched {matched}/{len(topics)} topics")

        result[cat] = tq

    with open(existing_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nUpdated {existing_path}")
    total_topics = 0
    total_matched = 0
    total_qs = 0
    for cat, topics in result.items():
        m = sum(1 for v in topics.values() if v)
        total_topics += len(topics)
        total_matched += m
        total_qs += len([x for v in topics.values() for x in v])
    print(f"Total: {total_matched}/{total_topics} topics, {total_qs} question links")


if __name__ == '__main__':
    main()
