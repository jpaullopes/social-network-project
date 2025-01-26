"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publicacao_1 = require("./Publicacao");
class PublicacaoAvancada extends Publicacao_1.Publicacao {
    constructor(id, conteudo, dataDePublicacao = new Date(), perfilDoAutor, listaDeInteracao) {
        super(id, conteudo, perfilDoAutor); // Chamada ao construtor da classe base
        this.listaDeInteracao = listaDeInteracao;
    }
    adicionarInteracao(interacao) {
        this.listaDeInteracao.push(interacao);
    }
    listarInteracoes() {
        for (let interacao of this.listaDeInteracao) {
            interacao.exibirInteracao();
        }
    }
}
// para as ideias abaixo seria necessário trocar lista de strings para lista de numbers ou uma tupla com [number, string][]
// como eu posso adicionar uma interação? eu tava pensando em pegar o id gerado pela interação e colocar na lista de interação. ex: usuário deu gostei na publicção, o id de gostei é 1, então eu pego e adiciono 1 na minha lista de interação,.
// seria possivel adiconar o id da interação juntamente com o username de quem interagiu? ex: [1, joao123, 4, maria_s2 ...]
