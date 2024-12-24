import { api } from './server';

/**
 * 创建新会话
 * @param {*} {settingId: number; name?: string}
 */
export const apiCreateSession = async (params) => {
  const resp = await api.post('/api/agent/session/create', params);
  return resp;
};

/**
 * 删除会话
 * @param {*} {sessionId: number}
 */
export const apiDeleteSession = async (params) => {
  const resp = await api.post('/api/agent/session/delete', params);
  return resp;
};

/**
 * 根据配置id查询会话记录
 * @param {*} {settingId: string}
 */
export const apiQuerySessionsBySettingId = async (params) => {
  const resp = await api.post('/api/agent/session/list', params);
  return resp;
};

/**
 * 根据会话id查询聊天记录
 * @param {*} {sessionId: number}
 */
export async function apiQueryRecordsList(params) {
  const resp = await api.post('/api/agent/session/record/list', params);
  return resp;
}
