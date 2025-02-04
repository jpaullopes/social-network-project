"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarPublicacaoNoJson = adicionarPublicacaoNoJson;
const FILE_PATH = '../../src/data/publicacoes.json'; // SUJEITO A MUDANÇAS
const fs_1 = __importDefault(require("fs"));
// Função para ler o arquivo JSON
function readJSONFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { publicacoes: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    return JSON.parse(fileContent);
}
// Lê o arquivo JSON
const DATA = readJSONFile(FILE_PATH); // JSON ' publicacao ' recebe o nome de ' DATA '
// Função para escrever no arquivo JSON
function writeJSONFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(filePath, jsonData, 'utf-8');
}
function adicionarPublicacaoNoJson(publicacao) {
    DATA.publicacoes.push(publicacao);
    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(FILE_PATH, DATA);
}
