import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { cadastrar, editar, type Doacao } from './services/doacoesService';
import { listar, type Ponto } from './services/pontosService';
type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
export default function TelaCadastroDoacao({ route, navigation }: Props) {
  const edit = route.params?.doacaoParaEditar; const [tipoItem, setTipoItem] = useState(edit?.tipoItem || ''); const [quantidade, setQuantidade] = useState(edit ? String(edit.quantidade) : ''); const [pontoDestino, setPontoDestino] = useState(edit?.pontoDestino || ''); const [pontos, setPontos] = useState<Ponto[]>([]);
  useEffect(() => { listar().then(setPontos).catch(() => Alert.alert('Erro', 'Não foi possível carregar os pontos.')); }, []);
  const salvar = async () => { if (!tipoItem.trim() || !pontoDestino || !/^[1-9]\d*$/.test(quantidade.trim())) { Alert.alert('Aviso', 'Preencha os campos e informe uma quantidade maior que zero.'); return; } const data = { tipoItem: tipoItem.trim(), quantidade: Number(quantidade), pontoDestino }; try { if (edit) await editar(edit.id, data); else await cadastrar(data); navigation.goBack(); } catch { Alert.alert('Erro', 'Não foi possível salvar a doação.'); } };
  return <View style={styles.container}><TextInput style={styles.input} placeholder="Tipo do item" value={tipoItem} onChangeText={setTipoItem} /><TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} /><Text style={styles.label}>Ponto de destino</Text>{pontos.map(ponto => <TouchableOpacity key={ponto.id} style={[styles.point, pontoDestino === ponto.nome && styles.selected]} onPress={() => setPontoDestino(ponto.nome)}><Text>{ponto.nome}</Text></TouchableOpacity>)}<TouchableOpacity style={styles.button} onPress={salvar}><Text style={styles.buttonText}>{edit ? 'Salvar alterações' : 'Salvar doação'}</Text></TouchableOpacity></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 }, label: { fontWeight: 'bold', marginBottom: 8 }, point: { padding: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 5, borderRadius: 6 }, selected: { backgroundColor: '#d9eaf7' }, button: { marginTop: 16, backgroundColor: '#1B3A5C', padding: 15, alignItems: 'center', borderRadius: 8 }, buttonText: { color: '#fff', fontWeight: 'bold' } });
