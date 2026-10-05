// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCadastroDoacao from './TelaCadastroDoacao';
import TelaDetalhePonto from './TelaDetalhePonto';
import TelaHistoricoDoacoes from './TelaHistoricoDoacoes'; // <-- IMPORTANTE
import TelaListaPontos from './TelaListaPontos';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { pontoId: string };
  Cadastro: undefined;
  Historico: undefined; // <-- NOVA ROTA
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
          options={{ title: 'Minhas Doações' }} // <-- NOVA TELA
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}