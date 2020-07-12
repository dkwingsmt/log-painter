import {
  AnalysedPlayer,
  GroupResult,
  AnalysedLine,
} from 'step-source';
// import {
//   bbsColors,
//   DescribedColor,
// } from './colors';
import {
  ConfigPlayer,
} from 'step-config';

export interface AnalyseResult {
  lines: AnalysedLine[];
  playerIds: string[];
}

// const presetColors: string[] = bbsColors.map(({ value }: DescribedColor) => value);

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

export function analyse(grouped: GroupResult): AnalyseResult {
  const { players, lines } = grouped;
  const configPlayers: Record<string, ConfigPlayer> = {};
  const currentPlayers: Record<string, ConfigPlayer> = {};
  for (const player of players) {
    let configPlayer = findFirstPlayerConfig(configPlayers, player.allPlayerIds);
    if (!configPlayer) {
      configPlayer = {
        enabled: true,
        displayName: player.name,
        color: 'black',
      };
    }
    for (const playerId of player.allPlayerIds) {
      currentPlayers[playerId] = configPlayer;
    }
  };
  return {
    lines,
    playerIds: players.map((player: AnalysedPlayer) => player.playerId),
  };
}