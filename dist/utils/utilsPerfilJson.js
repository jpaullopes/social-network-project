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
exports.alterarSenhaPerfil = alterarSenhaPerfil;
exports.adicionarPedidoAmizade = adicionarPedidoAmizade;
exports.aceitarPedidoAmizade = aceitarPedidoAmizade;
exports.removerAmigo = removerAmigo;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.FILE_PATH = path_1.default.join(__dirname, '..', '..', 'src', 'data', 'perfis.json');
// Função para ler o arquivo JSON
function readJSONFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf-8');
    if (fileContent.trim().length === 0) {
        return { perfis: [] }; // Retorna um objeto JSON vazio se o arquivo estiver vazio
    }
    try {
        return JSON.parse(fileContent);
    }
    catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        return { perfis: [] };
    }
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
        }
    }
}
function alterarSenhaPerfil(nomePerfil, novaSenha) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomePerfil) {
            DATA.perfis[i]._senha = novaSenha;
            // Escrever os dados de volta no arquivo JSON
            writeJSONFile(exports.FILE_PATH, DATA);
        }
    }
}
function adicionarPedidoAmizade(nomeRemetente, nomeDestinatario) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === nomeDestinatario) {
            DATA.perfis[i]._pedidosAmizade.push(nomeRemetente);
            // Escrever os dados de volta no arquivo JSON
            writeJSONFile(exports.FILE_PATH, DATA);
        }
    }
}
function aceitarPedidoAmizade(perfilAtualNome, nomePerfilAceitar) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === perfilAtualNome) {
            const pedidos = DATA.perfis[i]._pedidosAmizade;
            const index = pedidos.findIndex((nome) => nome === nomePerfilAceitar);
            if (index !== -1) {
                // Remove o pedido usando splice (removendo 1 elemento a partir do índice encontrado)
                pedidos.splice(index, 1);
                // Escreve as alterações de volta no JSON para persistir a modificação
                writeJSONFile(exports.FILE_PATH, DATA);
            }
            // Adiciona o nome no array de amigos para o perfil atual, se ainda não estiver presente
            if (!DATA.perfis[i]._amigos.includes(nomePerfilAceitar)) {
                DATA.perfis[i]._amigos.push(nomePerfilAceitar);
                // Escreve as alterações de volta no JSON para persistir a modificação
                writeJSONFile(exports.FILE_PATH, DATA);
            }
            // Procura o perfil que enviou a solicitação e adiciona o perfilAtualNome nos amigos dele
            for (let j = 0; j < DATA.perfis.length; j++) {
                if (DATA.perfis[j]._nome === nomePerfilAceitar) {
                    if (!DATA.perfis[j]._amigos.includes(perfilAtualNome)) {
                        DATA.perfis[j]._amigos.push(perfilAtualNome);
                        // Escreve as alterações de volta no JSON para persistir a modificação
                        writeJSONFile(exports.FILE_PATH, DATA);
                    }
                    break;
                }
            }
            break;
        }
    }
}
function removerAmigo(perfilAtualNome, nomeAmigoRemover) {
    for (let i = 0; i < DATA.perfis.length; i++) {
        if (DATA.perfis[i]._nome === perfilAtualNome) {
            const amigos = DATA.perfis[i]._amigos;
            const index = amigos.findIndex((nome) => nome === nomeAmigoRemover);
            if (index !== -1) {
                // Remove o amigo do array de amigos do perfil atual
                amigos.splice(index, 1);
                // Escreve as alterações de volta no JSON para persistir a modificação
                writeJSONFile(exports.FILE_PATH, DATA);
            }
            // Remove o perfilAtualNome do array de amigos da outra pessoa
            for (let j = 0; j < DATA.perfis.length; j++) {
                if (DATA.perfis[j]._nome === nomeAmigoRemover) {
                    const amigosOutroPerfil = DATA.perfis[j]._amigos;
                    const indexOutroPerfil = amigosOutroPerfil.findIndex((nome) => nome === perfilAtualNome);
                    if (indexOutroPerfil !== -1) {
                        amigosOutroPerfil.splice(indexOutroPerfil, 1);
                        // Escreve as alterações de volta no JSON para persistir a modificação
                        writeJSONFile(exports.FILE_PATH, DATA);
                    }
                    break;
                }
            }
            break;
        }
    }
}
