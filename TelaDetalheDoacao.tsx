import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { excluirDoacao, listarDoacoes } from './doacoesStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export default function TelaDetalheDoacao({ route, navigation }: Props) {
  const [doacao, setDoacao] = useState(route.params.doacao);

  useFocusEffect(
    useCallback(() => {
      const recarregarDoacao = async () => {
        const lista = await listarDoacoes();
        const atualizada = lista.find(d => d.id === doacao.id);
        if (atualizada) {
          setDoacao(atualizada);
        }
      };
      recarregarDoacao();
    }, [doacao.id])
  );
  const dataFormatada = doacao.criadoEm
    ? new Date(doacao.criadoEm).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Data desconhecida';

  const handleExcluir = () => {
    Alert.alert(
      'Excluir Doação',
      'Tem certeza de que deseja excluir este registro? Essa ação não pode ser desfeita.',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              if (doacao.id) {
                await excluirDoacao(doacao.id);
                navigation.goBack();
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a doação.');
            }
          },
        },
      ]
    );
  };

  return (
<View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Tipo de Item</Text>
        <Text style={styles.texto}>{doacao.tipoItem}</Text>

        <Text style={styles.rotulo}>Quantidade</Text>
        <Text style={styles.texto}>{doacao.quantidade}</Text>

        <Text style={styles.rotulo}>Ponto de Destino</Text>
        <Text style={styles.texto}>{doacao.pontoDestino}</Text>

        <Text style={styles.rotulo}>Data do Registro</Text>
        <Text style={styles.texto}>{dataFormatada}</Text>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botaoEditar} 
          onPress={() => navigation.navigate('Cadastro', { doacaoParaEditar: doacao })}
        >
          <Text style={styles.textoBotaoEditar}>Editar Registro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir}>
          <Text style={styles.textoBotaoExcluir}>Excluir Registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between', 
  },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginTop: 12,
  },
  texto: {
    fontSize: 18,
    color: '#1B3A5C',
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
  botaoExcluir: {
    backgroundColor: '#FFF2F2',
    borderWidth: 1,
    borderColor: '#D32F2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotaoExcluir: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoesContainer: {
    gap: 12, // Dá um espaço uniforme entre os botões
    marginBottom: 20,
  },
  botaoEditar: {
    backgroundColor: '#1B3A5C', // Azul principal para ação primária
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoEditar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});