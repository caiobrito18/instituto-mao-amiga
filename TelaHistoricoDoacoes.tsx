import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './App';
import { listarDoacoes, type Doacao } from './doacoesStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Historico'>;

const DoacaoItem = React.memo(({ doacao, onPress }: { doacao: Doacao, onPress: () => void }) => {
  const dataFormatada = doacao.criadoEm 
    ? new Date(doacao.criadoEm).toLocaleDateString('pt-BR') 
    : 'Data desconhecida';

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.linhaCabecalho}>
        <Text style={styles.itemTitle}>{doacao.tipoItem}</Text>
        <Text style={styles.itemQuantidade}>Qtd: {doacao.quantidade}</Text>
      </View>
      <Text style={styles.itemText}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.itemDate}>Registrado em: {dataFormatada}</Text>
    </TouchableOpacity>
  );
});

export default function TelaHistoricoDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const carregarDoacoes = async () => {
        const dados = await listarDoacoes();
        const dadosOrdenados = dados.sort((a, b) => {
          return new Date(b.criadoEm || 0).getTime() - new Date(a.criadoEm || 0).getTime();
        });
        setDoacoes(dadosOrdenados);
      };
      
      carregarDoacoes();
    }, [])
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Você ainda não registrou nenhuma doação.</Text>
      <TouchableOpacity 
        style={styles.botaoCadastro} 
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.textoBotaoCadastro}>Fazer minha primeira doação</Text>
      </TouchableOpacity>
    </View>
  );

  return (
<View style={styles.container}>
      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <DoacaoItem 
            doacao={item} 
            onPress={() => navigation.navigate('DetalheDoacao', { doacao: item })} 
          />
        )}
        contentContainerStyle={doacoes.length === 0 ? styles.listEmpty : styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    padding: 20,
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  linhaCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  itemQuantidade: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoCadastro: {
    backgroundColor: '#1B3A5C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotaoCadastro: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});