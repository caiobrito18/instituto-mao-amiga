// doacoesStorage.ts
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'doacoes_historico';

export type Doacao = {
  id?: string;
  criadoEm?: string;
  tipoItem: string;
  quantidade: string;
  pontoDestino: string;
};

// Retorna todas as doações salvas
export const listarDoacoes = async (): Promise<Doacao[]> => {
  try {
    const dadosJSON = await SecureStore.getItemAsync(STORAGE_KEY);
    if (dadosJSON !== null) {
      return JSON.parse(dadosJSON);
    }
    return []; // Se não houver nada, retorna um array vazio
  } catch (error) {
    console.error('Erro ao buscar doações no SecureStore:', error);
    return [];
  }
};

// Salva uma nova doação no histórico
export const salvarDoacao = async (novaDoacao: Doacao): Promise<void> => {
  try {
    // 1. Busca as doações que já existem
    const doacoesAntigas = await listarDoacoes();

    // 2. Adiciona os campos de id único e criadoEm
    const doacaoComMetadados = {
      ...novaDoacao,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      criadoEm: new Date().toISOString(),
    };

    // 3. Acrescenta a nova doação ao array existente
    const novasDoacoes = [...doacoesAntigas, doacaoComMetadados];

    // 4. Salva o array atualizado no SecureStore
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(novasDoacoes));
  } catch (error) {
    console.error('Erro ao salvar nova doação no SecureStore:', error);
    throw error;
  }
};

export const excluirDoacao = async (id: string): Promise<void> => {
  try {
    const doacoesAntigas = await listarDoacoes();
    // Filtra removendo a doação que tem o ID passado
    const novasDoacoes = doacoesAntigas.filter(doacao => doacao.id !== id);
    
    // Salva a nova lista atualizada
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(novasDoacoes));
  } catch (error) {
    console.error('Erro ao excluir doação no SecureStore:', error);
    throw error;
  }
}

export const atualizarDoacao = async (doacaoAtualizada: Doacao): Promise<void> => {
  try {
    const doacoesAntigas = await listarDoacoes();
    
    const novasDoacoes = doacoesAntigas.map(doacao => 
      doacao.id === doacaoAtualizada.id ? doacaoAtualizada : doacao
    );

    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(novasDoacoes));
  } catch (error) {
    console.error('Erro ao atualizar doação no SecureStore:', error);
    throw error;
  }
};