import os from 'os'; // Importa o módulo 'os' do Node.js
import {exec} from 'child_process'; // Importa a função 'exec' do módulo 'child_process' do Node.js
import { read } from 'fs';
import * as lp from "../utils/utilsPublicacaoJson"; //responsavel pela leitur e escrita json de publicações
import * as lu from "../utils/utilsPerfilJson"; //responsavel pela leitur e escrita json de usuarios
import * as li from "../utils/utilsInteracaoJson"; //responsavel pela leitur e escrita json de interações

// Função que gera um ID aleatório de 8 dígitos para os Perfis
export function gerarId(): string | any {
    let id = '';

    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera 8 números aleatórios entre 0 e 9
        id += numeroAleatorio.toString();
    }

    if (verificarIdÚnico(id)) {
        return id;
    } else {
        gerarId();
    }
}


export function verificarIdÚnico(id: string): boolean {
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
export function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
} //acho que nem vai precisar pq na hora do cadastro ele já vai fazer a verificação de email


export function clearConsole(): void {
    const isWindows = os.platform() === 'win32';
    process.stdout.write(isWindows ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");
}

