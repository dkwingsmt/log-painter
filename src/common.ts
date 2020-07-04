import Color from 'color';

export interface GroupResult {
  players: AnalysedPlayer[];
  lines: AnalysedLine[];
};

export interface AnalysedLine {
  playerId: string;
  time?: string;
  title?: string;
  content: string[];
}

export interface AnalysedPlayer {
  playerId: string;
  allPlayerIds: string[];
  number?: string;
  name: string;
}

export interface AnalyseResult {
  lines: AnalysedLine[];
  playerIds: string[];
  nextConfig: Configuration;
}

export interface ConfigPlayer {
  displayName: string;
  enabled: boolean;
  color: string;
}

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

export const getGeneralConfig = <K extends keyof GeneralConfig>(config: GeneralConfig, key: K): GeneralConfig[K] => {
  return config[key] || defaultGeneralConfig[key];
};

export interface Configuration {
  players?: Record<string, ConfigPlayer>;
  general?: GeneralConfig;
}

export interface DescribedColor {
  value: string;
  name?: string;
  isLight: boolean;
}

export const presetDescribedColors: DescribedColor[] = [
  { value: "black", name: "黑色" },
  { value: "silver", name: "灰色" },
  { value: "red", name: "红色" },
  { value: "green", name: "绿色" },
  { value: "orange", name: "橘色" },
  { value: "purple", name: "紫色" },
  { value: "teal", name: "蓝绿" },
  { value: "fuchsia", name: "桃红" },
  { value: "yellow", name: "黄色" },
  { value: "beige", name: "米色" },
  { value: "brown", name: "棕色" },
  { value: "navy", name: "深蓝" },
  { value: "maroon", name: "紫红" },
  { value: "limegreen", name: "莱姆" },
  { value: "white", name: "白色" },
  { value: "brown", name: "蓝色" },
  { value: "pink", name: "粉红" },
].map(({ value, ...others }) => ({
  ...others,
  value,
  isLight: Color(value).isLight(),
}));