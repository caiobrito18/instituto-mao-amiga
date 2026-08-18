import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    nome: 'Ponto Centro — Igreja São José',
    endereco: 'Rua das Flores, 120 — Centro',
    diasHorarios: 'Segunda a sexta, 9h–17h',
    recebeDistribui:
      'Recebe alimentos não perecíveis e roupas; distribui cestas básicas às terças.',
  },
  {
    id: '2',
    nome: 'Ponto Norte — Associação Bairro Alto',
    endereco: 'Av. Brasil, 890 — Bairro Alto',
    diasHorarios: 'Terça e quinta, 14h–19h',
    recebeDistribui:
      'Recebe hortifruti de feiras; distribui kits de higiene aos sábados.',
  },
  {
    id: '3',
    nome: 'Ponto Sul — Mercado Comunitário',
    endereco: 'Travessa do Sol, 45 — Vila Nova',
    diasHorarios: 'Sábado, 8h–12h',
    recebeDistribui:
      'Recebe doações de famílias e mercados; distribui refeições prontas no mesmo dia.',
  },
  {
    id: '4',
    nome: 'Ponto Leste — Centro Comunitário Esperança',
    endereco: 'Rua das Oliveiras, 334 — Jardim Esperança',
    diasHorarios: 'Segunda, quarta e sexta, 10h–16h',
    recebeDistribui:
      'Recebe roupas de frio e cobertores; distribui sopão nas noites de quarta.',
  },
  {
    id: '5',
    nome: 'Ponto Oeste — ONG Vida Nova',
    endereco: 'Av. da Paz, 1050 — Parque Industrial',
    diasHorarios: 'Segunda a sábado, 8h–18h',
    recebeDistribui:
      'Recebe leite, fraldas e itens para bebês; distribui kits maternidade às sextas-feiras.',
  },
  {
    id: '6',
    nome: 'Ponto Noroeste — Escola Estadual Cidadã',
    endereco: 'Rua do Saber, 200 — Bairro Universitário',
    diasHorarios: 'Segunda e quarta, 18h–21h',
    recebeDistribui:
      'Recebe material escolar e livros; distribui kits de estudo para jovens da comunidade.',
  },
  {
    id: '7',
    nome: 'Ponto Sudeste — Paróquia Cristo Redentor',
    endereco: 'Praça da Fé, S/N — Jardim das Palmeiras',
    diasHorarios: 'Domingo, 8h–13h',
    recebeDistribui:
      'Recebe doações financeiras e produtos de limpeza; distribui pão e café da manhã aos domingos.',
  },
  {
    id: '8',
    nome: 'Ponto Sudoeste — Galpão Solidário',
    endereco: 'Rua dos Imigrantes, 400 — Setor Comercial',
    diasHorarios: 'Quinta a sábado, 14h–20h',
    recebeDistribui:
      'Recebe brinquedos e roupas infantis; promove brechó solidário e distribui lanches para crianças.',
  }
];

type RootStackParamList = {
  Lista: undefined;
  Detalhe: { pontoId: string };
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
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pontos de coleta / distribuição</Text>
      <FlatList
        data={pontosMock}
        keyExtractor={ item => item.id.toString()}
        renderItem={({item})=>
          <PontoItem
          ponto={item}
          onPress={() => navigation.navigate('Detalhe', { pontoId: item.id })}
          />
        }
      />

    </ScrollView>
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
    fontWeight: 600,
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
});
