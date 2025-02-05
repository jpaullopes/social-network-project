import { Publicacao } from "./Publicacao";
import { Interacao } from "./Interacao";
import { gerarId } from "../utils/utils";
export class PublicacaoAvancada extends Publicacao {
    private listaDeInteracao: Interacao[];

    constructor (conteudo: string, perfilDoAutor: string, listaDeInteracao: Interacao[] = [],dataDePublicacao: Date = new Date(), id : string = gerarId()
    ){

        super(conteudo, perfilDoAutor, dataDePublicacao, id)// Chamada ao construtor da classe base
        this.listaDeInteracao = listaDeInteracao;
    }

    public adicionarInteracao(interacao: Interacao){
        this.listaDeInteracao.push(interacao);
    }
    
    public listarInteracoes(){
        for (let interacao of this.listaDeInteracao){
            interacao.exibirInteracao();
        }
    }

    //retorna o array de interações
    public getInteracoes(): Interacao[]{
        return this.listaDeInteracao;
    }

}
// para as ideias abaixo seria necessário trocar lista de strings para lista de numbers ou uma tupla com [number, string][]
// como eu posso adicionar uma interação? eu tava pensando em pegar o id gerado pela interação e colocar na lista de interação. ex: usuário deu gostei na publicção, o id de gostei é 1, então eu pego e adiciono 1 na minha lista de interação,.
// seria possivel adiconar o id da interação juntamente com o username de quem interagiu? ex: [1, joao123, 4, maria_s2 ...]