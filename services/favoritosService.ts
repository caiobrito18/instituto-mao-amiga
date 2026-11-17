import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'pontos_favoritos';
export async function listar(): Promise<string[]> { const value = await AsyncStorage.getItem(KEY); return value ? JSON.parse(value) : []; }
export async function alternar(id: string): Promise<string[]> {
  const ids = await listar(); const next = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id];
  await AsyncStorage.setItem(KEY, JSON.stringify(next)); return next;
}
export async function remover(id: string) { const ids = (await listar()).filter(item => item !== id); await AsyncStorage.setItem(KEY, JSON.stringify(ids)); return ids; }
