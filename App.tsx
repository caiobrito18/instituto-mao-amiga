import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCadastroDoacao from './TelaCadastroDoacao';
import TelaDetalheDoacao from './TelaDetalheDoacao';
import TelaDetalhePonto from './TelaDetalhePonto';
import TelaCadastroPonto from './TelaCadastroPonto';
import TelaHistoricoDoacoes from './TelaHistoricoDoacoes';
import TelaListaPontos from './TelaListaPontos';
import TelaMeusPontos from './TelaMeusPontos';
import type { Doacao } from './services/doacoesService';
import type { Ponto } from './services/pontosService';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { pontoId: string };
  CadastroPonto: { ponto?: Ponto } | undefined;
  MeusPontos: undefined;
  Cadastro: { doacaoParaEditar?: Doacao } | undefined;
  Historico: undefined;
  DetalheDoacao: { doacaoId: string };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return <NavigationContainer><Stack.Navigator initialRouteName="Lista">
    <Stack.Screen name="Lista" component={TelaListaPontos} options={{ title: 'Instituto Mão Amiga' }} />
    <Stack.Screen name="Detalhe" component={TelaDetalhePonto} options={{ title: 'Detalhe do ponto' }} />
    <Stack.Screen name="CadastroPonto" component={TelaCadastroPonto} options={({ route }) => ({ title: route.params?.ponto ? 'Editar ponto' : 'Novo ponto' })} />
    <Stack.Screen name="MeusPontos" component={TelaMeusPontos} options={{ title: 'Meus pontos' }} />
    <Stack.Screen name="Historico" component={TelaHistoricoDoacoes} options={{ title: 'Histórico de doações' }} />
    <Stack.Screen name="DetalheDoacao" component={TelaDetalheDoacao} options={{ title: 'Detalhe da doação' }} />
    <Stack.Screen name="Cadastro" component={TelaCadastroDoacao} options={({ route }) => ({ title: route.params?.doacaoParaEditar ? 'Editar doação' : 'Nova doação' })} />
  </Stack.Navigator></NavigationContainer>;
}
