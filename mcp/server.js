import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { buscarTrilha } from "../src/commands/trilha.js";
import { buscarDesafio } from "../src/commands/desafio.js";
import { gerarCertificado } from "../src/commands/certificado.js";

const server = new McpServer({
  name: "geo-explorer",
  version: "1.0.0",
});

// ─── Tool: get_trilha ────────────────────────────────────────────────────────
server.registerTool(
  "get_trilha",
  {
    description:
      "Retorna a trilha de aprendizagem para uma tecnologia e nível opcionais.",
    inputSchema: {
      tecnologia: z.string().describe("Nome da tecnologia (ex: JavaScript, Python, React)"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .optional()
        .describe("Nível da trilha (opcional)"),
    },
  },
  async ({ tecnologia, nivel }) => {
    const trilha = buscarTrilha(tecnologia, nivel);

    if (!trilha) {
      return {
        content: [
          {
            type: "text",
            text: `Trilha não encontrada para "${tecnologia}"${nivel ? ` (${nivel})` : ""}.`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(trilha, null, 2),
        },
      ],
    };
  }
);

// ─── Tool: get_desafio ───────────────────────────────────────────────────────
server.registerTool(
  "get_desafio",
  {
    description:
      "Retorna um desafio de código para a tecnologia e nível informados.",
    inputSchema: {
      tecnologia: z.string().describe("Nome da tecnologia"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .describe("Nível do desafio"),
    },
  },
  async ({ tecnologia, nivel }) => {
    const desafio = buscarDesafio(tecnologia, nivel);

    if (!desafio) {
      return {
        content: [
          {
            type: "text",
            text: `Desafio não encontrado para "${tecnologia}" — nível "${nivel}".`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(desafio, null, 2),
        },
      ],
    };
  }
);

// ─── Tool: get_certificado ───────────────────────────────────────────────────
server.registerTool(
  "get_certificado",
  {
    description:
      "Gera um certificado fictício de conclusão de trilha para o nome e tecnologia informados.",
    inputSchema: {
      nome: z.string().describe("Nome completo do participante"),
      tecnologia: z.string().describe("Tecnologia da trilha concluída"),
    },
  },
  async ({ nome, tecnologia }) => {
    const cert = gerarCertificado(nome, tecnologia);

    if (!cert) {
      return {
        content: [
          {
            type: "text",
            text: "Nome e tecnologia são obrigatórios para gerar o certificado.",
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(cert, null, 2),
        },
      ],
    };
  }
);

// ─── Start ───────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
