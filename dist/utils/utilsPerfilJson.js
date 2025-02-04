"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_PATH = void 0;
exports.readJSONFile = readJSONFile;
exports.writeJSONFile = writeJSONFile;
exports.validarInformacoesUsuario = validarInformacoesUsuario;
exports.adicionarPerfilNoJson = adicionarPerfilNoJson;
exports.alterarDescricaoPerfil = alterarDescricaoPerfil;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.FILE_PATH = path_1.default.join(__dirname, '..', '..', 'src', 'data', 'perfis.json');
// Função para ler o arquivo JSON
function readJSONFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { perfis: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    return JSON.parse(fileContent);
}
// Função para escrever no arquivo JSON
function writeJSONFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(filePath, jsonData, 'utf-8');
}
// Lê o arquivo JSON
const DATA = readJSONFile(exports.FILE_PATH); // JSON ' perfis.json ' recebe o nome de ' DATA '
function validarInformacoesUsuario(nomeVerificar, emailVerificar) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomeVerificar || DATA.perfis[i]._email === emailVerificar) {
            return false;
        }
    }
    return true;
}
function adicionarPerfilNoJson(perfil) {
    DATA.perfis.push(perfil);
    // Escrever os dados de volta no arquivo JSON
    writeJSONFile(exports.FILE_PATH, DATA);
}
function alterarDescricaoPerfil(nomePerfil, novaDescricao) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomePerfil) {
            DATA.perfis[i]._descricao = novaDescricao;
            // Escrever os dados de volta no arquivo JSON
            writeJSONFile(exports.FILE_PATH, DATA);
            console.log('Descricao Alterada');
        }
    }
}
