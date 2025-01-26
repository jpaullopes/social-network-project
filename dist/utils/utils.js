"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarId = gerarId;
function gerarId() {
    let id = '';
    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera 8 números aleatórios entre 0 e 9
        id += numeroAleatorio.toString();
    }
    return id; // Retorna a string ID completa
}
// Exemplo de uso:
const novoId = gerarId();
console.log(`ID Gerado: ${novoId}`);
