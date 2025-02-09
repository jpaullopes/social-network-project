"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_PATH = void 0;
exports.readJSONFile = readJSONFile;
exports.writeJSONFile = writeJSONFile;
exports.adicionarPublicacaoNoJson = adicionarPublicacaoNoJson;
exports.filtrarPublicacoesPorAutor = filtrarPublicacoesPorAutor;
exports.removerPublicacao = removerPublicacao;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utilsInteracaoJson_1 = require("./utilsInteracaoJson");
// Update FILE_PATH using path.join for Windows
exports.FILE_PATH = path_1.default.join(__dirname, '..', '..', 'src', 'data', 'publicacoes.json');
// Função para ler o arquivo JSON
function readJSONFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { publicacoes: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    try {
        return JSON.parse(fileContent);
    }
    catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { publicacoes: [] };
    }
}
// Lê o arquivo JSON
const DATA = readJSONFile(exports.FILE_PATH); // JSON ' publicacao ' recebe o nome de ' DATA '
// Função para escrever no arquivo JSON
function writeJSONFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(filePath, jsonData, 'utf-8');
}
// Adiciona publicação no JSON
function adicionarPublicacaoNoJson(publicacao) {
    DATA.publicacoes.push(publicacao);
    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(exports.FILE_PATH, DATA);
}
// Função para filtrar publicações por nome do autor
function filtrarPublicacoesPorAutor(nomePerfilAutor) {
    // Retorna um array com todas as publicações do Perfil selecionado
    return DATA.publicacoes.filter((publicacao) => publicacao._perfilDoAutor === nomePerfilAutor);
}
function removerPublicacao(nomePerfilAutor, idPublicacaoRemover) {
    for (let i = 0; i < DATA.publicacoes.length; i++) {
        if (DATA.publicacoes[i]._perfilDoAutor === nomePerfilAutor && DATA.publicacoes[i]._id === idPublicacaoRemover) {
            DATA.publicacoes.splice(i, 1); // Remove a publicação correspondente
            writeJSONFile(exports.FILE_PATH, DATA);
            break;
        }
    }
    (0, utilsInteracaoJson_1.removerInteracoes)(idPublicacaoRemover);
}
