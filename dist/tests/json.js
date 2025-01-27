"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const Perfil_1 = require("../models/Perfil");
const alvare = new Perfil_1.Perfil('Alvare', 'alvare@gmail.com', '123456798999898989998');
const FILE_PATH = '../../src/data/perfis.json';
// Função para ler o arquivo JSON
function readJSONFile(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { perfis: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    return JSON.parse(fileContent);
}
// Função para escrever no arquivo JSON
function writeJSONFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}
// Ler o arquivo JSON
const data = readJSONFile(FILE_PATH);
if (verificarSeUsarioExiste("João")) {
    console.log('Usuário já existe');
}
else {
    console.log('Usuário não existe');
}
data.perfis.push(alvare);
// Escrever os dados de volta no arquivo JSON
writeJSONFile(FILE_PATH, data);
function verificarSeUsarioExiste(nomeVerificar) {
    const data = readJSONFile(FILE_PATH);
    for (let i = 0; i < data.perfis.length; i++) {
        if (data.perfis[i]._nome === nomeVerificar) {
            return true;
        }
    }
    return false;
}
