"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarId = gerarId;
exports.validarEmail = validarEmail;
exports.clearConsole = clearConsole;
const os_1 = __importDefault(require("os")); // Importa o módulo 'os' do Node.js
// Função que gera um ID aleatório de 8 dígitos para os Perfis
function gerarId() {
    let id = '';
    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera 8 números aleatórios entre 0 e 9
        id += numeroAleatorio.toString();
    }
    return id; // Retorna a string ID completa
    // listadeIDSJapassados = [12333545]
}
// Função que verifica se um email tem formato válido
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
} //acho que nem vai precisar pq na hora do cadastro ele já vai fazer a verificação de email
// Limpa a tela
function clearConsole() {
    const isWindows = os_1.default.platform() === 'win32';
    process.stdout.write(isWindows ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");
}
