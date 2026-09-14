import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

export default function TelaCadastroDoacao() {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');

  const handleSalvar = () => {
    // Critério de aceite: Validação do campo numérico (quantidade)
    // Usamos uma expressão regular para garantir que só existam números
    const apenasNumeros = /^\d+$/.test(quantidade.trim());

    if (!quantidade.trim()) {
      setErroQuantidade('A quantidade é obrigatória.');
      return;
    } else if (!apenasNumeros) {
      setErroQuantidade('A quantidade deve conter apenas números válidos.');
      return;
    }

    // Limpa o erro se passou na validação
    setErroQuantidade('');

    // Validação extra simples para não deixar os outros campos vazios
    if (!tipoItem.trim() || !pontoDestino.trim()) {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos.');
      return;
    }

    // Fora de escopo para esta Issue: Salvar no banco de dados
    // Vamos apenas exibir um alerta de sucesso
    Alert.alert('Sucesso', 'Doação validada com sucesso! (Salvar será implementado na Aula 15)');
    
    // Limpa o formulário após "salvar"
    setTipoItem('');
    setQuantidade('');
    setPontoDestino('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Doação</Text>

      {/* Campo: Tipo do Item */}
      <Text style={styles.rotulo}>Tipo do item</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Roupas, Alimentos, etc."
        value={tipoItem}
        onChangeText={setTipoItem}
      />

      {/* Campo: Quantidade */}
      <Text style={styles.rotulo}>Quantidade</Text>
      <TextInput
        style={[styles.input, erroQuantidade ? styles.inputErro : null]}
        placeholder="Ex: 10"
        value={quantidade}
        onChangeText={(texto) => {
          setQuantidade(texto);
          if (erroQuantidade) setErroQuantidade(''); // Limpa o erro enquanto o usuário digita
        }}
        keyboardType="numeric" // Facilita mostrando o teclado numérico
      />
      {/* Mensagem de erro condicional */}
      {erroQuantidade ? <Text style={styles.textoErro}>{erroQuantidade}</Text> : null}

      {/* Campo: Ponto de Destino */}
      <Text style={styles.rotulo}>Ponto de destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Casa da Acolhida Bem-Te-Vi"
        value={pontoDestino}
        onChangeText={setPontoDestino}
      />

      {/* Botão de Submissão */}
      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1B3A5C',
    marginBottom: 24,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
  },
  inputErro: {
    borderColor: '#D32F2F', // Borda vermelha se houver erro
    backgroundColor: '#FFEBEE',
  },
  textoErro: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: -12, // Sobe o texto um pouco para ficar perto do input
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});