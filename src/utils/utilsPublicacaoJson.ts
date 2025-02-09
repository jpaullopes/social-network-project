import { FILE } from 'dns/promises';
import path from 'path';
import { Publicacao } from '../models/Publicacao';
import fs from 'fs';
import { Console } from 'console';
import { removerInteracoes } from './utilsInteracaoJson';


// Update FILE_PATH using path.join for Windows
export const FILE_PATH = path.join(__dirname, '..', '..', 'src', 'data', 'publicacoes.json');

// Função para ler o arquivo JSON
export function readJSONFile(fileName: string): any {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) { 
        return { publicacoes: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { publicacoes: [] };
    }
}


// Lê o arquivo JSON
const DATA = readJSONFile(FILE_PATH); // JSON ' publicacao ' recebe o nome de ' DATA '


// Função para escrever no arquivo JSON
export function writeJSONFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}

// Adiciona publicação no JSON
export function adicionarPublicacaoNoJson(publicacao: Publicacao) {
    DATA.publicacoes.push(publicacao);

    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(FILE_PATH, DATA);
}


// Função para filtrar publicações por nome do autor
export function filtrarPublicacoesPorAutor(nomePerfilAutor: string): Publicacao[] {
    // Retorna um array com todas as publicações do Perfil selecionado
    return DATA.publicacoes.filter((publicacao: any) => publicacao._perfilDoAutor === nomePerfilAutor);
}


export function removerPublicacao(nomePerfilAutor: string, idPublicacaoRemover: string) {

    for (let i = 0; i < DATA.publicacoes.length; i++) {
        if (DATA.publicacoes[i]._perfilDoAutor === nomePerfilAutor && DATA.publicacoes[i]._id === idPublicacaoRemover) {
            DATA.publicacoes.splice(i, 1);  // Remove a publicação correspondente

            writeJSONFile(FILE_PATH, DATA);

            break;
        }
    }
    removerInteracoes(idPublicacaoRemover); 
}