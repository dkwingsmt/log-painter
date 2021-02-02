import values from 'lodash/values';

import { parseChat, ParseResult, ParsedPlayer } from './parser_chat';

export interface AnalysedLine {
  playerId: string;
  time?: string;
  title?: string;
  content: string[];
}

export interface AnalysedPlayer {
  playerId: string;
  names: Set<string>;
}

export interface GroupResult {
  players: AnalysedPlayer[];
  lines: AnalysedLine[];
};

function getPlayerId(player: ParsedPlayer): string {
  if (player.number)
    return `qq:${player.number}`;
  return `name:${player.name}`;
}

function defaultGroupedPlayer(playerId: string, number: string | undefined): AnalysedPlayer {
  const names = new Set<string>();
  if (number != null)
    names.add(number);
  return {
    playerId: playerId,
    names: names,
  };
}

function groupByPlayers(result: ParseResult): GroupResult {
  const lines: AnalysedLine[] = [];
  const players: Record<string, AnalysedPlayer> = {};
  for (const parsedLine of result.logLines) {
    const { player, time, content } = parsedLine;
    const playerId = getPlayerId(player);
    if (!players.playerId)
      players[playerId] = defaultGroupedPlayer(playerId, player.number);
    players[playerId].names.add(player.name);
    lines.push({
      playerId: playerId,
      time,
      title: player.title,
      content,
    });
  }
  return {
    lines,
    players: values(players),
  };
}

export function parseAndGroup(source: string): GroupResult {
  const parseResult: ParseResult = parseChat(source);
  return groupByPlayers(parseResult);
}
