import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
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
  const [busca, setBusca] = useState(''); 
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

  
  const resumoTipos = useMemo(() => {
    const mapa = new Map<string, { tipo: string; qtdTotal: number; contagem: number }>();
    
    doacoes.forEach(d => {
      const chave = d.tipoItem.trim().toLowerCase();
      if (!chave) return; 

      const qtd = parseInt(d.quantidade, 10) || 0;

      if (mapa.has(chave)) {
        const atual = mapa.get(chave)!;
        atual.qtdTotal += qtd;
        atual.contagem += 1;
      } else {
        const tipoDisplay = chave.charAt(0).toUpperCase() + chave.slice(1);
        mapa.set(chave, { tipo: tipoDisplay, qtdTotal: qtd, contagem: 1 });
      }
    });

    return Array.from(mapa.values()).sort((a, b) => b.qtdTotal - a.qtdTotal);
  }, [doacoes]);

  const doacoesFiltradas = doacoes.filter((doacao) =>
    doacao.tipoItem.toLowerCase().includes(busca.toLowerCase())
  );

  // Cabeçalho da Lista (Resumo + Busca)
  const renderHeader = () => {
    if (doacoes.length === 0) return null;

    return (
      <View style={styles.headerListContainer}>
        
        {/* Box de Resumo */}
        <View style={styles.resumoContainer}>
          <Text style={styles.resumoTitulo}>Resumo de Arrecadações</Text>
          <Text style={styles.resumoTotalText}>
            Total: {doacoes.length} {doacoes.length === 1 ? 'registro' : 'registros'}
          </Text>
          
          {resumoTipos.map((item, index) => (
            <View key={index} style={styles.resumoLinha}>
              <Text style={styles.resumoItemNome}>{item.tipo}:</Text>
              <Text style={styles.resumoItemDados}>
                {item.qtdTotal} {item.qtdTotal === 1 ? 'unidade' : 'unidades'} em {item.contagem} {item.contagem === 1 ? 'doação' : 'doações'}
              </Text>
            </View>
          ))}
        </View>

        {/* Campo de Busca */}
        <View style={styles.buscaContainer}>
          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar pelo tipo de item..."
            value={busca}
            onChangeText={setBusca}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (doacoes.length === 0) {
      return (
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
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma doação encontrada para "{busca}".</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={doacoesFiltradas}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <DoacaoItem 
            doacao={item} 
            onPress={() => navigation.navigate('DetalheDoacao', { doacao: item })} 
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={doacoesFiltradas.length === 0 && doacoes.length === 0 ? styles.listEmpty : styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        keyboardShouldPersistTaps="handled" 
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerListContainer: {
    marginBottom: 16,
  },
  resumoContainer: {
    backgroundColor: '#F0F4F8',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    marginBottom: 16,
  },
  resumoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 4,
  },
  resumoTotalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexWrap: 'wrap',
  },
  resumoItemNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginRight: 8,
  },
  resumoItemDados: {
    fontSize: 14,
    color: '#4A5568',
  },
  buscaContainer: {
    backgroundColor: '#FFFFFF',
  },
  inputBusca: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
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