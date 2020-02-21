import { analyse, AnalyseResult } from './analyse';
import { parseChat, ParseResult } from './parser_chat';
import { Configuration } from 'common';

export function convert(source: string, currentConfig: Configuration): AnalyseResult {
  const parseResult: ParseResult = parseChat(source);
  return analyse(parseResult, currentConfig);
}