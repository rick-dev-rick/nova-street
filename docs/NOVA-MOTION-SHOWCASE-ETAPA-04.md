# NØVA Motion Showcase 2.0 · Etapa 04 · Cinematic Fullscreen Menu

Base `bf6b169`, integração dos Premium Product Cards. O menu mobile anterior expandia as categorias dentro do cabeçalho. A versão desktop tinha atalhos em linha. Na amostra Chromium em 390×844, o cabeçalho antigo tinha 101 px fechado e 153 px aberto. Na versão fullscreen, ele mede 101 px nos dois estados.

## Direção visual

- O painel escuro assume a viewport. Uma cortina vermelha recua em 280 ms. Os nomes numerados sobem pelas próprias máscaras com intervalos de 26 ms. O último nome termina a entrada em aproximadamente 459 ms.
- Categorias usam relevo tipográfico, registro vermelho e deslocamento em hover e foco. Pressão por toque também aplica o destaque, mantendo a navegação nativa. Os números são decorativos e ficam fora dos nomes acessíveis.
- O comando Fechar e Escape acionam uma cortina complementar de 165 ms. A seleção de destino encerra o diálogo imediatamente e segue o link. A ação Sacola abre o drawer já existente.
- O botão Menu também está disponível no desktop, junto dos atalhos em linha. No mobile e em paisagem de toque, o Menu concentra as categorias. Início, Favoritos e Sacola ficam acessíveis dentro do painel.

## Acessibilidade e desempenho

`showModal()` coloca o painel na camada superior e torna o conteúdo de fundo inerte. O foco começa em Fechar e circula entre o primeiro e o último controle. No fechamento, volta ao acionador. Durante a saída, o conteúdo do painel deixa de receber foco. O bloqueio de rolagem vale enquanto o diálogo está aberto, e o painel tem rolagem própria, altura `100dvh` e margens que consideram as áreas seguras. Em movimento reduzido, abre e fecha sem transição.

A saída usa uma cortina opaca para evitar mostrar a Home enquanto seu scroll está bloqueado. Em Chromium, abrir, tentar rolar e fechar durante a passagem NO RULES → BEST SELLERS conservou a posição da página e restaurou a mesma matriz da foto. O mecanismo não depende de `overlay` ou de transições discretas do diálogo, indisponíveis no WebKit testado.

As transições usam transformações CSS e o painel não carrega fotos ou dependências. O build GitHub Pages passou de 14,14 para 15,19 kB de CSS principal em gzip e de 77,32 para 77,82 kB de JS principal. A medição reporta pacote e geometria em emulação. FPS, notch e comportamento da barra de endereço do Safari ainda precisam de conferência em iPhone físico.

## Validação

- 72 testes com `npm test`, builds padrão e GitHub Pages, e `git diff --check`.
- Chromium 153 e WebKit 26.5 em 320×568, 390×844, 430×932, 844×390, 932×430, 1024×850 e 1440×900. Conferidos foco, Tab e Shift+Tab, Escape, reabertura, toque, bloqueio do fundo, ampliação a 200%, rotação simulada e ausência de overflow horizontal.
- Validados os destinos de categoria, início, favoritos e sacola, inclusive seleção durante a abertura e movimento reduzido. A navegação da Home foi conferida com o menu fechado e na volta da passagem cinematográfica.
- O vídeo utiliza tamanhos desktop e mobile emulados. No desktop anterior, o equivalente mostrado é a navegação em linha.
