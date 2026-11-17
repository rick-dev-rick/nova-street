# NØVA STREET

Demonstração de e-commerce streetwear unissex para o portfólio rick_dev. O projeto reúne uma vitrine editorial com direção cinematográfica, um Design System próprio e uma jornada de compra demonstrativa. Produtos, medidas e frete são ilustrativos. A aplicação não recebe pagamentos, processa pedidos ou depende de backend comercial.

## O que está implementado

- Home com campanhas cinematográficas, categorias e curadoria editorial de produtos.
- Catálogo com busca, filtros e ordenação na URL, página de produto com galeria e seleção de tamanho.
- Favoritos e sacola por variante, com persistência local quando disponível.
- Cotação local por CEP, opção de usar um CEP de exemplo e confirmação demonstrativa.

A stack é React, React Router e Vite, com JavaScript, CSS e Inter Variable. As versões efetivas ficam no [lockfile](package-lock.json). O projeto usa o executor de testes nativo do Node.js.

## Executar e testar

Use Git, Node.js 24 e npm. O workflow do projeto também usa Node.js 24.

```sh
git clone https://github.com/rick-dev-rick/nova-street.git
cd nova-street
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite. Os comandos abaixo executam a suíte, compilam o build padrão e abrem sua prévia.

```sh
npm test
npm run build
npm run preview
```

O build padrão gera `dist/`. Em hospedagem com rotas sem hash, o servidor precisa redirecionar rotas do app, como `/produto/essential-oversized-tee`, para `index.html`.

## GitHub Pages

```sh
GITHUB_PAGES=true npm run build
GITHUB_PAGES=true npm run preview
```

No PowerShell, defina `$env:GITHUB_PAGES = 'true'` e execute `npm run build` e `npm run preview` sem prefixo. Use `Remove-Item Env:GITHUB_PAGES` ao voltar ao build padrão.

A configuração do Pages usa a base `/nova-street/` e rotas como `#/catalogo`. Na configuração do repositório, selecione **GitHub Actions** como origem do Pages. O [workflow de publicação](.github/workflows/deploy.yml) instala as dependências, roda os testes, monta o build e publica o artefato em pushes para `main` ou quando acionado manualmente. Confira a execução em **Actions**. [Endereço configurado da demonstração](https://rick-dev-rick.github.io/nova-street/)

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| [src/pages/](src/pages/) | Telas da jornada e estados de cada rota |
| [src/components/](src/components/) | Layout, navegação, cards, galeria, sacola e blocos editoriais |
| [src/design-system/](src/design-system/) e [src/styles/](src/styles/) | Tokens, componentes básicos, estilos de composição e de movimento |
| [src/context/](src/context/) e [src/hooks/](src/hooks/) | Contexto de favoritos e hook de persistência |
| [src/data/](src/data/) e [src/lib/](src/lib/) | Catálogo local, detalhes demonstrativos e regras de negócio e navegação |
| [public/](public/) e [src/assets/](src/assets/) | Arquivos estáticos e recursos empacotados |
| [tests/](tests/) | Testes de regras, persistência, componentes e movimento |

## Documentação

- [Arquitetura, jornada comercial e limitações](docs/ARCHITECTURE.md)
- [Governança do Design System](docs/NOVA-DESIGN-SYSTEM.md)
- [Sistemas cinematográficos](docs/MOTION.md)
- [Registro de decisões técnicas](docs/TECHNICAL-DECISIONS.md)
- [Guia de contribuição e checklist](CONTRIBUTING.md)
- [Inventário e auditoria da documentação](docs/NOVA-DESIGN-SYSTEM-MODULO-11.md)

O catálogo é local, e sacola e favoritos ficam no navegador. As fotografias editoriais remotas dependem de acesso ao Unsplash. A recuperação após HTTP 503 no WebKit e os cenários pendentes em aparelhos físicos estão descritos em [Limitações e pendências](docs/ARCHITECTURE.md#limitações-e-pendências).
