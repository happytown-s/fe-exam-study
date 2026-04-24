import json
import re
import os

base = r'C:\Users\haro\.openclaw\workspace\fe-exam-study\src\data'

cat_files = {
    'hardware': 'fe-hardware.ts',
    'software': 'fe-software.ts',
    'database': 'fe-database.ts',
    'network': 'fe-network.ts',
    'security': 'fe-security.ts',
    'management': 'fe-management.ts',
    'dev-methods': 'fe-dev-methods.ts',
    'project-mgmt': 'fe-project-mgmt.ts',
    'service-mgmt': 'fe-service-mgmt.ts',
}

tb_files = {
    'hardware': 'textbook-hardware.json',
    'software': 'textbook-software.json',
    'database': 'textbook-database.json',
    'network': 'textbook-network.json',
    'security': 'textbook-security.json',
    'management': 'textbook-management.json',
    'dev-methods': 'textbook-dev-methods.json',
    'project-mgmt': 'textbook-project-mgmt.json',
    'service-mgmt': 'textbook-service-mgmt.json',
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

    # Convert TS syntax to JSON
    # Step 1: Replace single-quoted strings with double-quoted
    result = []
    i = 0
    in_string = False
    string_char = None
    while i < len(arr):
        c = arr[i]
        if not in_string:
            if c == "'" or c == '"':
                in_string = True
                string_char = c
                result.append('"')  # Always use double quotes in output
            else:
                result.append(c)
        else:
            if c == string_char:
                if i + 1 < len(arr) and arr[i + 1] == string_char:
                    # Escaped quote
                    result.append(c)
                    result.append(c)
                    i += 1
                else:
                    in_string = False
                    result.append('"')
            elif c == '"':
                result.append('\\"')
            else:
                result.append(c)
        i += 1

    json_str = ''.join(result)

    # Step 2: Add quotes around unquoted keys (word followed by colon)
    json_str = re.sub(r'\b(\w+)\s*:', r'"\1":', json_str)

    # Step 3: Remove trailing commas before } or ]
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

    try:
        data = json.loads(json_str)
        return data
    except json.JSONDecodeError as e:
        print(f"  Parse error at pos {e.pos}: {e.msg}")
        # Show context
        start = max(0, e.pos - 50)
        end = min(len(json_str), e.pos + 50)
        print(f"  Context: ...{json_str[start:end]}...")
        return []


def main():
    result = {}

    for cat, ts_file in cat_files.items():
        ts_path = os.path.join(base, ts_file)
        tb_path = os.path.join(base, tb_files[cat])

        print(f"Processing {cat}...")

        questions = parse_ts_array(ts_path)
        print(f"  Parsed {len(questions)} questions")

        with open(tb_path, 'r', encoding='utf-8') as f:
            topics = json.load(f)

        # Build mapping
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

    out_path = os.path.join(base, 'textbook-question-map.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nSaved to {out_path}")


if __name__ == '__main__':
    main()
