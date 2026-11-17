import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { buscarPorId, excluir, type Doacao } from './services/doacoesService';
type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;
export default function TelaDetalheDoacao({ route, navigation }: Props) {
  const [doacao, setDoacao] = useState<Doacao>(); const [erro, setErro] = useState('');
  useEffect(() => { buscarPorId(route.params.doacaoId).then(setDoacao).catch(error => setErro(error.status === 404 ? 'Doação não encontrada' : 'Não foi possível carregar a doação.')); }, [route.params.doacaoId]);
  if (erro) return <View style={styles.container}><Text>{erro}</Text></View>; if (!doacao) return <View style={styles.container}><Text>Carregando...</Text></View>;
  return <View style={styles.container}><Text style={styles.title}>{doacao.tipoItem}</Text><Text>Quantidade: {doacao.quantidade}</Text><Text>Destino: {doacao.pontoDestino}</Text><Text>Data: {new Date(doacao.criadoEm).toLocaleString('pt-BR')}</Text><TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro', { doacaoParaEditar: doacao })}><Text style={styles.buttonText}>Editar</Text></TouchableOpacity><TouchableOpacity style={styles.delete} onPress={() => Alert.alert('Excluir doação', 'Deseja excluir?', [{ text: 'Cancelar' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluir(doacao.id); navigation.goBack(); } catch { Alert.alert('Erro', 'Não foi possível excluir a doação.'); } } }])}><Text>Excluir</Text></TouchableOpacity></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, gap: 12 }, title: { fontSize: 24, fontWeight: 'bold', color: '#1B3A5C' }, button: { backgroundColor: '#1B3A5C', padding: 15, alignItems: 'center', borderRadius: 8 }, buttonText: { color: '#fff', fontWeight: 'bold' }, delete: { borderWidth: 1, borderColor: '#b00020', padding: 15, alignItems: 'center', borderRadius: 8 } });
