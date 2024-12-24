import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const minimize = () => {
  ipcRenderer.send('min-window');
};
const maximize = () => {
  ipcRenderer.send('max-window');
};
const closeWindow = () => {
  ipcRenderer.send('close-window');
};

const api = {
  randomInt: (x, y) => {
    ipcRenderer.send('randomInt', x, y);
  },
  minimize,
  maximize,
  closeWindow
};

// 仅当启用了上下文隔离时，才使用 `contextBridge` API 将 Electron API 公开给
// 渲染器进程 否则 添加到 DOM 全局变量中
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
