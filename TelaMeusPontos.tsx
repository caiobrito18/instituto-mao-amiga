import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { listar as listarFavoritos, remover } from './services/favoritosService';
import { buscarPorId, type Ponto } from './services/pontosService';
type Props = NativeStackScreenProps<RootStackParamList, 'MeusPontos'>;
export default function TelaMeusPontos({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  useFocusEffect(useCallback(() => { listarFavoritos().then(ids => Promise.all(ids.map(id => buscarPorId(id).catch(error => error.status === 404 ? undefined : Promise.reject(error)))).then(items => setPontos(items.filter((item): item is Ponto => !!item)))); }, []));
  return <View style={styles.container}>{!pontos.length ? <Text>Nenhum ponto favorito.</Text> : <FlatList data={pontos} keyExtractor={item => item.id} renderItem={({ item }) => <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detalhe', { pontoId: item.id })}><Text style={styles.name}>{item.nome}</Text><Text>{item.bairro}</Text><TouchableOpacity onPress={async () => { await remover(item.id); setPontos(old => old.filter(point => point.id !== item.id)); }}><Text>♥ Remover favorito</Text></TouchableOpacity></TouchableOpacity>} />}</View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, card: { padding: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }, name: { fontWeight: 'bold', color: '#1B3A5C' } });
