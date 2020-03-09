import Store from 'store';
import { Configuration } from 'common';

const emptyConfiguration: Configuration = { players: {} };

export function loadConfig(): Configuration {
  return Store.get('config') || emptyConfiguration;
}

export function saveConfig(config: Configuration): void {
  Store.set('config', config);
}