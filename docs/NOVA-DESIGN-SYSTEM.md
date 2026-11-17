# NØVA Design System

A identidade da NØVA STREET combina preto, branco e vermelho com fotografia editorial, títulos de alto contraste e acentos pontuais. Este guia orienta mudanças no sistema vigente. Os relatórios dos módulos preservam o contexto, as decisões e as evidências de cada entrega.

## Cores, marca e tratamento editorial

- Use `--nova-color-*` de acordo com o papel. Combine texto e superfície, ação e texto sobre ação, ou controle e borda de controle. `--nova-brand-*` e `--nova-neutral-*` definem a paleta e servem de base aos papéis semânticos. Os pares `success`, `warning`, `error` e `info` têm cores de texto e superfície próprias. Aplique cada estado com uma mensagem legível.
- O tema claro é o padrão. Áreas escuras são delimitadas com `data-nova-theme="dark"`, que redefine papéis semânticos e o esquema dos controles nativos. Confira o contraste no tema usado pela seção e sobre as fotos mais claras do conjunto.
- Reuse `BrandWordmark` para a marca no cabeçalho, menu e rodapé, e preserve a grafia NØVA STREET. O favicon tem desenho próprio. Nos controles de favorito, `HeartIcon` acompanha `currentColor` e o botão fornece nome e estado acessíveis.
- Gradientes de legenda, textura e tratamento monocromático têm tokens `--nova-treatment-*`. Preserve a leitura das legendas sobre imagens e a proporção prevista para o quadro. Quando a foto transmite informação sobre um produto, forneça texto alternativo. Em imagens decorativas, mantenha alternativa vazia.

[Tokens](../src/design-system/tokens.css) · [Wordmark](../src/design-system/BrandWordmark.jsx) · [Favicon](../public/nova-mark.svg) · [Favorito](../src/components/FavoriteButton.jsx) · [Ícone de coração](../src/design-system/HeartIcon.jsx)

## Tipografia e hierarquia

A Inter Variable é empacotada com a aplicação, com `font-display: swap` e famílias de sistema como fallback. A escala usa `--nova-type-*` para tamanhos, entrelinhas, espaçamento entre letras e largura de leitura. Os títulos fluidos e o texto em `rem` acompanham os ajustes de fonte do navegador. `.eyebrow` identifica o contexto da seção. `.price` reserva tratamento de peso e algarismos tabulares.

Use um título principal para identificar a página e títulos subordinados conforme a estrutura do conteúdo. Escolha a escala visual pelo papel editorial. Em uma seção, agrupe identificação, título e próxima ação em `.section-heading` onde esse padrão couber. Dê à ação principal a maior ênfase e mantenha as alternativas na hierarquia secundária ou textual. Preserve nome, preço e controles de produto com ponteiro, teclado e toque.

[Tipografia](../src/design-system/typography.css) · [Estilos da loja](../src/styles/app.css) · [Card de produto](../src/components/ProductCard.jsx)

## Espaçamento, geometria e responsividade

A escala `--nova-space-*` parte de 4 px e inclui intervalos intermediários. `.container` define largura e margens, incluindo as áreas seguras quando o navegador fornece os insets. `.section` usa a cadência vertical compartilhada. Os grids ajustam `--nova-grid-columns` e, se necessário, `--grid-gap`. Use as proporções de produto e editorial para reservar espaço à imagem e os tokens de raio, borda, sombra e tamanho mínimo dos controles conforme o contexto.

| Faixa existente | Comportamento |
| --- | --- |
| Acima de 900 px | Grade de produtos em quatro colunas. Produto, sacola e checkout distribuem suas áreas principais lado a lado. |
| Até 1200 px | O cabeçalho compacta a navegação e as ações. Outros ajustes de espaçamento entram nas faixas menores. |
| Até 900 px | Grade de produtos em duas colunas. Categorias, produto, sacola e checkout passam a uma coluna. |
| Até 600 px | Margens e intervalos menores, filtros empilhados, Lifestyle e rodapé em uma coluna. |
| Até 760 px ou até 1024 px com ponteiro grosseiro | Navegação de categorias pelo menu fullscreen. O acionador do menu também existe no desktop. |

Componentes com espaço próprio podem responder à largura do container. Miniaturas da galeria e controles de frete têm regras desse tipo. A sacola lateral e o menu também tratam altura reduzida em paisagem. Consulte os estilos de cada cena para adaptações específicas. [Estilos da loja](../src/styles/app.css) · [Menu fullscreen](../src/styles/fullscreen-menu.css) · [Tokens](../src/design-system/tokens.css)

## Componentes, variantes e estados

