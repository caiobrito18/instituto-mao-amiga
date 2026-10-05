import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
};

export const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Casa da Acolhida Bem-Te-Vi',
    endereco: 'Rua das Andorinhas, 15 — Jardim Primavera',
    diasHorarios: 'Terça e sexta, 8h–16h',
    recebeDistribui: 'Arrecada ração e medicamentos veterinários; distribui para cuidadores de animais resgatados.'
  },
  {
    id: '2',
    nome: 'Espaço Cultural Raízes',
    endereco: 'Ladeira das Pedras, 302 — Centro Histórico',
    diasHorarios: 'Quarta a domingo, 14h–20h',
    recebeDistribui: 'Recebe instrumentos musicais e livros de arte; oferece oficinas gratuitas nos finais de semana.'
  },
  {
    id: '3',
    nome: 'Associação de Moradores Nova Esperança',
    endereco: 'Rua do Bosque, 88 — Vila Verde',
    diasHorarios: 'Segunda e quinta, 9h–12h',
    recebeDistribui: 'Aceita doações de móveis e eletrodomésticos; repassa para famílias recém-alocadas no bairro.'
  },
  {
    id: '4',
    nome: 'Centro de Apoio Girassol',
    endereco: 'Avenida das Nações, 1500 — Bairro das Indústrias',
    diasHorarios: 'Segunda a quarta, 13h–17h',
    recebeDistribui: 'Recebe retalhos, linhas e agulhas; distribui artesanato feito por mães da comunidade para venda.'
  },
  {
    id: '5',
    nome: 'Núcleo de Saúde Solidária',
    endereco: 'Praça da Matriz, 12 — Setor Central',
    diasHorarios: 'Todos os dias, 7h–19h',
    recebeDistribui: 'Arrecada cadeiras de rodas e muletas; faz empréstimo gratuito de equipamentos ortopédicos.'
  },
  {
    id: '6',
    nome: 'Refúgio Verde — Horta Comunitária',
    endereco: 'Travessa do Rio, s/n — Chácaras do Sol',
    diasHorarios: 'Sábados, 6h–11h',
    recebeDistribui: 'Recebe sementes, mudas e ferramentas agrícolas; distribui hortaliças frescas para moradores da região.'
  },
  {
    id: '7',
    nome: 'Projeto Alfabetizar É Viver',
    endereco: 'Rua Machado de Assis, 404 — Bairro Literário',
    diasHorarios: 'Terça e quinta, 18h–22h',
    recebeDistribui: 'Aceita cadernos novos, mochilas e lápis; oferece aulas de alfabetização para adultos com lanche incluso.'
  },
  {
    id: '8',
    nome: 'Tenda da Sopa Fraterna',
    endereco: 'Viaduto do Trabalhador — Zona Leste',
    diasHorarios: 'Sexta-feira, 19h–23h',
    recebeDistribui: 'Arrecada legumes, macarrão e copos térmicos; distribui sopa quente para a população em situação de rua.'
  },
  {
    id: '9',
    nome: 'Clube de Mães Estrela Guia',
    endereco: 'Rua das Margaridas, 21 — Vila Operária',
    diasHorarios: 'Segunda e sexta, 14h–18h',
    recebeDistribui: 'Recebe lã, tecidos e fraldas geriátricas; distribui cobertores de retalhos para asilos parceiros.'
  },
  {
    id: '10',
    nome: 'Estação Digital Cidadã',
    endereco: 'Avenida Tecnológica, 99 — Polo de Inovação',
    diasHorarios: 'Quarta a sábado, 10h–16h',
    recebeDistribui: 'Arrecada peças de computador e celulares antigos; conserta e doa eletrônicos para estudantes de escolas públicas.'
  }
];

type RootStackParamList = {
  Lista: undefined;
  Detalhe: { pontoId: string };
  Cadastro: undefined;
  Historico: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lista'>;
};

function PontoItem({
  ponto,
  onPress,
}: {
  ponto: Ponto;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
    </TouchableOpacity>
  );
}
export default function TelaListaPontos({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={pontosMock}
        keyExtractor={ item => item.id.toString()}
        ListHeaderComponent={()=>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>Pontos de coleta / distribuição</Text>
          
          <View style={styles.botoesAcaoContainer}>
            <TouchableOpacity 
                style={[styles.botaoAcao, styles.botaoCadastro]} 
                onPress={() => navigation.navigate('Cadastro')}
              >
                <Text style={styles.textoBotaoAcao}>+ Registrar Doação</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.botaoAcao, styles.botaoHistorico]} 
                onPress={() => navigation.navigate('Historico')}
              >
                <Text style={[styles.textoBotaoAcao, styles.textoBotaoHistorico]}>Ver Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>}
        renderItem={({item})=>
          <PontoItem
          ponto={item}
          onPress={() => navigation.navigate('Detalhe', { pontoId: item.id })}
          />
        }
      />
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
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  endereco: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  headerContainer: {
    marginBottom: 16,
  },
  botaoCadastro: {
    backgroundColor: '#1B3A5C', // Mesma cor do título para manter o padrão
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotaoCadastro: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoesAcaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12, // Dá um espaço entre os botões no iOS/Android modernos
  },
  botaoAcao: {
    flex: 1, // Faz os botões dividirem o espaço igualmente
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoHistorico: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1B3A5C',
  },
  textoBotaoAcao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textoBotaoHistorico: {
    color: '#1B3A5C', // O texto do histórico fica azul para contrastar com fundo branco
  }
});
