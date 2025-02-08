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

            console.log('Descricao Alterada');
        }
    }
}

export function atualizarPerfilNoJson(perfilAtualizado: Perfil): void {
    // Lê o conteúdo atual do arquivo
    const data = readJSONFile(FILE_PATH);
    
    // Procura o índice do perfil que será atualizado (usando o _id ou _nome, por exemplo)
    const index = data.perfis.findIndex((p: any) => p._id === perfilAtualizado.id);
    
    if (index !== -1) {
      // Atualiza o perfil com os dados atuais
      data.perfis[index] = perfilAtualizado;
      // Escreve os dados atualizados de volta no arquivo JSON
      writeJSONFile(FILE_PATH, data);
    }
  }
  