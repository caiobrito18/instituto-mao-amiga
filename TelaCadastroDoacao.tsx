import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from './App';
import { atualizarDoacao, salvarDoacao } from './doacoesStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function TelaCadastroDoacao({ route, navigation }: Props) {
  const doacaoEdit = route.params?.doacaoParaEditar;

  const [tipoItem, setTipoItem] = useState(doacaoEdit?.tipoItem || '');
  const [quantidade, setQuantidade] = useState(doacaoEdit?.quantidade || '');
  const [pontoDestino, setPontoDestino] = useState(doacaoEdit?.pontoDestino || '');
  const [erroQuantidade, setErroQuantidade] = useState('');

  const handleSalvar = async () => {
    const apenasNumeros = /^\d+$/.test(quantidade.trim());

    if (!quantidade.trim()) {
      setErroQuantidade('A quantidade é obrigatória.');
      return;
    } else if (!apenasNumeros) {
      setErroQuantidade('A quantidade deve conter apenas números válidos.');
      return;
    }
    setErroQuantidade('');

    if (!tipoItem.trim() || !pontoDestino.trim()) {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (doacaoEdit) {
        const doacaoAtualizada = {
          ...doacaoEdit, 
          tipoItem: tipoItem.trim(),
          quantidade: quantidade.trim(),
          pontoDestino: pontoDestino.trim(),
        };
        
        await atualizarDoacao(doacaoAtualizada);
        Alert.alert('Sucesso', 'Doação atualizada com sucesso!');
        navigation.goBack(); 
      } else {
        const novaDoacao = {
          tipoItem: tipoItem.trim(),
          quantidade: quantidade.trim(),
          pontoDestino: pontoDestino.trim(),
        };
        await salvarDoacao(novaDoacao);
        Alert.alert('Sucesso', 'Doação registrada e guardada no histórico!');
        
        setTipoItem('');
        setQuantidade('');
        setPontoDestino('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {doacaoEdit ? 'Editar Registro' : 'Registrar Doação'}
      </Text>

      <Text style={styles.rotulo}>Tipo do item</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Roupas, Alimentos, etc."
        value={tipoItem}
        onChangeText={setTipoItem}
      />

      <Text style={styles.rotulo}>Quantidade</Text>
      <TextInput
        style={[styles.input, erroQuantidade ? styles.inputErro : null]}
        placeholder="Ex: 10"
        value={quantidade}
        onChangeText={(texto) => {
          setQuantidade(texto);
          if (erroQuantidade) setErroQuantidade('');
        }}
        keyboardType="numeric"
      />
      {erroQuantidade ? <Text style={styles.textoErro}>{erroQuantidade}</Text> : null}

      <Text style={styles.rotulo}>Ponto de destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Casa da Acolhida Bem-Te-Vi"
        value={pontoDestino}
        onChangeText={setPontoDestino}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>
          {doacaoEdit ? 'Salvar Alterações' : 'Salvar Doação'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  titulo: { fontSize: 24, fontWeight: '600', color: '#1B3A5C', marginBottom: 24 },
  rotulo: { fontSize: 14, fontWeight: '600', color: '#666666', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8,
    padding: 12, fontSize: 16, color: '#333333', marginBottom: 16,
    backgroundColor: '#F9F9F9'
  },
  inputErro: { borderColor: '#D32F2F', backgroundColor: '#FFEBEE' },
  textoErro: { color: '#D32F2F', fontSize: 12, marginTop: -12, marginBottom: 16 },
  botao: { backgroundColor: '#1B3A5C', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});