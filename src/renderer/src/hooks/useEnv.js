import { ref } from 'vue';

// 获取当前环境 electron web
export function useEnv() {
  const env =
    window.electron && window.electron.process.versions && window.electron.process.versions.electron
      ? 'electron'
      : 'web';

  return ref(env);
}

// 获取当前平台 win32 linux darwin
export function usePlatform() {
  const platform =
    window.electron && window.electron.process.platform ? window.electron.process.platform : 'web';

  return ref(platform);
}
