import path from 'path';
import fs from 'fs';

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

// fUNÇÃO QE ESCREVE NO ARQUIVO JSOUN 
export function writeJSONFile(filePath: string, data: any): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}
