// export type {
//   AnalysedLine,
// } from 'step-source';

import { loadRawConfig } from "common/storage";

export interface GeneralConfig {
  removeLinesStartedWithParenthesis?: boolean;
  removeLinesStartedWithDot?: boolean;
  removeLinesStartedWithLenticular?: boolean;
  regularizeQuotes?: boolean;
}

export const defaultGeneralConfig: Required<GeneralConfig> = {
  removeLinesStartedWithParenthesis: false,
  removeLinesStartedWithDot: false,
  removeLinesStartedWithLenticular: false,
  regularizeQuotes: false,
};

export interface ConfigPlayer {
  displayName: string;
  enabled: boolean;
  color: string;
}

export interface Configuration {
  players?: Record<string, ConfigPlayer>;
  general?: GeneralConfig;
}

const emptyConfiguration: Configuration = { players: {} };

export function loadConfig(): Configuration {
  return (loadRawConfig() as Configuration) ?? emptyConfiguration;
};

export const getGeneralConfig = <K extends keyof GeneralConfig>(config: GeneralConfig, key: K): GeneralConfig[K] => {
  return config[key] || defaultGeneralConfig[key];
};