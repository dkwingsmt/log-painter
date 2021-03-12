import React from 'react';
import Store from 'store';

import { ColorPalette, colorPalettes } from './colors';
import { RendererId, renderingSchemes } from './renderers';

export interface GeneralConfig {
  removeLinesStartedWithParenthesis: boolean;
  removeLinesStartedWithDot: boolean;
  removeLinesStartedWithLenticular: boolean;
  regularizeQuotes: boolean;
  palette: ColorPalette;
  rendererScheme: RendererId;
}

export const defaultGeneralConfig: GeneralConfig = {
  removeLinesStartedWithParenthesis: false,
  removeLinesStartedWithDot: false,
  removeLinesStartedWithLenticular: false,
  regularizeQuotes: false,
  palette: 'v2',
  rendererScheme: 'standard-rich',
};

export interface PlayerConfig {
  displayName: string;
  enabled: boolean;
  color: string;
}

export interface Configuration {
  players: Record<string, PlayerConfig>;
  general: GeneralConfig;
}

export const sanitizeConfig = (value: {} | undefined): Configuration => {
  const nonNullValue = (value ?? {}) as Record<string, {}>;
  const result = {
    players: (nonNullValue['players'] ?? {}) as Record<string, PlayerConfig>,
    general: {
      ...defaultGeneralConfig,
      ...nonNullValue['general'] as GeneralConfig
    },
  };
  if (!(result.general.palette in colorPalettes)) {
    result.general.palette = value == null ? 'v2' : 'bbs';
  }
  if (!(result.general.rendererScheme in renderingSchemes)) {
    result.general.rendererScheme = 'standard-rich';
  }
  if (!renderingSchemes[result.general.rendererScheme].allowNewPalette
      && result.general.palette == 'v2') {
    result.general.rendererScheme = 'standard-rich';
  }
  return result;
};

const emptyConfig = sanitizeConfig(undefined);

export interface ConfigStorage {
  load: () => Configuration | undefined;
  save: (value: Configuration) => void;
}

export const realConfigStorage: ConfigStorage = {
  load: () => {
    return Store.get('config');
  },
  save: (config: {}): void => {
    Store.set('config', config);
  },
};

export const configContext: React.Context<Configuration> = React.createContext<Configuration>(emptyConfig);
