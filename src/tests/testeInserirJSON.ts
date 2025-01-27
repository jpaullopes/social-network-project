import { Perfil } from "../models/Perfil";
import fs from 'fs';
import { validarInformacoesUsuario, adicionarPerfilNoJson, alterarDescricaoPerfil } from "../utils/utilsPerfilJson";


// const jao = new Perfil('alvaro', 'pinto@gmail.com', '123456798998');

// if (validarInformacoesUsuario("alvaro","pinto@gmail.com")) {
//     adicionarPerfilNoJson(jao);
//     console.log("Perfil adicionado com sucesso!");
// } else {
//     console.log("Perfil já cadastrado!");
// }

alterarDescricaoPerfil("alvaro", " qro viverrrrrrrrrrr");



