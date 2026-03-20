# Guia de Skills por Tipo de Projeto

Este documento serve como referência rápida para identificar quais skills são mais adequadas dependendo do tipo e contexto do projeto.

---

## Projeto Básico / Genérico

Projetos simples, scripts, automações, ou quando você precisa de orientação geral.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `systematic-debugging` | Qualquer bug ou erro inesperado |
| `finishing-a-branch` | Antes de finalizar trabalho ou criar PR |
| `napkin` | Memória persistente de aprendizados do projeto |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `dev-cli-tools` | Dúvidas sobre ferramentas CLI disponíveis |
| `test-driven-development` | Ao escrever testes unitários |

---

## Frontend / Web

Projetos React, Vue, Next.js, ou qualquer aplicação web com interface.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `interface-design` | Design de UI consistente, espaçamento, cores |
| `systematic-debugging` | Bugs em componentes ou estado |
| `test-driven-development` | Testes de componentes React/Vue |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `finishing-a-branch` | Antes de fazer deploy ou PR |
| `napkin` | Manter padrão de design entre sessões |
| `firecrawl-web` | Precisa capturar conteúdo de sites para análise |

---

## Backend / API

Projetos Node.js, Python, Java, ou qualquer serviço de API.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `systematic-debugging` | Erros de API, banco de dados, conexão |
| `test-driven-development` | Testes de endpoints e lógica de negócio |
| `finishing-a-branch` | Antes de deploy ou release |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `dev-cli-tools` | Orientação sobre ferramentas por stack (Node/Python/Java) |
| `napkin` | Documentar decisões de arquitetura |

---

## Projeto de Dados / Análise

Jupyter notebooks, scripts de ETL, dashboards, analytics.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `systematic-debugging` | Erros em transformações de dados |
| `dev-cli-tools` | Ferramentas como `jq`, `fx`, `dasel`, `visidata` |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `finishing-a-branch` | Validação antes de usar dados em produção |
| `napkin` | Documentar fontes de dados e transformações |

---

## Projeto em Equipe / Colaborativo

Quando múltiplos desenvolvedores trabalham no mesmo código.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `finishing-a-branch` | **Sempre** antes de criar PR |
| `systematic-debugging` | Bugs reportados por outros |
| `napkin` | Compartilhar aprendizados com a equipe |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `test-driven-development` | Garantir que novos código têm testes |
| `interface-design` | Manter consistência quando há múltiplos contribuidores |

---

## Projeto de Longa Duração

Projetos que se estendem por semanas/meses, com múltiplas sessões.

### Essenciais
| Skill | Quando usar |
|-------|-------------|
| `napkin` | **Sempre** — acumular aprendizados entre sessões |
| `systematic-debugging` | Bugs de regressão |
| `finishing-a-branch` | Manter qualidade ao longo do tempo |

### Recomendados
| Skill | Quando usar |
|-------|-------------|
| `opencode-roadmap` | Planejamento de milestones e dependências |
| `context-analysis` | Monitorar uso de tokens em sessões longas |
| `dynamic-context-pruning` | Manter performance em conversas extensas |

---

## Projeto com Necessidades Especiais

### Ia Agent / Machine Learning
| Skill | Quando usar |
|-------|-------------|
| `dev-cli-tools` | Python, uv, ruff, jupyter tools |
| `test-driven-development` | Testes de modelos e pipelines |

### DevOps / Infraestrutura
| Skill | Quando usar |
|-------|-------------|
| `dev-cli-tools` | Docker, kubectl, awscli, terraform |
| `systematic-debugging` | Logs, containers, redes |
| `finishing-a-branch` | Validação antes de apply |

### Segurança / Auditoria
| Skill | Quando usar |
|-------|-------------|
| `dev-cli-tools` | gitleaks, trufflehog, age, op |
| `finishing-a-branch` | Verificar secrets antes de push |

---

## Quick Reference

```
Projeto novo?              → systematic-debugging, napkin, finishing-a-branch
Bug para resolver?         → systematic-debugging
Escrevendo testes?         → test-driven-development
Design de UI?              → interface-design
Dúvida sobre ferramentas? → dev-cli-tools
Antes de PR?               → finishing-a-branch
Projeto de longo prazo?   → napkin, context-analysis
Sessão muito longa?        → dynamic-context-pruning
```

---

## Como usar este guia

1. **Identifique o tipo do seu projeto** na lista acima
2. **Ative as skills essenciais** recomendadas
3. **Adicione as recomendadas** conforme necessário
4. **Consulte a Quick Reference** para decisões rápidas

Lembre-se: você pode carregar múltiplas skills simultaneamente e o OpenCode as usará conforme o contexto.
