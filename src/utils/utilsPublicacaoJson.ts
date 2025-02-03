const FILE_PATH = '../../src/data/publicacao.json'; // SUJEITO A MUDANÇAS
import { FILE } from 'dns/promises';
import { Publicacao } from '../models/Publicacao';
import fs, { read, readFile } from 'fs';
import { Console } from 'console';


// Função para ler o arquivo JSON
function readJSONFile(fileName: string): any {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) { 
        return { publicacoes: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    return JSON.parse(fileContent);
}


// Lê o arquivo JSON
const DATA = readJSONFile(FILE_PATH); // JSON ' publicacao ' recebe o nome de ' DATA '


// Função para escrever no arquivo JSON
function writeJSONFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}


export function adicionarPublicacaoNoJson(publicacao: Publicacao) {
    DATA.publicacoes.push(publicacao);

    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(FILE_PATH, DATA);
}