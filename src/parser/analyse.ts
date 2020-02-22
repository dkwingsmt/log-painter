import forEach from 'lodash/forEach';
import values from 'lodash/values';
import clone from 'lodash/clone';
import { ParseResult, ParsedPlayer } from './parser_chat';
import {
  Configuration,
  AnalysedLine,
  AnalysedPlayer,
  AnalyseResult,
  ConfigPlayer,
  presetDescribedColors,
  DescribedColor,
} from 'common';

interface GroupResult {
  players: AnalysedPlayer[];
  lines: AnalysedLine[];
};

const presetColors: string[] = presetDescribedColors.map(({ value }: DescribedColor) => value);

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

function findFirstPlayerConfig(
  configPlayers: Record<string, ConfigPlayer>,
  playerIdGroup: string[],
): ConfigPlayer | null {
  for (const playerId of playerIdGroup) {
    if (configPlayers[playerId])
      return configPlayers[playerId];
  }
  return null;
}

function findFirstUnusedPresetColor(
  presetColors: string[],
  configPlayers: Record<string, ConfigPlayer>,
): string {
  const existingColors: Record<string, boolean> = {};
  forEach(configPlayers, (configPlayer: ConfigPlayer) => {
    existingColors[configPlayer.color] = true;
  });
  return presetColors.find((color: string) => !existingColors[color]) || 'black';
}

export function analyse(parsed: ParseResult, currentConfig: Configuration): AnalyseResult {
  const { lines, players } = groupByPlayers(parsed);
  const configPlayers: Record<string, ConfigPlayer> = clone(currentConfig.players);
  for (const player of players) {
    let configPlayer = findFirstPlayerConfig(configPlayers, player.allPlayerIds);
    if (!configPlayer) {
      configPlayer = {
        enabled: true,
        displayName: player.name,
        color: findFirstUnusedPresetColor(presetColors, configPlayers),
      };
    }
    for (const playerId of player.allPlayerIds) {
      configPlayers[playerId] = configPlayer;
    }
  };
  return {
    lines,
    playerIds: players.map((player: AnalysedPlayer) => player.playerId),
    nextConfig: {
      players: configPlayers,
    },
  };
}