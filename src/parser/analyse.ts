import forEach from 'lodash/forEach';
import clone from 'lodash/clone';
import {
  Configuration,
  AnalysedPlayer,
  AnalyseResult,
  ConfigPlayer,
  presetDescribedColors,
  DescribedColor,
  GroupResult,
} from 'common';

const presetColors: string[] = presetDescribedColors.map(({ value }: DescribedColor) => value);

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
  currentPlayers: Record<string, ConfigPlayer>,
): string {
  const existingColors: Record<string, boolean> = {};
  forEach(currentPlayers, (player: ConfigPlayer) => {
    existingColors[player.color] = true;
  });
  return presetColors.find((color: string) => !existingColors[color]) || 'black';
}

export function analyse(grouped: GroupResult, currentConfig: Configuration): AnalyseResult {
  const { players, lines } = grouped;
  const configPlayers: Record<string, ConfigPlayer> = currentConfig.players || {};
  const currentPlayers: Record<string, ConfigPlayer> = {};
  for (const player of players) {
    let configPlayer = findFirstPlayerConfig(configPlayers, player.allPlayerIds);
    if (!configPlayer) {
      configPlayer = {
        enabled: true,
        displayName: player.name,
        color: findFirstUnusedPresetColor(presetColors, currentPlayers),
      };
    }
    for (const playerId of player.allPlayerIds) {
      currentPlayers[playerId] = configPlayer;
    }
  };
  return {
    lines,
    playerIds: players.map((player: AnalysedPlayer) => player.playerId),
    nextConfig: {
      ...currentConfig,
      players: {
        ...configPlayers,
        ...currentPlayers,
      }
    },
  };
}