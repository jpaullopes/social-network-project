import { PublicacaoAvancada } from "../models/PublicacaoAvancada";
import { Perfil } from "../models/Perfil";
import { Interacao } from "../models/Interacao";

// Criar uma nova publicação avançada
const publicacao1 = new PublicacaoAvancada("Conteúdo detalhado da publicação.", "joao123");

// Exibir a publicação
publicacao1.exibirPublicacao();

// Criar outra publicação avançada com ID fornecido
const publicacao2 = new PublicacaoAvancada("Outro conteúdo detalhado.", "maria_s2");

// Exibir a segunda publicação
publicacao2.exibirPublicacao();

// Criar um perfil
const perfil1 = new Perfil("1", "joao123", "joao@example.com", "ativo", [], []);
perfil1.adicionarAmigo("maria_s2");
perfil1.listarAmigos();

// Criar uma interação
const interacao1 = new Interacao("gostei", "joao123");
interacao1.exibirInteracao();


