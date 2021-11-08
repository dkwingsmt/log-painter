import forEach from 'lodash/forEach';
import size from 'lodash/size';
import max from 'lodash/max';
import isEmpty from 'lodash/isEmpty';

function within(code: number, lowestIncluded: number, highestIncluded: number): boolean {
  return code >= lowestIncluded && code <= highestIncluded;
}

function isValidStart(code: number): boolean {
  return within(code, 0x0041, 0x005A) // Uppercase letter ASCII
      || within(code, 0x0061, 0x007A) // Lowercase letter ASCII
      || within(code, 0x00C0, 0x00D6) // EASCII 1
      || within(code, 0x00D8, 0x00F6) // EASCII 2
      || within(code, 0x00F8, 0x02AF) // Before modifiers
      || within(code, 0x0370, 0x197F) // There are lots of exceptions but we ignore them for now
      || within(code, 0x1E00, 0x1FFF) // Latin extended, greek extended
      || within(code, 0x2160, 0x2188) // Roman numbers
      || within(code, 0x3040, 0x30FF) // Kanas
      || within(code, 0xAC00, 0xD7AF) // Hangul syllables
      // || code == 0x5F // _  // Python allows underscore but we reserve it for dedup.
      || within(code, 0x3400, 0x4DBF)   // CJK
      || within(code, 0x4e00, 0x9fff)   // CJK
      || within(code, 0xF900, 0xFAFF)   // CJK
      || within(code, 0x20000, 0x2CEAF) // CJK
      || within(code, 0x2F800, 0x2FA1F) // CJK
  ;
}

function isValidContinue(code: number): boolean {
  return isValidStart(code)
      || within(code, 0x0030, 0x0039)  // ASCII digits
      || within(code, 0x0300, 0x36F)   // Combining Diacritical Marks
      || code == 0x005F   // Low line: connector punc
      || code == 0x00B7   // Middle dot
  ;
}

const keywords: string[] = [
  'False',
  'await',
  'else',
  'import',
  'pass',
  'None',
  'break',
  'except',
  'in',
  'raise',
  'True',
  'class',
  'finally',
  'is',
  'return',
  'and',
  'continue',
  'for',
  'lambda',
  'try',
  'as',
  'def',
  'from',
  'nonlocal',
  'while',
  'assert',
  'del',
  'global',
  'not',
  'with',
  'async',
  'elif',
  'if',
  'or',
  'yield',
  'match',
  'case',
  '_',
];
const keywordsMap: Record<string, boolean> = {};
function isKeyword(s: string): boolean {
  if (isEmpty(keywordsMap)) {
    for (const keyword of keywords) {
      keywordsMap[keyword] = true;
    }
  }
  return keywordsMap[s] != null;
}

function sanitizeIdentifier(name: string): string {
  let metFirst = false;
  return name.split('').filter((c: string): boolean => {
    if (!metFirst) {
      return metFirst = isValidStart(c.codePointAt(0) ?? 0);
    } else {
      return isValidContinue(c.codePointAt(0) ?? 0);
    }
  }).join('');
}

export function deriveRenpyNames(names: string[]): string[] {
  console.log(JSON.stringify(names));
  let sourceDedupId = 0;
  const sourceDedupTable: Record<string, boolean> = {};
  // Map from "key" to "name"
  const sourceDeduped: string[] = [];
  for (const name of names) {
    if (sourceDedupTable[name] != null) {
      sourceDedupId += 1;
      sourceDeduped.push(`${name}${sourceDedupId}`);
    } else {
      sourceDeduped.push(name);
      sourceDedupTable[name] = true;
    }
  }
  console.log(JSON.stringify(sourceDeduped));

  // Map from "key" to "result"
  const finished: Record<string, string> = {};
  let dedupId = 0;
  function nextDedupName(): string {
    dedupId += 1;
    return `_C${dedupId}`;
  }

  // Map from "key" to "chars"
  let remaining: Record<string, string[]> = {};
  // Map from "filteredKey" to "key"
  const entireDedup: Record<string, string> = {};
  for (const name of sourceDeduped) {
    if (isEmpty(name)) {
      finished[name] = nextDedupName();
    } else {
      const sanitized = sanitizeIdentifier(name).split('');
      const existingKey = entireDedup[sanitized.join('')];
      if (sanitized.length == 0) {
        finished[name] = nextDedupName();
      } else if (existingKey != null) {
        finished[name] = nextDedupName();
        finished[existingKey] = nextDedupName();
        delete remaining[existingKey];
      } else {
        remaining[name] = sanitized;
        entireDedup[sanitized.join('')] = name;
      }
    }
  }
  const longest = max(Object.values(remaining).map((chars) => chars.length)) ?? 0;
  console.log('## Sanitized');
  console.log(remaining);

  // Map from "key" to "chars"
  let nextRemaining: Record<string, string[]> = {};

  for (let curLen = 1; curLen <= longest; curLen += 1) {
    if (isEmpty(remaining)) {
      break;
    }
    // console.log(`== Round ${curLen} ==`);
    // console.log(`Remaining: ${JSON.stringify(remaining)}`);

    // Map from "attempt" to "key"
    const working: Record<string, string> = {};
    // Test each entry in `remaining`. Record duplicates in `nextRemaining`.
    // Record non-dup results in `finished`.
    forEach(remaining, (chars: string[], key: string) => {
      // console.log(`key ${key} char ${chars}`);
      const attempt = chars.slice(0, curLen).join('');
      if (isKeyword(attempt)) {
        if (chars.length <= curLen) {
          finished[key] = nextDedupName();
        } else {
          nextRemaining[key] = chars;
        }
      } else if (working[attempt] == null) {
        working[attempt] = key;
        finished[key] = attempt; // Might be cleared later.
      } else {
        nextRemaining[key] = chars;
        nextRemaining[working[attempt]] = remaining[working[attempt]];
        delete finished[working[attempt]];
      }
    });
    remaining = nextRemaining;
    nextRemaining = {};
  }
  if (size(finished) != size(names)) {
    console.error('Algorithm error', names);
    throw Error('Algorithm error');
  }
  console.log(JSON.stringify(finished));
  return sourceDeduped.map((key) => finished[key]);
}
