import path from 'path';
import fs from 'fs';
import { Interacao } from '../models/Interacao';

// Define the JSON file path for interações
export const FILE_PATH = path.join(__dirname, '..', '..', 'src', 'data', 'interacoes.json');

// Função que lê o arquivo JSON de interações
export function readJSONFile(fileName: string): any {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { interacoes: [] };
    }
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { interacoes: [] };
    }
}

// Lê o arquivo JSON
const DATA = readJSONFile(FILE_PATH); // JSON ' interacoes ' recebe o nome de ' DATA '


// fUNÇÃO QE ESCREVE NO ARQUIVO JSOUN 
export function writeJSONFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}


export function adicionarInteracaoNoJson(interacaoInstancia: Interacao) {
    DATA.interacoes.push(interacaoInstancia);

    writeJSONFile(FILE_PATH, DATA);
}


export function removerInteracoes(idPublicacaoRemover: string) {
    for (let i = 0; i < DATA.interacoes.length; i++) {
        if (DATA.interacoes[i]._idPublicacao === idPublicacaoRemover) {
            DATA.interacoes.splice(i, 1);  // Remove a publicação correspondente

            writeJSONFile(FILE_PATH, DATA);
        }
    }
}