import { Perfil } from "../models/Perfil";
import fs from 'fs';
import { validarInformacoesUsuario, adicionarPerfilNoJson, alterarDescricaoPerfil } from "../utils/utilsPerfilJson";
import { PerfilAvancado } from "../models/PerfilAvancado";


const iglesio = new Perfil('Igrejas', 'pintooooooooo@gmail.com', 'amoothalysson', ";-;");

if (validarInformacoesUsuario("Igrejas", "pintoooooo@gmail.com")) {
    adicionarPerfilNoJson(iglesio);
}