import { buscarTrilha, carregarTrilhas } from "../src/commands/trilha.js";

describe("carregarTrilhas", () => {
  test("retorna um array não vazio", () => {
    const trilhas = carregarTrilhas();
    expect(Array.isArray(trilhas)).toBe(true);
    expect(trilhas.length).toBeGreaterThan(0);
  });

  test("cada trilha possui os campos obrigatórios", () => {
    const trilhas = carregarTrilhas();
    for (const t of trilhas) {
      expect(t).toHaveProperty("id");
      expect(t).toHaveProperty("tecnologia");
      expect(t).toHaveProperty("nivel");
      expect(t).toHaveProperty("descricao");
      expect(t).toHaveProperty("modulos");
      expect(Array.isArray(t.modulos)).toBe(true);
    }
  });
});

describe("buscarTrilha", () => {
  test("encontra trilha por tecnologia (case-insensitive)", () => {
    const trilha = buscarTrilha("javascript");
    expect(trilha).not.toBeNull();
    expect(trilha.tecnologia).toBe("JavaScript");
  });

  test("encontra trilha por tecnologia e nível", () => {
    const trilha = buscarTrilha("Python", "avancado");
    expect(trilha).not.toBeNull();
    expect(trilha.nivel).toBe("avancado");
  });

  test("retorna null para tecnologia inexistente", () => {
    const trilha = buscarTrilha("COBOL");
    expect(trilha).toBeNull();
  });

  test("retorna null para combinação tecnologia/nível inexistente", () => {
    const trilha = buscarTrilha("SQL", "avancado");
    expect(trilha).toBeNull();
  });

  test("ignora acentos na busca pelo nível", () => {
    // "avançado" → normaliza para "avancado"
    const trilha = buscarTrilha("Python", "avançado");
    expect(trilha).not.toBeNull();
  });
});
