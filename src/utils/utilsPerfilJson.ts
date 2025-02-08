import { FILE } from 'dns/promises';
import path from 'path';
import { Perfil } from '../models/Perfil';
import fs from 'fs';
import { Console } from 'console';


export const FILE_PATH = path.join(__dirname, '..', '..', 'src', 'data', 'perfis.json');


// Função para ler o arquivo JSON
export function readJSONFile(fileName: string): any {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) { 
        return { perfis: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { perfis: [] };
    }
}


// Função para escrever no arquivo JSON
export function writeJSONFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}


// Lê o arquivo JSON
const DATA = readJSONFile(FILE_PATH); // JSON ' perfis.json ' recebe o nome de ' DATA '


export function validarInformacoesUsuario(nomeVerificar: string, emailVerificar: string): boolean {

    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomeVerificar || DATA.perfis[i]._email === emailVerificar) {

            return false;
        }
    }
    return true;
}


export function adicionarPerfilNoJson(perfil: Perfil): void {
    DATA.perfis.push(perfil);

    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(FILE_PATH, DATA);
}


export function alterarDescricaoPerfil(nomePerfil: string, novaDescricao: string): void {

    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomePerfil) {
            DATA.perfis[i]._descricao = novaDescricao;

            // Escrever os dados de volta no arquivo JSON
            writeJSONFile(FILE_PATH, DATA);
        }
    }
}


export function adicionarPedidoAmizade(nomeRemetente: string, nomeDestinatario: string) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomeDestinatario) {
            DATA.perfis[i]._pedidosAmizade.push(nomeRemetente);

            // Escrever os dados de volta no arquivo JSON
            writeJSONFile(FILE_PATH, DATA);
        }
    }
}


export function aceitarPedidoAmizade(perfilAtualNome: string, nomePerfilAceitar: string) {

    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === perfilAtualNome) {
            const pedidos: string[] = DATA.perfis[i]._pedidosAmizade;

            const index = pedidos.findIndex((nome: string) => nome === nomePerfilAceitar);

            if (index !== -1) {
                // Remove o pedido usando splice (removendo 1 elemento a partir do índice encontrado)
                pedidos.splice(index, 1);

                // Escreve as alterações de volta no JSON para persistir a modificação
                writeJSONFile(FILE_PATH, DATA);
            }

            // Adiciona o nome no array de amigos para o perfil atual, se ainda não estiver presente
            if (!DATA.perfis[i]._amigos.includes(nomePerfilAceitar)) {
                DATA.perfis[i]._amigos.push(nomePerfilAceitar);

                // Escreve as alterações de volta no JSON para persistir a modificação
                writeJSONFile(FILE_PATH, DATA);
            }

            // Procura o perfil que enviou a solicitação e adiciona o perfilAtualNome nos amigos dele
            for (let j = 0; j < DATA.perfis.length; j++) {
                if (DATA.perfis[j]._nome === nomePerfilAceitar) {
                    if (!DATA.perfis[j]._amigos.includes(perfilAtualNome)) {
                        DATA.perfis[j]._amigos.push(perfilAtualNome);

                        // Escreve as alterações de volta no JSON para persistir a modificação
                        writeJSONFile(FILE_PATH, DATA);
                    }

                    break;
                }
            }
            break;
        }
    }
}