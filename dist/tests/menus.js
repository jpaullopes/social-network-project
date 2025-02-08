"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../models/App");
const app = new App_1.App();
app.linkarDados();
console.log(app.getInteracoes());
