# NØVA Design System — escopo e auditoria inicial

**Status: em implantação.** Este documento não afirma que os requisitos estão concluídos. O objetivo é cobrir os 11 pilares aprovados, evoluindo o código existente sem reconstrução desnecessária.

[Módulo 01 — Identidade visual e cores](NOVA-DESIGN-SYSTEM-MODULO-01.md)

[Módulo 02 — Tipografia](NOVA-DESIGN-SYSTEM-MODULO-02.md)

[Módulo 03 — Espaçamento e geometria](NOVA-DESIGN-SYSTEM-MODULO-03.md)

[Módulo 04 — Hierarquia visual e composição](NOVA-DESIGN-SYSTEM-MODULO-04.md)

[Módulo 05 — Componentes e variantes](NOVA-DESIGN-SYSTEM-MODULO-05.md)

[Módulo 06 — Estados e comportamento](NOVA-DESIGN-SYSTEM-MODULO-06.md)

[Módulo 07 — Animações e movimento](NOVA-DESIGN-SYSTEM-MODULO-07.md)

## O que já foi observado no repositório (10/11/2026)
- React/Vite e rotas separadas em Home, Catálogo, Produto, Carrinho, Checkout e Favoritos.
- Componentes como Layout, Header, Footer, ProductCard e CartDrawer.
- Variáveis existentes para preto, branco, vermelho, cinza e bordas.
- Hierarquia de títulos e CTA, grades para produtos/categorias, breakpoints para tablet/mobile.
- Foco visível, skip link e preferência por movimento reduzido já aparecem no CSS.
- Checkout, preços, estoque, frete e dados de produto são **demonstrativos**, sem backend nem transações reais.

**Não validado ainda:** WCAG, contraste elemento por elemento, teclado/leitor de tela, cobertura de testes, qualidade de estados de erro, performance e consistência geral entre componentes. Não marcar esses pontos como concluídos sem teste.

## Inventário de 11 frentes (todas fazem parte do escopo)
1. Identidade visual e cores: paletas, semântica, contraste, temas, marca, ícones, texturas.
2. Tipografia: famílias, escalas, pesos, entrelinhas, títulos, texto, preço e responsividade.
3. Espaçamento e geometria: tokens, margens, paddings, gaps, grids, breakpoints, raios, bordas, sombras e proporções.
4. Hierarquia visual e composição: prioridades, CTA, agrupamento, escaneabilidade, ritmo, áreas promocionais e estados vazios.
5. Componentes e variantes: botões, controles, busca, cards, menus, filtros, overlays, mensagens, loaders, tabelas e seletores.
6. Estados e comportamento: hover/focus/active, disabled/loading, validação, feedback, indisponibilidade, navegação e teclado.
7. Animações e movimento: durações, easing, microinterações, menus, modais, cards, carrinho, transições e redução de movimento.
8. Responsividade e acessibilidade: mobile, alvos de toque, semântica, navegação, contraste, zoom, leitor de tela e erros.
9. E-commerce: categorias, busca, produto, variantes, preços, carrinho, checkout, frete, favoritos, avaliações e confiança.
10. Arquitetura front-end: componentes compartilhados, tokens, convenções, hooks, rotas, dados, testes e performance.
11. Documentação e governança: catálogo, exemplos de uso, decisões, versão, revisões e regressão visual.

## Fases de implementação
- **Fase 1 — Foundation**: centralizar tokens, inventariar estilos atuais, revisar hierarquia e definir padrões.
- **Fase 2 — Components**: migrar componentes compartilhados, estados, acessibilidade e variantes.
- **Fase 3 — Motion & Responsive**: microinterações coerentes, navegabilidade e testes em diferentes dispositivos.
- **Fase 4 — Commerce UX**: aprimorar jornada de descoberta, produto, carrinho e checkout demonstrativo.
- **Fase 5 — Quality & Governance**: documentação viva, testes automatizados, contraste e revisão de performance.

## Convenções iniciais
- Novas decisões globais devem utilizar `--nova-*` e, quando possível, tokens semânticos.
- Preserve as classes legadas enquanto componentes são migrados; evite regressões visuais.
- Cor de estado não pode ser o único mecanismo de feedback.
- Acessibilidade e performance fazem parte dos critérios de conclusão, não de uma etapa opcional.
- Tema escuro é opt-in; o visual claro existente continua sendo o padrão.
- Não alterar o comportamento de compra demonstrativa sem separar claramente protótipo de operação comercial real.

## Critérios de conclusão
Cada item deve ter implementação, demonstração, documentação e verificação de uso. Checkbox marcado na conversa é **aprovação do escopo**, não evidência de implementação.
