export function regularizeQuotes(lines: string[]): string[] {
  const inQuoteChars: string[] = ['"', '“', '”'];
  const outQuoteChars: string[] = ['“', '”'];
  let now = 1;

  function regularizeQuotesLine(line: string): string {
    return line.split('').map((ch: string) => {
      if (inQuoteChars.includes(ch)) {
        now = 1 - now;
        return outQuoteChars[now];
      }
      return ch;
    }).join('');
  }

  return lines.map(regularizeQuotesLine);
}
