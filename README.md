# **Next.js Flow Automation**

Este projeto foi desenvolvido como parte de um processo seletivo para a startup **GR Negócios Digitais**. Ele é uma aplicação de automação de fluxos visuais, permitindo a criação, edição e gerenciamento de fluxos de forma interativa e intuitiva.

---

## Exemplo de Interface

![Interface](/images/printFlows.png)
![Interface](/images/printFlows2.png)
![Interface](/images/printFlows3.png)


## **Recursos Principais**

- **Criação de Fluxos**: Adicione novos fluxos e gerencie-os facilmente.
- **Nós Personalizados**: Suporte para diferentes tipos de nós, como "Virtual Assistant", "Condition", entre outros.
- **Handles Dinâmicos**: Entradas e saídas configuráveis para cada nó.
- **Painel de Edição**: Edite os parâmetros de um nó ao clicar duas vezes nele.
- **Conexões Visuais**: Conecte nós com arestas dinâmicas.
- **Salvamento Automático**: Fluxos são salvos automaticamente após alterações.
- **Modal de Criação**: Interface intuitiva para criar novos fluxos.

---

## **Ferramentas Utilizadas**

### **Frontend**
- **Next.js**: Framework React para renderização do lado do servidor e construção de interfaces modernas.
- **React Flow Renderer**: Biblioteca para criação de fluxos visuais interativos.
- **FontAwesome**: Ícones para personalização dos nós.
- **Tailwind CSS**: Framework de estilização para componentes.
- **Axios**: Biblioteca para realizar chamadas HTTP.

---

## **Principais Componentes**

### **CustomNode**
- Renderiza nós personalizados com ícones e handles dinâmicos.
- Suporte para diferentes tipos de nós, como "Virtual Assistant" e "Condition".

### **NodePanel**
- Painel de edição que exibe os detalhes do nó selecionado.
- Abre ao clicar duas vezes em um nó.

### **ModalNewFlow**
- Modal para criar novos fluxos.
- Exibe automaticamente se não houver fluxos criados.

### **SelectFlow**
- Dropdown para selecionar fluxos existentes.
- Atualiza automaticamente após a criação de novos fluxos.

---

## **Como Usar**

1. **Criar um Novo Fluxo**:
   - Clique no botão "Add new project" para abrir o modal de criação.
   - Insira o nome do fluxo e clique em "Criar".

2. **Adicionar Nós**:
   - Arraste e solte nós no editor de fluxo.

3. **Editar Nós**:
   - Clique duas vezes em um nó para abrir o painel de edição.
   - Edite os parâmetros, entradas e saídas do nó.

4. **Conectar Nós**:
   - Arraste os handles (pontos de conexão) para criar conexões entre os nós.

5. **Salvar Fluxos**:
   - As alterações são salvas automaticamente após 2 segundos de inatividade.

---

## **Estilo**

O projeto utiliza **Tailwind CSS** e **CSS** para estilização. Cada componente possui seu próprio arquivo de estilo, garantindo modularidade e fácil manutenção.

---


