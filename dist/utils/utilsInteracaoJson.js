"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_PATH = void 0;
exports.readJSONFile = readJSONFile;
exports.writeJSONFile = writeJSONFile;
exports.adicionarInteracaoNoJson = adicionarInteracaoNoJson;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define the JSON file path for interações
exports.FILE_PATH = path_1.default.join(__dirname, '..', '..', 'src', 'data', 'interacoes.json');
// Função que lê o arquivo JSON de interações
function readJSONFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { interacoes: [] };
    }
    try {
        return JSON.parse(fileContent);
    }
    catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { interacoes: [] };
    }
}
// Lê o arquivo JSON
const DATA = readJSONFile(exports.FILE_PATH); // JSON ' interacoes ' recebe o nome de ' DATA '
// fUNÇÃO QE ESCREVE NO ARQUIVO JSOUN 
function writeJSONFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(filePath, jsonData, 'utf-8');
}
function adicionarInteracaoNoJson(interacaoInstancia) {
    DATA.interacoes.push(interacaoInstancia);
    writeJSONFile(exports.FILE_PATH, DATA);
}
