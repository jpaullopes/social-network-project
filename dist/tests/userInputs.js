"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// Lista de nomes de usuários existentes
const usuariosExistentes = [
    "joao123", "maria_s2", "carlos_rock", "ana_bella", "pedro_gamer",
    "lucas_fitness", "mariana_art", "fernanda_travel", "paulo_music",
    "clara_foodie", "ricardo_photography", "bia_books", "rafael_sports",
    "juliana_fashion", "gabriel_tech", "larissa_yoga", "felipe_travel",
    "patricia_cooking", "gustavo_fitness", "renata_art", "thiago_music",
    "camila_foodie", "bruno_photography", "aline_books", "eduardo_sports",
    "vanessa_fashion", "rodrigo_tech", "tatiana_yoga", "marcelo_travel",
    "simone_cooking", "andre_fitness", "carla_art", "leandro_music",
    "sabrina_foodie", "diego_photography", "natalia_books", "alexandre_sports",
    "roberta_fashion", "fabio_tech", "isabela_yoga", "henrique_travel",
    "daniela_cooking", "vitor_fitness", "luana_art"
];
async function solicitarCadastro() {
    // Pergunta para o email
    const { email, username, senha } = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Digite seu email:',
            validate: (input) => {
                // Validação simples de email
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(input)) {
                    return 'Por favor, insira um email válido!';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'username',
            message: 'Escolha um nome de usuário:',
            validate: (input) => {
                if (input.length < 3) {
                    return 'O nome de usuário deve ter pelo menos 3 caracteres!';
                }
                if (usuariosExistentes.includes(input)) {
                    return 'Este nome de usuário já está em uso. Por favor, escolha outro!';
                }
                return true;
            }
        },
        {
            type: 'password',
            name: 'senha',
            message: 'Digite sua senha:',
            mask: '*', // Exibe a senha como asteriscos
            validate: (input) => {
                if (input.length < 6) {
                    return 'A senha deve ter pelo menos 6 caracteres!';
                }
                return true;
            }
        }
    ]);
    // Exibe os dados coletados
    console.log('\nCadastro concluído com sucesso!');
    console.log(`Email: ${email}`);
    console.log(`Username: ${username}`);
    console.log(`Senha: ${senha}`); // Não exibe a senha real por segurança
}
solicitarCadastro();
