"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publicacao_1 = require("../models/Publicacao");
const Perfil_1 = require("../models/Perfil");
const PublicacaoAvancada_1 = require("../models/PublicacaoAvancada");
const utilsPublicacaoJson_1 = require("../utils/utilsPublicacaoJson");
// // Criar uma nova publicação simples
// const publicacao1 = new Publicacao("HOJE EU SONHEI QUE ESTAVA EM UMA SITUAÇÃO ONDE 50 MULEHRES ME ATACAVAM E ME DESPIAM, NESSE SONHO ELAS SE APROVEITAVAM DE MIM E TANANAN...", "joao123");
// // Exibir a publicação
// publicacao1.exibirPublicacao();
// console.log("---------------------------------------------")
// ;// Criar outra publicação simples com ID fornecido
// const publicacao2 = new Publicacao("HOJE EU SONHEI QUE ESTAVA EM MOSCOL DANÇANDO PAGODE RUSSO NA CIDADE DE PEIDOU", "maria_s2");
// // Exibir a segunda publicação
// publicacao2.exibirPublicacao();
// // Criar um perfil
// // Adicionar publicações ao perfil está em desenvolvimento
// //perfil1.adicionarPostagem(publicacao1);
// //perfil2.adicionarPostagem(publicacao2);
const jao = new Perfil_1.Perfil('jao', 'pinto@gmail.com', '123456798998');
const publicacao1 = new Publicacao_1.Publicacao('SLAAAAAAAA', 'jao');
const publicacao2 = new PublicacaoAvancada_1.PublicacaoAvancada("SEI TUDOOO", "alavare");
(0, utilsPublicacaoJson_1.adicionarPublicacaoNoJson)(publicacao1);
(0, utilsPublicacaoJson_1.adicionarPublicacaoNoJson)(publicacao2);
