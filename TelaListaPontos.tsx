import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { alternar, listar as listarFavoritos } from './services/favoritosService';
import { buscarPagina, type Ponto } from './services/pontosService';
type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;
export default function TelaListaPontos({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]); const [filtro, setFiltro] = useState(''); const [page, setPage] = useState(0);
  const [last, setLast] = useState(false); const [loading, setLoading] = useState(true); const [loadingMore, setLoadingMore] = useState(false);
  const [erro, setErro] = useState(''); const [favoritos, setFavoritos] = useState<string[]>([]);
  const carregar = useCallback(async (reset = true) => {
    if (reset) setLoading(true); else { if (loadingMore || last) return; setLoadingMore(true); }
    try { const result = await buscarPagina(filtro, reset ? 0 : page + 1); setPontos(reset ? result.content : [...pontos, ...result.content]); setPage(result.page.number); setLast(result.page.last); setErro(''); }
    catch { setErro('Não foi possível carregar os pontos. Verifique a conexão com a API.'); }
    finally { setLoading(false); setLoadingMore(false); }
  }, [filtro, last, loadingMore, page, pontos]);
  useEffect(() => { listarFavoritos().then(setFavoritos); }, []);
  useEffect(() => { carregar(); }, [filtro]);
  if (loading && !pontos.length) return <View style={styles.center}><ActivityIndicator /><Text>Carregando pontos...</Text></View>;
  return <View style={styles.container}>
    <TextInput style={styles.input} placeholder="Buscar por nome ou bairro" value={filtro} onChangeText={value => { setFiltro(value); setPage(0); setLast(false); }} />
    {erro ? <View><Text style={styles.error}>{erro}</Text><TouchableOpacity onPress={() => carregar()}><Text style={styles.retry}>Tentar novamente</Text></TouchableOpacity></View> : null}
    <View style={styles.actions}><TouchableOpacity onPress={() => navigation.navigate('CadastroPonto')}><Text style={styles.action}>+ Novo ponto</Text></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('MeusPontos')}><Text style={styles.action}>♥ Meus pontos</Text></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('Historico')}><Text style={styles.action}>Doações</Text></TouchableOpacity></View>
    <FlatList data={pontos} keyExtractor={item => item.id} onEndReached={() => carregar(false)} onEndReachedThreshold={0.4} ListFooterComponent={loadingMore ? <ActivityIndicator /> : null} renderItem={({ item }) => <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detalhe', { pontoId: item.id })}><View style={styles.row}><Text style={styles.name}>{item.nome}</Text><TouchableOpacity style={styles.heart} onPress={async () => setFavoritos(await alternar(item.id))}><Text>{favoritos.includes(item.id) ? '♥' : '♡'}</Text></TouchableOpacity></View><Text>{item.endereco} - {item.bairro}</Text><Text>{item.tipo} | {item.horario}</Text></TouchableOpacity>} />
  </View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: '#fff' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 10 }, actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }, action: { color: '#1B3A5C', fontWeight: 'bold' }, card: { padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }, row: { flexDirection: 'row', justifyContent: 'space-between' }, name: { fontWeight: 'bold', color: '#1B3A5C', flex: 1 }, heart: { minWidth: 44, minHeight: 44, alignItems: 'center' }, error: { color: '#b00020' }, retry: { color: '#1B3A5C', marginBottom: 8 } });
