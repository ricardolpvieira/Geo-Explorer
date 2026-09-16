# 🌍 Geo-Explorer

Explorador de trilhas de aprendizagem com desafios de código e certificados fictícios.

Desenvolvido como projeto de portfólio para o desafio da [DIO](https://www.dio.me/), o **Geo-Explorer** permite que você consulte uma trilha de estudos, receba um desafio de código e gere um certificado fictício de conclusão — tudo via linha de comando.

---

## 📁 Estrutura do Projeto

```
Geo-Explorer/
├── data/
│   └── trilhas.json          # Base de trilhas fictícias
├── src/
│   ├── index.js              # Ponto de entrada do CLI
│   └── commands/
│       ├── trilha.js         # Comando: trilha
│       ├── desafio.js        # Comando: desafio
│       └── certificado.js    # Comando: certificado
├── tests/
│   ├── trilha.test.js
│   ├── desafio.test.js
│   └── certificado.test.js
├── mcp/
│   └── server.js             # Servidor MCP
├── docs/
├── package.json
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior

### Instalação

```bash
git clone https://github.com/<seu-usuario>/Geo-Explorer.git
cd Geo-Explorer
npm install
```

---

## 🛠️ Como Usar os Comandos

### `trilha` — Plano de estudos

Exibe a trilha de estudos de uma tecnologia.

```bash
node src/index.js trilha <tecnologia> [nivel]
```

**Exemplos:**

```bash
node src/index.js trilha JavaScript
node src/index.js trilha Python iniciante
node src/index.js trilha "Node.js" intermediario
```

---

### `desafio` — Desafio de código

Gera um desafio de código para uma tecnologia e nível.

```bash
node src/index.js desafio <tecnologia> <nivel>
```

**Exemplos:**

```bash
node src/index.js desafio JavaScript iniciante
node src/index.js desafio Python avancado
node src/index.js desafio React iniciante
```

---

### `certificado` — Certificado fictício

Emite um certificado fictício de conclusão de trilha.

```bash
node src/index.js certificado "<nome>" <tecnologia>
```

**Exemplos:**

```bash
node src/index.js certificado "Maria Silva" React
node src/index.js certificado "João Santos" Python
```

---

### Tecnologias e Níveis Disponíveis

| Tecnologia | Iniciante | Intermediário | Avançado |
|---|:---:|:---:|:---:|
| JavaScript | ✅ | ✅ | ❌ |
| Python | ✅ | ❌ | ✅ |
| React | ✅ | ❌ | ❌ |
| Node.js | ❌ | ✅ | ❌ |
| SQL | ✅ | ❌ | ❌ |

---

## 🧪 Como Executar os Testes

```bash
npm test
```

O projeto utiliza **Jest** com suporte a ES Modules. Os testes cobrem:

- `trilha`: carregamento de dados, busca por tecnologia e nível, normalização de acentos
- `desafio`: busca por desafio, tratamento case-insensitive, tecnologia/nível inexistente
- `certificado`: geração de certificado, formato do código, validação de campos obrigatórios

**23 testes** no total, todos passando. ✅

---

## 🔌 Servidor MCP

O **Geo-Explorer** expõe seus comandos como ferramentas MCP (Model Context Protocol), permitindo que agentes de IA como o IBM Bob os utilizem diretamente.

### Iniciar o servidor

```bash
npm run mcp
```

### Ferramentas disponíveis

| Ferramenta | Parâmetros | Descrição |
|---|---|---|
| `get_trilha` | `tecnologia`, `nivel` (opcional) | Retorna a trilha de estudos |
| `get_desafio` | `tecnologia`, `nivel` | Retorna um desafio de código |
| `get_certificado` | `nome`, `tecnologia` | Gera um certificado fictício |

### Configurar no IBM Bob (`.bob/mcp.json`)

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["mcp/server.js"],
      "cwd": "<caminho-absoluto-para-o-projeto>"
    }
  }
}
```

---

## ✨ Melhorias Realizadas

- **Normalização de acentos e case-insensitive** em todas as buscas (ex: `avançado` = `avancado`)
- **7 trilhas** cobrindo JavaScript (2), Python (2), React, Node.js e SQL com módulos detalhados
- **2 desafios por trilha** com enunciado e dica de implementação
- **Código do certificado** com padrão único e rastreável (`GEO-XXXX-YYYYMM-NNNN`)
- **Servidor MCP** com validação de schema via Zod

---

## 📚 O Que Aprendi

- Como estruturar um projeto Node.js com ES Modules (`"type": "module"`)
- Como construir uma CLI simples sem dependências externas usando `process.argv`
- Como escrever e organizar testes com **Jest** em projetos ESM
- Como criar um **Servidor MCP** usando o SDK oficial e expor ferramentas para agentes de IA
- A importância de normalizar entradas do usuário (acentos, maiúsculas) para uma boa experiência

---

## 👤 Autor

**Ricardo L P Vieira**
- 🌐 [ricardolpvieira.com.br](https://ricardolpvieira.com.br)
- 📧 ricardo@ricardolpvieira.com.br
- 🐙 [@ricardolpvieira](https://github.com/ricardolpvieira)

---

## 📄 Licença

MIT
