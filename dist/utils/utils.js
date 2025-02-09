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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarId = gerarId;
exports.verificarIdÚnico = verificarIdÚnico;
exports.validarEmail = validarEmail;
exports.clearConsole = clearConsole;
const os_1 = __importDefault(require("os")); // Importa o módulo 'os' do Node.js
const lp = __importStar(require("../utils/utilsPublicacaoJson")); //responsavel pela leitur e escrita json de publicações
const lu = __importStar(require("../utils/utilsPerfilJson")); //responsavel pela leitur e escrita json de usuarios
const li = __importStar(require("../utils/utilsInteracaoJson")); //responsavel pela leitur e escrita json de interações
// Função que gera um ID aleatório de 8 dígitos para os Perfis
function gerarId() {
    let id = '';
    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera 8 números aleatórios entre 0 e 9
        id += numeroAleatorio.toString();
    }
    if (verificarIdÚnico(id)) {
        return id;
    }
    else {
        gerarId();
    }
}
function verificarIdÚnico(id) {
    const DATA_PERFIS = lu.readJSONFile(lu.FILE_PATH);
    const DATA_PUBLICACOES = lp.readJSONFile(lp.FILE_PATH);
    const DATA_INTERACOES = li.readJSONFile(li.FILE_PATH);
    for (let i = 0; i < DATA_PERFIS.perfis.length; i++) {
        if (DATA_PERFIS.perfis[i]._id === id) {
            return false;
        }
    }
    for (let i = 0; i < DATA_PUBLICACOES.publicacoes.length; i++) {
        if (DATA_PUBLICACOES.publicacoes[i]._id === id) {
            return false;
        }
    }
    for (let i = 0; i < DATA_INTERACOES.interacoes.length; i++) {
        if (DATA_INTERACOES.interacoes[i]._id === id) {
            return false;
        }
    }
    return true;
}
// Função que verifica se um email tem formato válido
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
} //acho que nem vai precisar pq na hora do cadastro ele já vai fazer a verificação de email
function clearConsole() {
    const isWindows = os_1.default.platform() === 'win32';
    process.stdout.write(isWindows ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");
}
