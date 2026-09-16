import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const trilhasPath = join(__dirname, "../../data/trilhas.json");

/**
 * Carrega todas as trilhas do arquivo de dados.
 * @returns {Array} lista de trilhas
 */
export function carregarTrilhas() {
  const raw = readFileSync(trilhasPath, "utf-8");
  return JSON.parse(raw);
}

/**
 * Busca uma trilha pelo nome da tecnologia e, opcionalmente, pelo nível.
 * @param {string} tecnologia
 * @param {string} [nivel]
 * @returns {object|null}
 */
export function buscarTrilha(tecnologia, nivel) {
  const trilhas = carregarTrilhas();

  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const tecNorm = normalizar(tecnologia);
  const nivNorm = nivel ? normalizar(nivel) : null;

  const resultado = trilhas.filter((t) => {
    const matchTec = normalizar(t.tecnologia) === tecNorm;
    const matchNiv = nivNorm ? normalizar(t.nivel) === nivNorm : true;
    return matchTec && matchNiv;
  });

  if (resultado.length === 0) return null;
  // Se houver mais de uma (ex: sem filtro de nível), retorna a de menor nível
  return resultado[0];
}

/**
 * Formata e exibe uma trilha de estudos no terminal.
 * @param {string} tecnologia
 * @param {string} [nivel]
 */
export function exibirTrilha(tecnologia, nivel) {
  const trilha = buscarTrilha(tecnologia, nivel);

  if (!trilha) {
    console.log(
      `\n❌  Trilha não encontrada para: "${tecnologia}"${nivel ? ` (${nivel})` : ""}.`
    );
    console.log(
      "💡  Tecnologias disponíveis: JavaScript, Python, React, Node.js, SQL\n"
    );
    return null;
  }

  const linha = "─".repeat(52);

  console.log(`\n${"═".repeat(52)}`);
  console.log(`  🗺️  TRILHA: ${trilha.tecnologia.toUpperCase()} — ${trilha.nivel.toUpperCase()}`);
  console.log(`${"═".repeat(52)}`);
  console.log(`\n  ${trilha.descricao}\n`);
  console.log(`  ⏱  Duração estimada: ${trilha.duracao_semanas} semanas`);
  console.log(`\n${linha}`);
  console.log("  MÓDULOS");
  console.log(linha);

  for (const modulo of trilha.modulos) {
    console.log(`\n  ${modulo.ordem}. ${modulo.titulo}`);
    for (const topico of modulo.topicos) {
      console.log(`     • ${topico}`);
    }
  }

  console.log(`\n${"═".repeat(52)}\n`);
  return trilha;
}
