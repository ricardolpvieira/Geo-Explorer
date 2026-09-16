import { buscarDesafio } from "../src/commands/desafio.js";

describe("buscarDesafio", () => {
  test("encontra desafio para JavaScript iniciante", () => {
    const desafio = buscarDesafio("JavaScript", "iniciante");
    expect(desafio).not.toBeNull();
    expect(desafio).toHaveProperty("titulo");
    expect(desafio).toHaveProperty("descricao");
    expect(desafio).toHaveProperty("dica");
    expect(desafio.nivel).toBe("iniciante");
  });

  test("encontra desafio para Python avancado", () => {
    const desafio = buscarDesafio("Python", "avancado");
    expect(desafio).not.toBeNull();
    expect(desafio.tecnologia).toBe("Python");
  });

  test("retorna null para nível inexistente", () => {
    const desafio = buscarDesafio("JavaScript", "expert");
    expect(desafio).toBeNull();
  });

  test("retorna null para tecnologia inexistente", () => {
    const desafio = buscarDesafio("COBOL", "iniciante");
    expect(desafio).toBeNull();
  });

  test("busca é case-insensitive para tecnologia", () => {
    const desafio = buscarDesafio("python", "iniciante");
    expect(desafio).not.toBeNull();
  });

  test("busca é case-insensitive para nível", () => {
    const desafio = buscarDesafio("JavaScript", "INICIANTE");
    expect(desafio).not.toBeNull();
  });

  test("ignora acentos na busca pelo nível", () => {
    const desafio = buscarDesafio("Python", "avançado");
    expect(desafio).not.toBeNull();
  });
});
