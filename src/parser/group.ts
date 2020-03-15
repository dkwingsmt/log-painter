import values from 'lodash/values';

import { parseChat, ParseResult, ParsedPlayer } from './parser_chat';
import {
  GroupResult,
  AnalysedLine,
  AnalysedPlayer,
} from 'common';

function getPlayerIdGroup(player: ParsedPlayer): string[] {
  const ids: string[] = [];
  if (player.number)
    ids.push(`qq:${player.number}`);
  ids.push(`name:${player.name}`);
  return ids;
}

function groupByPlayers(result: ParseResult): GroupResult {
  const lines: AnalysedLine[] = [];
  const players: Record<string, AnalysedPlayer> = {};
  for (const parsedLine of result.logLines) {
    const { player, time, content } = parsedLine;
    const playerIdGroup = getPlayerIdGroup(player);
    const majorPlayerId = playerIdGroup[0];
    if (!players[majorPlayerId])
      players[majorPlayerId] = {
        playerId: majorPlayerId,
        allPlayerIds: playerIdGroup,
        name: player.name,
        number: player.number,
      };
    lines.push({
      playerId: majorPlayerId,
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