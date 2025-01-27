const FILE_PATH = '../../src/data/perfis.json'; // SUJEITO A MUDANÇAS
import { FILE } from 'dns/promises';
import { Perfil } from '../models/Perfil';
import fs, { read, readFile } from 'fs';
import { Console } from 'console';

// Função para ler o arquivo JSON
function readJSONFile(fileName: string): any {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) { 
        return { perfis: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    return JSON.parse(fileContent);
}


// Função para escrever no arquivo JSON
function writeJSONFile(filePath: string, data: any): void {
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

            console.log('Descricao Alterada');
        }
    }
}