import { carregarTrilhas } from "./trilha.js";

/**
 * Busca um desafio para a tecnologia e nível informados.
 * @param {string} tecnologia
 * @param {string} nivel - iniciante | intermediario | avancado
 * @returns {object|null}
 */
export function buscarDesafio(tecnologia, nivel) {
  const trilhas = carregarTrilhas();

  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const tecNorm = normalizar(tecnologia);
  const nivNorm = normalizar(nivel);

  // Procura em qualquer trilha da tecnologia um desafio com o nível informado
  for (const trilha of trilhas) {
    if (normalizar(trilha.tecnologia) !== tecNorm) continue;

    const desafio = trilha.desafios?.find(
      (d) => normalizar(d.nivel) === nivNorm
    );

    if (desafio) return { tecnologia: trilha.tecnologia, ...desafio };
  }

  return null;
}

/**
 * Formata e exibe um desafio de código no terminal.
 * @param {string} tecnologia
 * @param {string} nivel
 */
export function exibirDesafio(tecnologia, nivel) {
  if (!nivel) {
    console.log(
      "\n❌  Informe o nível do desafio: iniciante, intermediario ou avancado.\n"
    );
    return null;
  }

  const desafio = buscarDesafio(tecnologia, nivel);

  if (!desafio) {
    console.log(
      `\n❌  Desafio não encontrado para: "${tecnologia}" — nível "${nivel}".`
    );
    console.log(
      "💡  Verifique a tecnologia e o nível informados.\n"
    );
    return null;
  }

  const linha = "─".repeat(52);

  console.log(`\n${"═".repeat(52)}`);
  console.log(`  💻  DESAFIO: ${desafio.tecnologia.toUpperCase()} — ${desafio.nivel.toUpperCase()}`);
  console.log(`${"═".repeat(52)}`);
  console.log(`\n  📌  ${desafio.titulo}`);
  console.log(`\n${linha}`);
  console.log(`  ${desafio.descricao}`);
  console.log(`\n${linha}`);
  console.log(`  💡  Dica: ${desafio.dica}`);
  console.log(`\n${"═".repeat(52)}\n`);

  return desafio;
}
