import { Perfil } from "../models/Perfil";
import { PerfilAvancado } from "../models/PerfilAvancado";
import { aceitarPedidoAmizade, adicionarPedidoAmizade } from "../utils/utilsPerfilJson";
import { App } from "../models/App";

// adicionarPedidoAmizade("thaa", "joaopaulo");

// aceitarPedidoAmizade("joaopaulo", "thaa");


let app = new App();
app.linkarDados();


console.log(app.getPerfis());