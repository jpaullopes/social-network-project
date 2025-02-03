"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("../models/Perfil");
const utilsPublicacaoJson_1 = require("../utils/utilsPublicacaoJson");
const PublicacaoAvancada_1 = require("../models/PublicacaoAvancada");
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
const perfil1 = new Perfil_1.Perfil("lopes", "jao@gmail.com", "777777", ";-;");
const publicacao1 = new PublicacaoAvancada_1.PublicacaoAvancada('hoje eu sonhei q estava em moscou', 'lopes');
(0, utilsPublicacaoJson_1.adicionarPublicacaoNoJson)(publicacao1);
