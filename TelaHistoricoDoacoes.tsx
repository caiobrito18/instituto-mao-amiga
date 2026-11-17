import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { listarPagina, type Doacao } from './services/doacoesService';
type Props = NativeStackScreenProps<RootStackParamList, 'Historico'>;
export default function TelaHistoricoDoacoes({ navigation }: Props) {
  const [items, setItems] = useState<Doacao[]>([]); const [filtro, setFiltro] = useState(''); const [page, setPage] = useState(0); const [last, setLast] = useState(false); const [loading, setLoading] = useState(true); const [erro, setErro] = useState('');
  const carregar = useCallback(async (reset = true) => { setLoading(true); try { const result = await listarPagina(filtro, reset ? 0 : page + 1); setItems(reset ? result.content : [...items, ...result.content]); setPage(result.page.number); setLast(result.page.last); setErro(''); } catch { setErro('API desligada ou inacessível.'); } finally { setLoading(false); } }, [filtro, page, items]);
  useFocusEffect(useCallback(() => { carregar(); }, [filtro]));
  return <View style={styles.container}><TextInput style={styles.input} placeholder="Filtrar por tipo de item" value={filtro} onChangeText={setFiltro} />{loading && !items.length ? <ActivityIndicator /> : erro ? <Text>{erro}</Text> : <FlatList data={items} keyExtractor={item => item.id} onEndReached={() => !last && carregar(false)} renderItem={({ item }) => <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetalheDoacao', { doacaoId: item.id })}><Text style={styles.title}>{item.tipoItem} - {item.quantidade}</Text><Text>{item.pontoDestino}</Text><Text>{new Date(item.criadoEm).toLocaleDateString('pt-BR')}</Text></TouchableOpacity>} ListEmptyComponent={<Text>Lista vazia.</Text>} />}</View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 }, card: { padding: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }, title: { fontWeight: 'bold', color: '#1B3A5C' } });
