/**
 * Gera os dados de um certificado fictício.
 * @param {string} nome   - Nome do participante
 * @param {string} tecnologia - Tecnologia da trilha concluída
 * @returns {object}
 */
export function gerarCertificado(nome, tecnologia) {
  if (!nome || !tecnologia) return null;

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const codigo = `GEO-${tecnologia
    .toUpperCase()
    .replace(/\s+/g, "")
    .slice(0, 4)}-${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, "0")}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;

  return {
    nome,
    tecnologia,
    data: dataFormatada,
    codigo,
    instituicao: "Geo-Explorer Academy",
    mensagem: `Certificamos que ${nome} concluiu com êxito a Trilha de ${tecnologia} na plataforma Geo-Explorer Academy.`,
  };
}

/**
 * Formata e exibe um certificado fictício no terminal.
 * @param {string} nome
 * @param {string} tecnologia
 */
export function exibirCertificado(nome, tecnologia) {
  if (!nome || !tecnologia) {
    console.log(
      "\n❌  Informe o nome e a tecnologia.\n" +
        "    Uso: node src/index.js certificado \"Seu Nome\" JavaScript\n"
    );
    return null;
  }

  const cert = gerarCertificado(nome, tecnologia);

  const borda = "★".repeat(54);
  const linha = "─".repeat(54);

  console.log(`\n${borda}`);
  console.log(`${"★"} ${" ".repeat(50)} ${"★"}`);
  console.log(`${"★"}${"  GEO-EXPLORER ACADEMY — CERTIFICADO FICTÍCIO  ".padStart(52).padEnd(53)}${"★"}`);
  console.log(`${"★"} ${" ".repeat(50)} ${"★"}`);
  console.log(`${borda}`);
  console.log(`\n  Certificamos que\n`);
  console.log(`       🎓  ${cert.nome.toUpperCase()}`);
  console.log(`\n  concluiu com êxito a\n`);
  console.log(`       📚  Trilha de ${cert.tecnologia}`);
  console.log(`\n${linha}`);
  console.log(`  Data de emissão : ${cert.data}`);
  console.log(`  Código          : ${cert.codigo}`);
  console.log(`  Instituição     : ${cert.instituicao}`);
  console.log(`\n${borda}\n`);

  return cert;
}
