import {
  GroupResult,
} from 'step-source';

export type AnalyseResult = GroupResult;

export function analyse(grouped: GroupResult): AnalyseResult {
  return grouped;
}
