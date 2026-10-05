# 🤝 Instituto Mão Amiga - Gestão de Doações

Um aplicativo móvel desenvolvido em React Native e Expo para facilitar o registro, controle e visualização de doações físicas (roupas, alimentos, equipamentos) destinadas aos pontos de coleta do Instituto Mão Amiga.

## ✨ Funcionalidades

- **Exploração de Pontos:** Visualização de pontos de coleta/distribuição com endereços, horários e tipos de itens aceitos.
- **Registro de Doações:** Formulário validado para entrada de novos itens arrecadados.
- **Histórico Offline:** Listagem completa de doações salvas localmente no dispositivo, garantindo o uso mesmo sem internet.
- **Resumo Inteligente:** Painel no topo do histórico que calcula e agrupa automaticamente o total de itens doados por categoria em tempo real.
- **Busca Rápida:** Filtro dinâmico para pesquisar doações específicas pelo tipo de item.
- **Edição e Correção:** Reaproveitamento inteligente do fluxo de cadastro para edição de registros existentes.
- **Exclusão Segura:** Remoção de registros incorretos mediante confirmação, prevenindo exclusões acidentais.

## 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/):** Framework principal para construção da interface nativa (iOS e Android).
- **[Expo](https://expo.dev/):** Plataforma e conjunto de ferramentas para acelerar o desenvolvimento e testes.
- **[React Navigation](https://reactnavigation.org/):** Gerenciamento de rotas e navegação em pilha (`native-stack`).
- **[Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/):** Armazenamento local persistente e criptografado para salvar o histórico de doações.
- **TypeScript:** Tipagem estática para maior segurança e prevenção de bugs durante o desenvolvimento.

## 🧠 Destaques e Decisões Técnicas

Durante o desenvolvimento, priorizamos performance e manutenibilidade através das seguintes abordagens:

1. **Single Source of Truth (Fonte Única da Verdade):** Os totais exibidos no cabeçalho do histórico não são salvos no banco de dados. Eles são calculados dinamicamente a partir da lista original usando o hook `useMemo`. Isso impede que o resumo fique dessincronizado caso uma exclusão ou edição ocorra.
2. **Reaproveitamento de Componentes:** A tela de Cadastro foi construída de forma flexível para lidar tanto com a **criação** quanto com a **edição** de doações (recebendo parâmetros via rota). Isso evitou a duplicação de telas, reduziu o código e unificou as regras de validação.
3. **Atualização Reativa (FocusEffect):** Em vez de recarregar a lista inteira manualmente ou forçar re-renderizações complexas, utilizamos o `useFocusEffect` nas telas de lista. Sempre que o usuário volta da tela de edição/cadastro, os dados são re-buscados automaticamente do armazenamento local.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- App **Expo Go** instalado no seu celular (disponível na App Store e Google Play) para testar no dispositivo físico.

### Instalação e Execução

1. **Clone o repositório:**
```bash
   git clone git@github.com:caiobrito18/instituto-mao-amiga.git
   cd instituto-mao-amiga

```

2. **Instale as dependências:**
Usando npm:
```bash
npm install

```


Ou usando yarn:
```bash
yarn install

```


3. **Inicie o servidor de desenvolvimento (Metro Bundler):**
```bash
npx expo start

```


4. **Teste no aplicativo:**
* Abra o aplicativo da câmera no iOS ou o app Expo Go no Android.
* Escaneie o **QR Code** que aparecerá no seu terminal ou na aba do navegador.
* O aplicativo será carregado diretamente no seu celular.



*(Opcional) Para rodar em um emulador, pressione `a` no terminal para Android ou `i` para iOS (requer Android Studio ou Xcode previamente configurados).*

---

## 📝 Roteiro de Demonstração (Pitch)

*Roteiro para apresentação da aplicação:*

1. **O Problema e o Cadastro:** Acessar a tela de cadastro e registrar uma doação (ex: 20 Roupas). Mostrar a validação de erro ao tentar inserir letras no campo de quantidade.
2. **Transparência e Métricas:** Abrir o histórico e mostrar o agrupamento matemático ocorrendo em tempo real no Resumo do topo da tela.
3. **Agilidade no dia a dia:** Utilizar a barra de busca para encontrar o item cadastrado de forma instantânea, ressaltando o filtro reativo.
4. **Correção de erros:** Editar a doação feita, alterar o valor para 25, salvar e mostrar que o resumo no histórico atualizou instantaneamente (código limpo e reaproveitado).
5. **Controle e Limpeza:** Excluir o registro, demonstrando o alerta nativo de confirmação.
6. **Confiabilidade:** Fechar o app no celular, abrir novamente e provar que os dados persistem graças ao armazenamento local.