import { Perfil } from "../models/Perfil";
import { PerfilAvancado } from "../models/PerfilAvancado";
import { aceitarPedidoAmizade, adicionarPedidoAmizade } from "../utils/utilsPerfilJson";
import { App } from "../models/App";

// adicionarPedidoAmizade("thaa", "joaopaulo");

// aceitarPedidoAmizade("joaopaulo", "thaa");


let app = new App();
app.linkarDados();

const perfilJoao = app.buscarPerfilPorNome("ana");
const perfilTha = app.buscarPerfilPorNome("vulva");
if (perfilJoao && perfilTha) {
	app.aceitarPedidoAmizade(perfilJoao, perfilTha);
} else {
	console.error("One or both profiles were not found.");
}