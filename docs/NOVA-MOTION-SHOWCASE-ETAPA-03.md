# NØVA Motion Showcase 2.0 · Etapa 03 · Premium Product Cards

Base `46cb102`. O novo tratamento é aplicado ao `ProductCard` compartilhado em Novidades, Mais Vendidos, catálogo, favoritos e relacionados.

| Estado | O que acontece |
| --- | --- |
| Repouso | Moldura discreta, categoria em caixa alta, nome e preço no fluxo. Favoritos e selos ficam visíveis desde a entrada. |
| Mouse | A fotografia se aproxima em 15% no catálogo e em 10% na Home, com leve reenquadramento. Um acento vermelho percorre a divisão da foto com a ficha e a seta do próprio link ganha presença. A saída reverte o movimento. |
| Teclado | Os links de foto e nome recebem o mesmo tratamento editorial com foco visível. Favoritos mantêm foco próprio e estado anunciado por `aria-pressed`. |
| Toque | Uma aproximação curta de 5,5% e a sinalização do link acompanham a pressão. Encerrar ou cancelar o gesto limpa o feedback. Um toque abre a página do produto. |
| Favoritos | O botão continua independente do link de produto. O ícone preenchido e o contorno de seleção acompanham o estado salvo. |
| Movimento reduzido | Setas, contorno e informações ficam disponíveis nas mudanças de estado, com transformações e transições desligadas. |

## Composição e desempenho

A fotografia permanece no elemento que recebe a coreografia de entrada da Home. O zoom de interação é aplicado a uma moldura interna separada da área clicável. O zoom menor na Home reserva espaço para o recorte da animação de rolagem. Os acentos ficam em elementos decorativos, com `pointer-events: none`. O recorte da mídia, as dimensões da grade, os links, os dados, a nota demonstrativa e os controles comerciais permanecem presentes em todos os estados.

O feedback de ponteiro alterna um atributo no próprio link e o limpa em `pointerup`, `pointercancel` ou perda de captura. O navegador mantém o comportamento de rolagem, toque e abertura do link. As transições são CSS, com transformação e opacidade, sem loop de JavaScript ou filtros adicionados. A moldura fotográfica tem `transform: none` em repouso.

No build GitHub Pages, o CSS principal foi de 12,87 para 13,50 kB gzip. O script principal foi de 77,14 para 77,26 kB gzip. Duas entradas e saídas consecutivas do mouse no Chromium produziram quatro eventos `Layout` tanto em 1024×850 quanto em 1440×900, com o retângulo do card idêntico antes e depois. Essa amostra mede trabalho de layout no sistema de teste. A taxa de quadros em aparelho físico continua sem medição.

## Verificação

- `npm test` com 68 testes, builds padrão e GitHub Pages e `git diff --check`.
- Chromium 153 e WebKit 26.5 em 320×568, 390×844, 844×390, 1024×850 e 1440×900. Verificados hover e saída, foco e abertura por teclado, toque simples, texto a 200%, ausência de overflow e movimento reduzido.
- Nas duas grades da Home, a reversão reproduziu as mesmas transformações da fotografia. No desktop, o hover ampliou a moldura sem alterar a matriz da fotografia durante a entrada por rolagem.
- No Chromium emulado, o feedback apareceu enquanto o toque estava pressionado. Arrastar limpou o estado e manteve a página. Um toque posterior abriu o produto.
- Em desktop e mobile nos dois motores, foram verificados favoritos, página do produto com cards relacionados, tamanho, sacola, frete e confirmação do checkout demonstrativo.
- O vídeo compara o catálogo anterior e o novo com mouse e teclado no desktop e com favoritos, pressão e abertura em um toque no mobile. As imagens foram servidas de forma controlada em Chromium. A validação do Safari num iPhone físico ainda está pendente.
