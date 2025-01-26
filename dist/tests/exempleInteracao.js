"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PublicacaoAvancada_1 = require("../models/PublicacaoAvancada");
const Perfil_1 = require("../models/Perfil");
const Interacao_1 = require("../models/Interacao");
// Criar uma nova publicação avançada
const publicacao1 = new PublicacaoAvancada_1.PublicacaoAvancada("Conteúdo detalhado da publicação.", "joao123");
// Exibir a publicação
publicacao1.exibirPublicacao();
// Criar outra publicação avançada com ID fornecido
const publicacao2 = new PublicacaoAvancada_1.PublicacaoAvancada("Outro conteúdo detalhado.", "maria_s2");
// Exibir a segunda publicação
publicacao2.exibirPublicacao();
// Criar um perfil
const perfil1 = new Perfil_1.Perfil("1", "joao123", "joao@example.com", "ativo", [], []);
perfil1.adicionarAmigo("maria_s2");
perfil1.listarAmigos();
// Criar uma interação
const interacao1 = new Interacao_1.Interacao("gostei", "joao123");
interacao1.exibirInteracao();
