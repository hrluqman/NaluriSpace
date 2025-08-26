import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Simple AsyncStorage helpers with JSON serialization + safe error handling.
 */

export async function getItemJSON<T>(key: string, fallback?: T): Promise<T | undefined> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] getItemJSON error for key=${key}`, err);
    return fallback;
  }
}

export async function setItemJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] setItemJSON error for key=${key}`, err);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn(`[storage] removeItem error for key=${key}`, err);
  }
}

export const STORAGE_KEYS = {
  LAST_STATE: 'naluri:lastState', // cached { pi, status, iteration }
};