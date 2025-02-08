"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacaoAvancada = void 0;
const Publicacao_1 = require("./Publicacao");
const utils_1 = require("../utils/utils");
// Importa a função wrapText da utilsExibicoes
const utilsExibicoes_1 = require("../utils/utilsExibicoes");
class PublicacaoAvancada extends Publicacao_1.Publicacao {
    constructor(conteudo, perfilDoAutor, listaDeInteracao = [], tipo = 'pa', dataDePublicacao = new Date(), id = (0, utils_1.gerarId)()) {
        super(conteudo, perfilDoAutor, tipo, dataDePublicacao, id); // Chamada ao construtor da classe base
        this._listaDeInteracao = listaDeInteracao;
    }
    adicionarInteracao(interacao) {
        this._listaDeInteracao.push(interacao);
    }
    listarInteracoes() {
        for (let interacao of this._listaDeInteracao) {
            interacao.exibirInteracao();
        }
    }
    //retorna o array de interações
    getInteracoes() {
        return this._listaDeInteracao;
    }
    /**
     * Exibe esta publicação avançada em uma caixinha estilizada com reações.
     */
    exibirPublicacao() {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        // Tamanho fixo da caixa: 80% do terminal, com mínimo de 40 colunas
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO AVANÇADA";
        const dataFormatada = new Date(this.dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this.perfilDoAutor} | Data: ${dataFormatada}`;
        // Quebra cada parte usando o tamanho fixo
        const wrappedHeader = (0, utilsExibicoes_1.wrapText)(header, fixedInnerWidth);
        const wrappedInfo = (0, utilsExibicoes_1.wrapText)(info, fixedInnerWidth);
        const wrappedContent = (0, utilsExibicoes_1.wrapContentToBox)(this.conteudo, fixedInnerWidth);
        // Processa reações
        const reactCount = { '👍': 0, '👎': 0, '😂': 0, '😲': 0 };
        this._listaDeInteracao.forEach(interacao => {
            if (reactCount.hasOwnProperty(interacao.tipo)) {
                reactCount[interacao.tipo]++;
            }
            else {
                reactCount[interacao.tipo] = 1;
            }
        });
        const reactStrFull = `Reações: ${Object.entries(reactCount)
            .map(([emoji, count]) => `${emoji} ${count}`)
            .join(' | ')}`;
        const wrappedReact = (0, utilsExibicoes_1.wrapText)(reactStrFull, fixedInnerWidth);
        // Junta as linhas da caixa
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent,
            "",
            ...wrappedReact
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        const leftPad = ' '.repeat(padLeft);
        const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        console.log(topo);
        linhas.forEach(linha => {
            const padded = linha.padEnd(caixaLargura, ' ');
            // Removidos espaços extras entre a borda e o conteúdo
            const rightExtra = wrappedReact.includes(linha) ? "    " : "";
            console.log(leftPad + "║" + padded + rightExtra + "║");
        });
        console.log(fundo);
    }
    getExibicaoFormatada(exibindo = false) {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO AVANÇADA";
        const dataFormatada = new Date(this.dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this.perfilDoAutor} | Data: ${dataFormatada}`;
        const wrappedHeader = (0, utilsExibicoes_1.wrapText)(header, fixedInnerWidth);
        const wrappedInfo = (0, utilsExibicoes_1.wrapText)(info, fixedInnerWidth);
        const wrappedContent = (0, utilsExibicoes_1.wrapContentToBox)(this.conteudo, fixedInnerWidth);
        // Processa reações
        const reactCount = { '👍': 0, '👎': 0, '😂': 0, '😲': 0 };
        this._listaDeInteracao.forEach(interacao => {
            if (reactCount.hasOwnProperty(interacao.tipo)) {
                reactCount[interacao.tipo]++;
            }
            else {
                reactCount[interacao.tipo] = 1;
            }
        });
        const reactStrFull = `Reações: ${Object.entries(reactCount)
            .map(([emoji, count]) => `${emoji} ${count}`)
            .join(' | ')}`;
        const wrappedReact = (0, utilsExibicoes_1.wrapText)(reactStrFull, fixedInnerWidth);
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent,
            "",
            ...wrappedReact
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        const leftPad = ' '.repeat(padLeft);
        const topo = ' '.repeat(padLeft - 2) + "╔" + "═".repeat(caixaLargura) + "╗";
        if (exibindo) {
            const topo = ' '.repeat(padLeft) + "╔" + "═".repeat(caixaLargura) + "╗";
        }
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        let box = topo + "\n";
        linhas.forEach(linha => {
            const rightExtra = wrappedReact.includes(linha) ? "    " : "";
            box += leftPad + "║" + linha.padEnd(caixaLargura, ' ') + rightExtra + "║\n";
        });
        box += fundo;
        return box;
    }
}
exports.PublicacaoAvancada = PublicacaoAvancada;
