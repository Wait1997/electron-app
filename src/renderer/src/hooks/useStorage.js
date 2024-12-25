import { useStorage as useDefaultStorage } from '@vueuse/core';
import { ref } from 'vue';

export function useStorage(key, option = {}) {
  const {
    defaultValue = null,
    storage = localStorage,
    mergeDefaults = true,
    readonly = false
  } = option;

  if (readonly) {
    const rawValue = storage.getItem(key);
    try {
      return ref(rawValue ? JSON.parse(rawValue) : defaultValue);
    } catch (e) {
      console.warn(`Failed to parse storage value for key "${key}"`, e);
      return ref(defaultValue);
    }
  }

  const state = useDefaultStorage(key, defaultValue, storage, mergeDefaults);

  return state;
}
