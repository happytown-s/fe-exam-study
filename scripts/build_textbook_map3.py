import json
import re
import os

base = r'C:\Users\haro\.openclaw\workspace\fe-exam-study\src\data'

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

    # Step 1: Convert single-quoted strings to double-quoted
    # But ONLY at the top level (property values), not inside strings
    result = []
    i = 0
    while i < len(arr):
        c = arr[i]
        if c == "'":
            # Find matching close quote
            j = i + 1
            chars = []
            while j < len(arr) and arr[j] != "'":
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
            result.append('"' + val + '"')
            i = j + 1
        else:
            result.append(c)
            i += 1

    json_str = ''.join(result)

    # Step 2: Add quotes around unquoted keys
    # Only match keys that are NOT inside strings
    # A key is: at the start of a line (after whitespace) followed by :
    # and is NOT already quoted
    # Better approach: match word: only when preceded by { , or newline
    json_str = re.sub(r'(?<=[\{\n,])\s*(\w+)\s*:', lambda m: m.group(0).replace(m.group(1), '"' + m.group(1) + '"'), json_str)

    # Step 3: Remove trailing commas
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

    try:
        data = json.loads(json_str)
        return data
    except json.JSONDecodeError as e:
        print(f"  Parse error at pos {e.pos}: {e.msg}")
        start = max(0, e.pos - 100)
        end = min(len(json_str), e.pos + 100)
        snippet = json_str[start:end]
        print(f"  Context: ...{snippet}...")
        # Find what's wrong
        line_start = json_str.rfind('\n', 0, e.pos)
        line_end = json_str.find('\n', e.pos)
        if line_start == -1: line_start = 0
        if line_end == -1: line_end = len(json_str)
        line_num = json_str[:e.pos].count('\n') + 1
        print(f"  Line {line_num}: {json_str[line_start:line_end]}")
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
