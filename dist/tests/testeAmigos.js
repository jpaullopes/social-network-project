"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../models/App");
// adicionarPedidoAmizade("thaa", "joaopaulo");
// aceitarPedidoAmizade("joaopaulo", "thaa");
let app = new App_1.App();
app.linkarDados();
console.log(app.getPerfis());
