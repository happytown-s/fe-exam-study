import json
import re
import os

base = r'C:\Users\haro\.openclaw\workspace\fe-exam-study\src\data'

cat_file = 'fe-network.ts'
tb_file = 'textbook-network.json'

ts_path = os.path.join(base, cat_file)
tb_path = os.path.join(base, tb_file)

with open(ts_path, 'r', encoding='utf-8') as f:
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
SQ = chr(39)
DQ = chr(34)
BS = chr(92)
NL = chr(10)

# Convert single-quoted strings to double-quoted
result = []
i = 0
while i < len(arr):
    if arr[i] == SQ:
        j = i + 1
        chars = []
        while j < len(arr) and arr[j] != SQ:
            if arr[j] == BS and j + 1 < len(arr):
                nc = arr[j + 1]
                if nc == SQ:
                    chars.append(SQ)
                    j += 2
                    continue
                elif nc == 'n':
                    chars.append(NL)
                    j += 2
                    continue
                elif nc == 't':
                    chars.append('\t')
                    j += 2
                    continue
            chars.append(arr[j])
            j += 1
        val = ''.join(chars)
        # Escape double quotes inside the value
        val = val.replace(DQ, BS + DQ)
        result.append(DQ + val + DQ)
        i = j + 1
    else:
        result.append(arr[i])
        i += 1

json_str = ''.join(result)

# Add quotes around unquoted keys - safer regex
# Only match word: when preceded by { or , or newline, and NOT already quoted
# Must also consume the colon so it does not become part of the key value
json_str = re.sub(
    r'(?<=[\n{,])\s*(\w+)\s*:',
    lambda m: ' "' + m.group(1) + '":',
    json_str
)

# Remove trailing commas
json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

try:
    questions = json.loads(json_str)
    print(f"Parsed {len(questions)} questions")
except json.JSONDecodeError as e:
    print(f"Error at pos {e.pos}: {e.msg}")
    line_start = json_str.rfind(NL, 0, e.pos)
    line_end = json_str.find(NL, e.pos)
    if line_start == -1:
        line_start = 0
    if line_end == -1:
        line_end = len(json_str)
    line_num = json_str[:e.pos].count(NL) + 1
    print(f"Line {line_num}: {json_str[line_start:line_end]}")
    questions = []

if questions:
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
    print(f"Matched {matched}/{len(topics)} topics")

    existing_path = os.path.join(base, 'textbook-question-map.json')
    with open(existing_path, 'r', encoding='utf-8') as f:
        result = json.load(f)
    result['network'] = tq
    with open(existing_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print("Updated textbook-question-map.json")
