import inquirer from "inquirer";

const perfis = [
    { id: 1, nome: "joao123" },
    { id: 2, nome: "maria_s2" },
    { id: 3, nome: "carlos_rock" },
    { id: 4, nome: "ana_bella" },
    { id: 5, nome: "pedro_gamer" },
    { id: 6, nome: "lucas_fitness" },
    { id: 7, nome: "mariana_art" },
    { id: 8, nome: "fernanda_travel" },
    { id: 9, nome: "paulo_music" },
    { id: 10, nome: "clara_foodie" },
    { id: 11, nome: "ricardo_photography" },
    { id: 12, nome: "bia_books" },
    { id: 13, nome: "rafael_sports" },
    { id: 14, nome: "juliana_fashion" },
    { id: 15, nome: "gabriel_tech" },
    { id: 16, nome: "larissa_yoga" },
    { id: 17, nome: "felipe_travel" },
    { id: 18, nome: "patricia_cooking" },
    { id: 19, nome: "gustavo_fitness" },
    { id: 20, nome: "renata_art" },
    { id: 21, nome: "thiago_music" },
    { id: 22, nome: "camila_foodie" },
    { id: 23, nome: "bruno_photography" },
    { id: 24, nome: "aline_books" },
    { id: 25, nome: "eduardo_sports" },
    { id: 26, nome: "vanessa_fashion" },
    { id: 27, nome: "rodrigo_tech" },
    { id: 28, nome: "tatiana_yoga" },
    { id: 29, nome: "marcelo_travel" },
    { id: 30, nome: "simone_cooking" },
    { id: 31, nome: "andre_fitness" },
    { id: 32, nome: "carla_art" },
    { id: 33, nome: "leandro_music" },
    { id: 34, nome: "sabrina_foodie" },
    { id: 35, nome: "diego_photography" },
    { id: 36, nome: "natalia_books" },
    { id: 37, nome: "alexandre_sports" },
    { id: 38, nome: "roberta_fashion" },
    { id: 39, nome: "fabio_tech" },
    { id: 40, nome: "isabela_yoga" },
    { id: 41, nome: "henrique_travel" },
    { id: 42, nome: "daniela_cooking" },
    { id: 43, nome: "vitor_fitness" },
    { id: 44, nome: "luana_art" }
  ];

async function buscarPerfil() {
  const resposta = await inquirer.prompt([
    {
      type: "input",
      name: "pesquisa",
      message: "Digite o nome do perfil para busca:",
    },
  ]);

  const pesquisa = resposta.pesquisa.toLowerCase();

  // Filtra os perfis com base na pesquisa
  const resultados = perfis.filter(perfil =>
    perfil.nome.toLowerCase().includes(pesquisa)
  );

  if (resultados.length === 0) {
    console.log("Nenhum perfil encontrado.");
    return;
  }

  // Cria uma lista de nomes para selecionar
  const escolhas = resultados.map(perfil => perfil.nome);

  // Pergunta ao usuário para escolher um perfil dos resultados encontrados
  const escolha = await inquirer.prompt([
    {
      type: "list",
      name: "perfilEscolhido",
      message: "Selecione um perfil:",
      choices: escolhas,
    },
  ]);

  // Mostra o perfil selecionado
  const perfilSelecionado = resultados.find(
    perfil => perfil.nome === escolha.perfilEscolhido
  );
  console.log(`Você selecionou: ${perfilSelecionado?.nome}`);
}

buscarPerfil();
