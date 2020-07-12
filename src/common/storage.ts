import Store from 'store';


export function loadRawConfig(): {} {
  return Store.get('config');
}

export function saveRawConfig(config: {}): void {
  Store.set('config', config);
}