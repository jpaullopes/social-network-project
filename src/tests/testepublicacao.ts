import { Publicacao } from "../models/Publicacao";
import { Perfil } from "../models/Perfil";

// Criar uma nova publicação simples
const publicacao1 = new Publicacao("HOJE EU SONHEI QUE ESTAVA EM UMA SITUAÇÃO ONDE 50 MULEHRES ME ATACAVAM E ME DESPIAM, NESSE SONHO ELAS SE APROVEITAVAM DE MIM E TANANAN...", "joao123");

// Exibir a publicação
publicacao1.exibirPublicacao();

console.log("---------------------------------------------")
;// Criar outra publicação simples com ID fornecido
const publicacao2 = new Publicacao("HOJE EU SONHEI QUE ESTAVA EM MOSCOL DANÇANDO PAGODE RUSSO NA CIDADE DE PEIDOU", "maria_s2");

// Exibir a segunda publicação
publicacao2.exibirPublicacao();

// Criar um perfil


// Adicionar publicações ao perfil está em desenvolvimento
//perfil1.adicionarPostagem(publicacao1);
//perfil2.adicionarPostagem(publicacao2);
