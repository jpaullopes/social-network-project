import os from 'os'; // Importa o módulo 'os' do Node.js
import {exec} from 'child_process'; // Importa a função 'exec' do módulo 'child_process' do Node.js

// Função que gera um ID aleatório de 8 dígitos para os Perfis
export function gerarId(): string {
    let id = '';

    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera 8 números aleatórios entre 0 e 9
        id += numeroAleatorio.toString();
    }
    return id; // Retorna a string ID completa
    // listadeIDSJapassados = [12333545]
}

// Função que verifica se um email tem formato válido
export function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
} //acho que nem vai precisar pq na hora do cadastro ele já vai fazer a verificação de email


export function clearConsole(): void {
    const isWindows = os.platform() === 'win32';
    process.stdout.write(isWindows ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");
}