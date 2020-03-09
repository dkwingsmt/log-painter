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
  configPlayers: Record<string, ConfigPlayer>,
): string {
  const existingColors: Record<string, boolean> = {};
  forEach(configPlayers, (configPlayer: ConfigPlayer) => {
    existingColors[configPlayer.color] = true;
  });
  return presetColors.find((color: string) => !existingColors[color]) || 'black';
}

export function analyse(grouped: GroupResult, currentConfig: Configuration): AnalyseResult {
  const { players, lines } = grouped;
  const configPlayers: Record<string, ConfigPlayer> = clone(currentConfig.players || {});
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
      ...currentConfig,
      players: configPlayers,
    },
  };
}