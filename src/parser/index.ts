import { parseChat, ParseResult } from './parser_chat';
import { GroupResult } from 'common';
import { groupByPlayers } from './group';

export function parseAndGroup(source: string): GroupResult {
  const parseResult: ParseResult = parseChat(source);
  return groupByPlayers(parseResult);
}
export { analyse } from './analyse';