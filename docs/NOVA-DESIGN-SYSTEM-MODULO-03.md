# NØVA Design System — Módulo 03

A auditoria partiu de `4da3e8f`, com o módulo 02 integrado à `main`. A escala de espaços já existia, mas margens, paddings, gaps e bordas ainda repetiam valores em pixels. Os ajustes para 600 px apareciam em vários pontos do CSS.

## Espaçamento, grids e breakpoints

- A escala `--nova-space-*` tem base de 4 px. O número representa quantas unidades de 4 px são usadas. Por exemplo, `--nova-space-4` vale 16 px e `--nova-space-3-5` vale 14 px. Os passos intermediários atendem áreas densas, como rótulos e controles. Algumas medidas próximas foram normalizadas, como o gap do checkout de 42 para 40 px.
- O container tem largura máxima de **1180 px** e margens laterais mínimas de **20 px**, ou **14 px** no mobile. Seções usam **88 px** de espaço vertical em telas maiores e **64 px** no mobile. O drop e a chamada final usam o papel de espaçamento de campanha.
- Os grids principais compartilham a declaração de CSS Grid. Cada variante configura suas colunas e pode ajustar o gap padrão de 16 px. Cada grid começa com seu próprio gap, inclusive o formulário aninhado no checkout. Nas colunas flexíveis, `minmax(0, 1fr)` deixa a coluna encolher mesmo com conteúdo longo.
- Os limites de largura estão reunidos no fim de `app.css`, em ordem decrescente. As media queries mantêm as medidas explícitas porque variáveis CSS comuns não podem ser usadas em suas condições.

| Condição | Geometria |
| --- | --- |
| Acima de 1200 px | Cabeçalho com rótulo de favoritos e layout amplo |
| 901–1200 px | Cabeçalho compacto. Produtos em quatro colunas |
| Até 900 px | Produtos em duas colunas. Categoria, produto, sacola e checkout empilham suas áreas principais. A barra de filtros do catálogo ocupa a largura disponível |
| Até 600 px | Margens de 14 px, gap de 12 px entre produtos, Lifestyle em uma coluna e campos do checkout empilhados |
| Altura até 600 px | A sacola lateral rola como um painel em janelas baixas |

## Controles, superfícies e imagens

- Controles interativos reutilizam alturas mínimas de **44 px**, **46 px** para campos de formulário e **48 px** para ações principais. Bordas de 1, 2 e 4 px identificam o limite padrão, a seleção destacada e a faixa de feedback.
- Botões, campos e painéis usam o raio zero da identidade NØVA. Os contadores e o coração sobre a foto usam raio de pílula. As sombras diferenciam controles sobre fotografia de painéis sobrepostos, como a galeria e a sacola.
- Fotos de produto, galeria e sacola usam **4:5**. Cards editoriais usam **3:4** nas telas maiores e **4:3** no mobile. A imagem mantém o preenchimento definido no componente.

## Verificação

- `npm test` executa 44 testes. Três verificam a escala de espaços, os breakpoints e a aplicação dos tokens de geometria.
- `npm run build` e `GITHUB_PAGES=true npm run build` compilam a loja.
- Chromium verificou a largura do container, colunas, gaps, proporções, bordas e sombra em **320, 390, 600, 601, 900, 901, 1200, 1201 e 1440 px**. A jornada cobriu favoritos, galeria, sacola, cálculo de frete e checkout demonstrativo.
- Com fonte-base ampliada para 200%, Home, Catálogo, Produto, Favoritos, Sacola e Checkout ficaram sem rolagem horizontal da página nas janelas testadas. Em **320 × 568**, foi possível rolar a sacola até o último link.
- `git diff --check` verificou a formatação do diff.

Safari, Firefox e dispositivos físicos permanecem sem validação neste módulo. O módulo 04 aguarda autorização.
