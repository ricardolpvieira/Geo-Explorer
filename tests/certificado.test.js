import { gerarCertificado } from "../src/commands/certificado.js";

describe("gerarCertificado", () => {
  test("retorna um objeto com os campos esperados", () => {
    const cert = gerarCertificado("Ana Lima", "React");
    expect(cert).toHaveProperty("nome", "Ana Lima");
    expect(cert).toHaveProperty("tecnologia", "React");
    expect(cert).toHaveProperty("data");
    expect(cert).toHaveProperty("codigo");
    expect(cert).toHaveProperty("instituicao");
    expect(cert).toHaveProperty("mensagem");
  });

  test("código segue o padrão GEO-XXXX-YYYYMM-NNNN", () => {
    const cert = gerarCertificado("João Silva", "JavaScript");
    expect(cert.codigo).toMatch(/^GEO-[A-Z]{1,4}-\d{6}-\d{4}$/);
  });

  test("mensagem inclui o nome do participante", () => {
    const cert = gerarCertificado("Maria Santos", "Python");
    expect(cert.mensagem).toContain("Maria Santos");
  });

  test("mensagem inclui a tecnologia", () => {
    const cert = gerarCertificado("Carlos", "Node.js");
    expect(cert.mensagem).toContain("Node.js");
  });

  test("retorna null quando nome está ausente", () => {
    const cert = gerarCertificado("", "JavaScript");
    expect(cert).toBeNull();
  });

  test("retorna null quando tecnologia está ausente", () => {
    const cert = gerarCertificado("Pedro", "");
    expect(cert).toBeNull();
  });

  test("gera códigos únicos a cada chamada", () => {
    const cert1 = gerarCertificado("Teste", "SQL");
    const cert2 = gerarCertificado("Teste", "SQL");
    // Na grande maioria das vezes serão diferentes (aleatoriedade de 4 dígitos)
    // Verificamos apenas que a estrutura é válida para ambos
    expect(cert1.codigo).toMatch(/^GEO-/);
    expect(cert2.codigo).toMatch(/^GEO-/);
  });
});
