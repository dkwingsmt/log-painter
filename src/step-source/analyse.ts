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
  PlayerConfig,
} from 'common';

export type AnalyseResult = GroupResult;

// const presetColors: string[] = bbsColors.map(({ value }: DescribedColor) => value);

function findFirstPlayerConfig(
  configPlayers: Record<string, PlayerConfig>,
  playerIdGroup: string[],
): PlayerConfig | null {
  for (const playerId of playerIdGroup) {
    if (configPlayers[playerId])
      return configPlayers[playerId];
  }
  return null;
}

export function analyse(grouped: GroupResult): AnalyseResult {
  return grouped;
}
