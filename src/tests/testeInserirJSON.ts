import { Perfil } from "../models/Perfil";
import fs from 'fs';
import { validarInformacoesUsuario, adicionarPerfilNoJson, alterarDescricaoPerfil } from "../utils/utilsPerfilJson";
import { PerfilAvancado } from "../models/PerfilAvancado";


const jao = new Perfil('alvaro', 'pinto@gmail.com', '123456798998');
const tha = new PerfilAvancado('al', 'to@gmail.com', '12345698');



console.log(tha.status);
tha.desabilitarPerfil(tha);
console.log(tha.status);
