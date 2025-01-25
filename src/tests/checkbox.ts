import inquirer from 'inquirer';

async function selecionarInteresses() {
  // Lista de interesses
  const interesses = [
    'Tecnologia',
    'Esportes',
    'Música',
    'Artes',
    'Viagens',
    'Livros',
    'Fotografia',
    'Culinária'
  ];

  // Pergunta com tipo checkbox
  const resposta = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'interessesSelecionados',
      message: 'Selecione seus interesses:',
      choices: interesses,
    },
  ]);

  // Exibe os interesses selecionados
  console.log('Você selecionou os seguintes interesses:');
  resposta.interessesSelecionados.forEach((interesse: string) => {
    console.log(interesse);
  });
}

selecionarInteresses();
