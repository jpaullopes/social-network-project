import inquirer from "inquirer";

//função que realiza o cadastro do usuario
export async function cadastrarUsuario(): Promise<void> {
  const respostas = await inquirer.prompt([
    {
      name: "nome",
      message: "Digite seu nome:",
      type: "input",
    },
    {
      name: "email",
      message: "Digite seu email:",
      type: "input",
    },
    {
      name: "senha",
      message: "Digite sua senha:",
      type: "password",
    },
  ]);

  console.log("Usuário cadastrado com sucesso!");
  console.log(respostas);
}