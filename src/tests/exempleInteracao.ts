import { Interacao } from "../models/interacao";

// Criar uma nova interação com ID gerado automaticamente
const interacao1 = new Interacao("gostei", "joao123");
interacao1.exibirInteracao(); // Exibe a interação com ID gerado automaticamente

// Criar uma nova interação com ID fornecido
const interacao2 = new Interacao("não gostei", "maria_s2", "12345678");
interacao2.exibirInteracao(); // Exibe a interação com o ID fornecido