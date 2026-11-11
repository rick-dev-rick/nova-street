# NØVA Design System — Módulo 02

A auditoria partiu de `850dd18`, com o módulo 01 integrado à `main`. A Inter aparecia na lista de famílias, mas o projeto dependia das fontes instaladas no dispositivo. Os tamanhos, pesos e espaçamentos estavam dispersos no CSS. Os cards do catálogo e dos favoritos apareciam como H3 logo abaixo do H1.

## Família e escala

A Inter Variable é servida pelo próprio build em um arquivo WOFF2 de 48,25 kB. O subconjunto latino cobre o texto em português e inglês usado na loja, incluindo o Ø. A pilha de fontes do sistema exibe texto durante o carregamento com `font-display: swap` e cobre glifos ausentes. A licença OFL acompanha o build.

| Uso | Tamanho | Entrelinha |
| --- | --- | --- |
| Hero | Fluido de 2,5 a 7,5 rem | 0,98 |
| Título de campanha | Fluido de 2,5 a 6,8 rem | 0,98 |
| H1 | Fluido de 2,25 a 5 rem | 1,12 |
| H2 | Fluido de 1,75 a 4 rem | 1,12 |
| H3 | Fluido de 1,125 a 1,5 rem | 1,12 |
| H4, H5 e H6 | 1,125, 1 e 0,875 rem | 1,12 |
| Corpo e campos | 1 rem | 1,6 |
| Texto secundário, rótulos e legendas | 0,875, 0,8125 e 0,75 rem | 1,6 por padrão |
| Preço do produto | 1,5 rem | 1,3 |

Os pesos usados são 400, 600, 700, 800 e 900. Títulos editoriais usam peso 900 e letras mais próximas. Botões e marcadores usam espaçamento próprio. O `clamp()` limita o crescimento dos títulos entre valores em `rem`, com uma combinação de `rem` e `vw` no meio.

## Aplicação

- Use H1 para o título da página e H2 para seções ou resultados diretamente abaixo dele. Os cards do catálogo e dos favoritos usam H2. Os cards dentro de uma seção H2, como os relacionados, usam H3. `ProductCard` usa H3 por padrão e aceita `headingLevel={2}`. As regras base incluem H4 a H6 para subseções quando a estrutura exigir.
- Use `.price` para valores monetários em cards, produto, sacola e resumo do pedido. Os dígitos tabulares têm a mesma largura, o que melhora a leitura de quantidades e totais lado a lado. A formatação em reais continua em `pt-BR`.
- Textos editoriais e de estados vazios têm limite de 50 caracteres tipográficos aproximados. Descrições e notas usam até 65. Títulos podem quebrar quando uma palavra excede a largura disponível. As legendas do Lifestyle participam da altura dos cards, permitindo mais linhas em telas estreitas. Os selos dos produtos ficam na base da foto e podem quebrar em mais linhas, deixando o coração livre.
- Os valores ficam em `src/design-system/tokens.css`. As regras compartilhadas ficam em `src/design-system/typography.css`. Use os papéis existentes em novos componentes.

## Verificação

- `npm test` executa 41 testes, incluindo dois novos para a escala tipográfica, os seis níveis de título, a fonte local e as regras de preços e quebra.
- `npm run build` e `GITHUB_PAGES=true npm run build` compilam a loja, incluindo a fonte e sua licença.
- O build do GitHub Pages foi servido com `GITHUB_PAGES=true npm run preview` e exercitado no Chromium em 320, 390, 601, 900, 1024 e 1440 px. O navegador carregou a Inter com HTTP 200. Foram verificados hierarquia, campos, preços, contraste de legendas com fundo branco, foco, galeria, favoritos, sacola, frete e checkout demonstrativo.
- Em sete tamanhos de janela, ampliar a fonte-base para 200% permitiu testar Home, Catálogo, Produto, Favoritos, Sacola e Checkout sem rolagem horizontal da página. A janela adicional de 320 × 568 confirmou a marca em uma linha, os selos sem sobreposição e a rolagem da sacola até o último link.
- `git diff --check` verificou a formatação do diff.

A validação em navegador cobre Chromium. Safari, Firefox e leitores de tela permanecem sem verificação neste módulo. A implementação do módulo 03 aguarda autorização.
