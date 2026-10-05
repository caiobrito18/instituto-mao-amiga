import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCadastroDoacao from './TelaCadastroDoacao';
import TelaDetalheDoacao from './TelaDetalheDoacao';
import TelaDetalhePonto from './TelaDetalhePonto';
import TelaHistoricoDoacoes from './TelaHistoricoDoacoes';
import TelaListaPontos from './TelaListaPontos';
import { Doacao } from './doacoesStorage';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { pontoId: string };
  Cadastro: undefined;
  Historico: undefined;
  DetalheDoacao: { doacao: Doacao };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={TelaListaPontos}
          options={{ title: 'Instituto Mão Amiga' }}
        />
        <Stack.Screen
          name="Detalhe"
          component={TelaDetalhePonto}
          options={{ title: 'Detalhe do ponto' }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={TelaCadastroDoacao} 
          options={{ title: 'Nova Doação' }} 
        />
        <Stack.Screen 
          name="Historico" 
          component={TelaHistoricoDoacoes} 
          options={{ title: 'Minhas Doações' }} 
        />
        <Stack.Screen 
          name="DetalheDoacao" 
          component={TelaDetalheDoacao} 
          options={{ title: 'Registro da Doação' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}