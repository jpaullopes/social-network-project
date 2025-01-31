import inquirer from "inquirer";

export interface EmojiDictionary { // Interface para o dicionário de emojis , foi o que deu pra fazer
    emoji: string;
    name: string;
}

//tem os emojis e seus respectivos nomes para serem usados
export const emojiList: EmojiDictionary[] = [
    { emoji: '👍', name: 'polegar para cima' },
    { emoji: '❤️', name: 'coração' },
    { emoji: '😂', name: 'rindo' },
    { emoji: '😯', name: 'surpreso' },
    { emoji: '😢', name: 'chorando' },
    { emoji: '😡', name: 'bravo' },
    { emoji: '👎', name: 'polegar para baixo' },
    { emoji: '😲', name: 'espantado' },
    { emoji: '🔥', name: 'fogo' },
    { emoji: '🎉', name: 'festa' },
    { emoji: '😍', name: 'apaixonado' },
    { emoji: '😎', name: 'óculos escuros' },
    { emoji: '🤔', name: 'pensativo' },
    { emoji: '😴', name: 'dormindo' },
    { emoji: '🤯', name: 'cabeça explodindo' },
    { emoji: '😜', name: 'piscando' },
    { emoji: '🤩', name: 'deslumbrado' },
    { emoji: '😇', name: 'anjo' },
    { emoji: '🥳', name: 'comemorando' },
    { emoji: '😷', name: 'doente' },
    { emoji: '🤒', name: 'enfermo' },
    { emoji: '🤕', name: 'machucado' },
    { emoji: '🤑', name: 'dinheiro' },
    { emoji: '🤠', name: 'caubói' },
    { emoji: '😈', name: 'diabinho sorridente' },
    { emoji: '👿', name: 'diabinho bravo' },
    { emoji: '👻', name: 'fantasma' },
    { emoji: '💀', name: 'caveira' },
    { emoji: '☠️', name: 'caveira e ossos cruzados' },
    { emoji: '👽', name: 'alienígena' },
    { emoji: '👾', name: 'monstro alienígena' },
    { emoji: '🤖', name: 'robô' },
    { emoji: '🎃', name: 'abóbora' },
    { emoji: '😺', name: 'gato sorridente' },
    { emoji: '😸', name: 'gato sorridente com olhos sorridentes' },
    { emoji: '😹', name: 'gato chorando de rir' },
    { emoji: '😻', name: 'gato apaixonado' },
    { emoji: '😼', name: 'gato com sorriso irônico' },
    { emoji: '😽', name: 'gato beijando' },
    { emoji: '🙀', name: 'gato cansado' },
    { emoji: '😿', name: 'gato chorando' },
    { emoji: '😾', name: 'gato emburrado' },
    { emoji: '👤', name: 'silhueta' }
];

//função que vai ser usad para pesquisar o emoji que a pessoa quer
export async function pesquisaEmojis() {
    let emojis = emojiList;
    while (true) {
      const resposta = await inquirer.prompt([
        {
          type: "input",
          name: "pesquisa",
          message: "Digite o nome do emoji (digite 'sair' para encerrar):",
        },
      ]);
  
      const pesquisa = resposta.pesquisa.toLowerCase();
  
      if (pesquisa === 'sair') {
        console.log("Encerrando a busca.");
        break;
      }
  
      // Filtra os emojis com base na pesquisa
      const resultados = emojis.filter(emoji =>
        emoji.name.toLowerCase().includes(pesquisa.toLowerCase())
      )
  
      if (resultados.length === 0) {
        console.log("Nenhum emoji encontrado.");
        continue;
      }
  
      // Cria uma lista de nomes para selecionar
      const escolhas = resultados.map(emoji => emoji.name);//segue comentario importante abixo
      //SEGUINTE SÓ MUDAR O EMOJI.EMOJI PARA EXIBIR ELE, EU SÓ COLOQUEI O NOME PRA TESTAR
      escolhas.push('Sair');
  
      const { escolha } = await inquirer.prompt([
        {
          type: "list",
          name: "escolha",
          message: "Selecione um emoji ou escolha 'Sair' para encerrar:",
          choices: escolhas
        }
      ]);
  
      if (escolha === 'Sair') {
        console.log("Encerrando a busca.");
        break;
      }
  
    console.log(`Você selecionou o emoji: ${escolha}`);
    }
  }