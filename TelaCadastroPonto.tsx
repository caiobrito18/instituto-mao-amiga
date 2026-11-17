import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { cadastrar, editar, type Ponto } from './services/pontosService';
type Props = NativeStackScreenProps<RootStackParamList, 'CadastroPonto'>;
export default function TelaCadastroPonto({ route, navigation }: Props) {
  const ponto = route.params?.ponto; const [form, setForm] = useState<Omit<Ponto, 'id'>>(ponto ? { ...ponto } : { nome: '', endereco: '', bairro: '', horario: '', tipo: 'coleta' });
  const update = (key: keyof Omit<Ponto, 'id'>, value: string) => setForm(old => ({ ...old, [key]: value }));
  const salvar = async () => { if (Object.values(form).some(value => !value.trim())) { Alert.alert('Aviso', 'Preencha todos os campos.'); return; } try { if (ponto) await editar(ponto.id, form); else await cadastrar(form); navigation.goBack(); } catch { Alert.alert('Erro', 'Não foi possível salvar o ponto.'); } };
  return <View style={styles.container}>{(['nome', 'endereco', 'bairro', 'horario'] as const).map(key => <TextInput key={key} style={styles.input} placeholder={key} value={form[key]} onChangeText={value => update(key, value)} />)}<View style={styles.types}>{(['coleta', 'distribuição'] as const).map(type => <TouchableOpacity key={type} style={[styles.type, form.tipo === type && styles.selected]} onPress={() => update('tipo', type)}><Text>{type}</Text></TouchableOpacity>)}</View><TouchableOpacity style={styles.button} onPress={salvar}><Text style={styles.buttonText}>{ponto ? 'Salvar alterações' : 'Cadastrar ponto'}</Text></TouchableOpacity></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 }, types: { flexDirection: 'row', gap: 8 }, type: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }, selected: { backgroundColor: '#d9eaf7', borderColor: '#1B3A5C' }, button: { marginTop: 20, backgroundColor: '#1B3A5C', padding: 15, alignItems: 'center', borderRadius: 8 }, buttonText: { color: '#fff', fontWeight: 'bold' } });
