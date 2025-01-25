# 📱 Sistema de Rede Social  

Este é um sistema de rede social simples, desenvolvido em **Node.js**, que permite gerenciar **perfis** e **publicações** via terminal.
## 🚀 Funcionalidades  

- Criar, editar e excluir **perfis**  
- Criar, visualizar e deletar **publicações**  
- Navegação interativa pelo terminal  

## 🛠️ Tecnologias Utilizadas  

- **Node.js**  
- **Inquirer.js** (entrada interativa no terminal)  
- **Readline-Sync** (entrada síncrona de dados)  

## 📌 Estrutura do Código  

O sistema é baseado em duas classes principais:  

- **`Perfil`**: Representa um usuário, armazenando informações como nome, e-mail, idade e biografia.  
- **`Publicacao`**: Gerencia as postagens, associando-as a um perfil e registrando a data de criação.  

Os menus interativos são implementados com **Inquirer.js** e **Readline-Sync** para facilitar a navegação no terminal.  

## 📦 Como Usar  

1. **Clone o repositório:**  
   ```bash
   git clone https://github.com/seu-usuario/rede-social.git
   cd rede-social
   ```  
2. **Instale as dependências:**  
   ```bash
   npm install inquirer readline-sync  
   ```  
3. **Execute o sistema:**  
   ```bash
   node app.js  
   ```  
