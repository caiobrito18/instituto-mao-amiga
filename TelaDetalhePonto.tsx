import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { excluir, buscarPorId, type Ponto } from './services/pontosService';
type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;
export default function TelaDetalhePonto({ route, navigation }: Props) {
  const [ponto, setPonto] = useState<Ponto>(); const [erro, setErro] = useState('');
  useEffect(() => { buscarPorId(route.params.pontoId).then(setPonto).catch((error: Error & { status?: number }) => setErro(error.status === 404 ? 'Ponto não encontrado' : 'Não foi possível carregar o ponto.')); }, [route.params.pontoId]);
  if (erro) return <View style={styles.container}><Text>{erro}</Text></View>; if (!ponto) return <View style={styles.container}><Text>Carregando...</Text></View>;
  return <View style={styles.container}><Text style={styles.title}>{ponto.nome}</Text><Text>{ponto.endereco}</Text><Text>{ponto.bairro}</Text><Text>{ponto.horario}</Text><Text>{ponto.tipo}</Text><TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroPonto', { ponto })}><Text style={styles.buttonText}>Editar</Text></TouchableOpacity><TouchableOpacity style={styles.delete} onPress={() => Alert.alert('Excluir ponto', 'Deseja excluir este ponto?', [{ text: 'Cancelar' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluir(ponto.id); navigation.goBack(); } catch { Alert.alert('Erro', 'Não foi possível excluir o ponto.'); } } }])}><Text>Excluir</Text></TouchableOpacity></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, gap: 12 }, title: { fontSize: 24, fontWeight: 'bold', color: '#1B3A5C' }, button: { backgroundColor: '#1B3A5C', padding: 15, alignItems: 'center', borderRadius: 8 }, buttonText: { color: '#fff', fontWeight: 'bold' }, delete: { padding: 15, alignItems: 'center', borderColor: '#b00020', borderWidth: 1, borderRadius: 8 } });
