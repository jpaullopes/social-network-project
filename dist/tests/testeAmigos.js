"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../models/App");
// adicionarPedidoAmizade("thaa", "joaopaulo");
// aceitarPedidoAmizade("joaopaulo", "thaa");
let app = new App_1.App();
app.linkarDados();
const perfilJoao = app.buscarPerfilPorNome("ana");
const perfilTha = app.buscarPerfilPorNome("vulva");
if (perfilJoao && perfilTha) {
    app.aceitarPedidoAmizade(perfilJoao, perfilTha);
}
else {
    console.error("One or both profiles were not found.");
}