| Necessidade | Padrão em uso |
| --- | --- |
| Ações e navegação | `Button` para executar e `ActionLink` para navegar. Variantes `primary`, `secondary`, `text` e `plain`. [Action.jsx](../src/design-system/Action.jsx) |
| Escolhas e favoritos | `ChoiceButton` expõe seleção para filtros, tamanhos e galeria. `FavoriteButton` mantém o nome e expõe o estado pressionado. [ChoiceButton.jsx](../src/design-system/ChoiceButton.jsx) · [FavoriteButton.jsx](../src/components/FavoriteButton.jsx) |
| Campos | `InputField` e `SelectField` associam rótulos nativos. `InputField` integra erro e descrição. O simulador de frete usa um campo dedicado com indicação do erro. [Field.jsx](../src/design-system/Field.jsx) · [ShippingCalculator.jsx](../src/components/ShippingCalculator.jsx) |
| Feedback e espera | `Feedback` oferece informação, aviso, erro (`alert`) e sucesso (`status`). `LoadingStatus` sinaliza carregamento. `EmptyState` contextualiza a ausência de resultados e pode oferecer uma saída. [Feedback.jsx](../src/design-system/Feedback.jsx) · [LoadingStatus.jsx](../src/design-system/LoadingStatus.jsx) · [EmptyState.jsx](../src/components/EmptyState.jsx) |
| Diálogos | `Dialog` usa o elemento nativo e delega a abertura, o fechamento e a gestão do foco aos chamadores. [Dialog.jsx](../src/design-system/Dialog.jsx) · [Menu](../src/components/CategoryNavigation.jsx) · [Sacola lateral](../src/components/CartDrawer.jsx) · [Galeria](../src/components/ProductGallery.jsx) |
| Cards e seleção comercial | `EditorialCard` para conteúdo editorial. `ProductCard` para produto, com navegação e favorito independentes. `QuantitySelector` agrupa controles de quantidade. `SizeTable` mantém cabeçalhos nativos de tabela. [EditorialCard.jsx](../src/components/EditorialCard.jsx) · [ProductCard.jsx](../src/components/ProductCard.jsx) · [QuantitySelector.jsx](../src/components/QuantitySelector.jsx) · [SizeTable.jsx](../src/components/SizeTable.jsx) |

Diferencie foco, pressionamento momentâneo e seleção persistente. Use `disabled` em controles nativos indisponíveis e explique o motivo junto à ação quando necessário. Trate confirmação e erro com texto associado ao controle ou à região adequada. Preserve o comportamento dos controles em telas sem hover.

## Revisão e manutenção

- Ao mudar um papel visual compartilhado, verifique os usos existentes antes de ajustar o token. Ajustes de uma seção ficam no componente ou estilo responsável por ela.
- Confira Tab e Shift+Tab, o atalho para o conteúdo, o foco visível sobre a fotografia, o fechamento de diálogos e o retorno do foco. O `Layout` foca o conteúdo ao mudar o caminho e mantém o foco local em ajustes de consulta do catálogo. [Layout.jsx](../src/components/Layout.jsx)
- Confira controles e legibilidade em retrato, paisagem e fonte ampliada. O token de alvo mínimo reserva 44 px para controles que o usam. Verifique as variantes em espaço reduzido e nas áreas seguras antes de alterar o espaçamento. [Módulo 08](NOVA-DESIGN-SYSTEM-MODULO-08.md)
- Preserve conteúdo e controles com `prefers-reduced-motion` e na ausência de uma API de animação. As regras globais desativam animações e a rolagem suave para a preferência reduzida. As cenas com efeitos próprios mantêm seus respectivos fallbacks. [Movimento base](../src/design-system/motion.css) · [Sistemas cinematográficos](MOTION.md)
- Compare as telas afetadas antes e depois com os mesmos dados e dimensões. Anote diferenças esperadas e as verificações pendentes. Use WCAG 2.2 AA como referência e complemente as checagens automáticas com avaliação manual. [Módulo 08](NOVA-DESIGN-SYSTEM-MODULO-08.md)

## Relatórios dos módulos

| Módulo | Registro |
| --- | --- |
| 01 | [Identidade visual e cores](NOVA-DESIGN-SYSTEM-MODULO-01.md) |
| 02 | [Tipografia](NOVA-DESIGN-SYSTEM-MODULO-02.md) |
| 03 | [Espaçamento e geometria](NOVA-DESIGN-SYSTEM-MODULO-03.md) |
| 04 | [Hierarquia visual e composição](NOVA-DESIGN-SYSTEM-MODULO-04.md) |
| 05 | [Componentes e variantes](NOVA-DESIGN-SYSTEM-MODULO-05.md) |
| 06 | [Estados e comportamento](NOVA-DESIGN-SYSTEM-MODULO-06.md) |
| 07 | [Animações e movimento](NOVA-DESIGN-SYSTEM-MODULO-07.md) |
| 08 | [Responsividade e acessibilidade](NOVA-DESIGN-SYSTEM-MODULO-08.md) |
| 09 | [Experiência comercial](NOVA-DESIGN-SYSTEM-MODULO-09.md) |
| 10 | [Arquitetura e engenharia](NOVA-DESIGN-SYSTEM-MODULO-10.md) |
| 11 | Governança consolidada neste guia, no [guia de contribuição](../CONTRIBUTING.md) e na [auditoria documental](NOVA-DESIGN-SYSTEM-MODULO-11.md). |
