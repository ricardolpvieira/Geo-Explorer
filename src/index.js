#!/usr/bin/env node
import { exibirTrilha } from "./commands/trilha.js";
import { exibirDesafio } from "./commands/desafio.js";
import { exibirCertificado } from "./commands/certificado.js";

const [, , comando, ...args] = process.argv;

const AJUDA = `
╔══════════════════════════════════════════════╗
║           GEO-EXPLORER  🌍                  ║
║   Explorador de Trilhas de Aprendizagem      ║
╚══════════════════════════════════════════════╝

Uso:
  node src/index.js <comando> [argumentos]

Comandos disponíveis:

  trilha <tecnologia> [nivel]
      Exibe a trilha de estudos da tecnologia informada.
      Exemplo: node src/index.js trilha JavaScript iniciante

  desafio <tecnologia> <nivel>
      Gera um desafio de código para a tecnologia e nível.
      Exemplo: node src/index.js desafio Python intermediario

  certificado "<nome>" <tecnologia>
      Emite um certificado fictício de conclusão de trilha.
      Exemplo: node src/index.js certificado "Maria Silva" React

  ajuda
      Exibe este menu de ajuda.

Tecnologias disponíveis : JavaScript, Python, React, Node.js, SQL
Níveis disponíveis      : iniciante, intermediario, avancado
`;

if (!comando || comando === "ajuda" || comando === "help") {
  console.log(AJUDA);
  process.exit(0);
}

switch (comando.toLowerCase()) {
  case "trilha": {
    const [tecnologia, nivel] = args;
    if (!tecnologia) {
      console.log("\n❌  Informe a tecnologia.\n    Uso: node src/index.js trilha <tecnologia> [nivel]\n");
      process.exit(1);
    }
    exibirTrilha(tecnologia, nivel);
    break;
  }

  case "desafio": {
    const [tecnologia, nivel] = args;
    if (!tecnologia) {
      console.log("\n❌  Informe a tecnologia.\n    Uso: node src/index.js desafio <tecnologia> <nivel>\n");
      process.exit(1);
    }
    exibirDesafio(tecnologia, nivel);
    break;
  }

  case "certificado": {
    const [nome, tecnologia] = args;
    exibirCertificado(nome, tecnologia);
    break;
  }

  default:
    console.log(`\n❌  Comando desconhecido: "${comando}"\n`);
    console.log(AJUDA);
    process.exit(1);
}
