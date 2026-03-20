# MCP Servers

Configurações de MCP servers para uso com OpenCode.

## Playwright MCP

Browser automation via MCP. Ideal para loops agênticos longos que precisam de estado persistente do browser.

### Quando usar MCP vs CLI

- **MCP (este arquivo)**: Para automação exploratória, self-healing tests, workflows longos onde contexto persistente do browser importa mais que custo de tokens.
- **Playwright CLI com Skills**: Melhor para coding agents de alta frequência — mais eficiente em tokens.

### Instalação no OpenCode

Adicione ao seu `~/.config/opencode/opencode.json` ou ao `opencode.json` do projeto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": [
        "npx",
        "@playwright/mcp@latest"
      ],
      "enabled": true
    }
  }
}
```

### Ferramentas disponíveis

- `browser_navigate` — Navegar para URL
- `browser_click` — Clicar em elemento
- `browser_type` — Digitar texto
- `browser_snapshot` — Capturar accessibility tree (melhor que screenshot para agentes)
- `browser_take_screenshot` — Tirar screenshot
- `browser_fill_form` — Preencher múltiplos campos
- `browser_wait_for` — Aguardar texto ou tempo
- `browser_evaluate` — Executar JavaScript
- E muitas outras...

### Opções úteis

```json
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest", "--headless"],
      "enabled": true
    }
  }
}
```

Para rodar headless (sem interface gráfica), adicione `"--headless"` nos args.
