# NØVA Motion Showcase 2.0 · Etapa 02.1

> Registro da revisão original. Categorias, Novidades e Lifestyle passaram a usar [Editorial Reveal](NOVA-HOME-EDITORIAL-REVEAL.md). Consulte o [guia atual](MOTION.md) para a divisão de responsabilidades.

Revisão da rolagem da Home a partir de `5ad1ec4`, integração do [PR #10](https://github.com/rick-dev-rick/nova-street/pull/10). O diagnóstico partiu do código da Home, das regras do Hero 2.0 e do Scroll Showcase, além da comparação dos dois builds em Chromium.

## Coreografia

| Cena | PR #10 | Etapa 02.1 |
| --- | --- | --- |
| Saída do Hero 2.0 | Aproximação de 14% e filete diagonal | Aproximação de até 29% no plano externo da fotografia, com mudança de enquadramento. O corte da faixa de frete alinha-se com a seção seguinte. A abertura do Hero, incluindo sua cortina, continua na própria camada. |
| EXPLORE | Escala de entrada e cortinas diagonais nos cards | A manchete parte de 64% do tamanho final, entra inclinada e se alinha ao texto editorial. As fatias diagonais atravessam as fotos em sequência e alternam a direção nos cards pares em mobile. |
| NOVIDADES | Máscara clara sobre cada imagem | Uma cortina vertical com faixa vermelha coordena-se com o recuo da fotografia, que parte de 137%. Em mobile, os dois produtos de cada fileira abrem em tempos diferentes. |
| NO RULES. JUST STREET. | Duas linhas entram numa seção que acompanha o fluxo | Palco com fixação nativa. As duas linhas passam por máscaras em sentidos opostos, têm durações próprias e crescem de 66% a 100%. Um recorte fotográfico se desloca dentro de um plano que também muda de escala. |
| BEST SELLERS | A grade é aberta por máscaras em diagonal | Um registro vermelho cresce da direita no cabeçalho. As fotos são descobertas por faixas inclinadas que recuam na vertical e na horizontal, com direção alternada em mobile. |
| NØVA LIFESTYLE | Máscaras e aproximação curta | As fotos cruzam o quadro com escala de 134% no desktop e 126% no mobile. A abertura oblíqua e a alternância da câmera entre fotos verticais dão profundidades distintas à sequência. |
| Continuidade final | Filete na entrada do encerramento | Uma faixa com sete vezes a altura final se comprime até a linha do corte, entre a última fotografia e a chamada final já existente. |

## Implementação

- A rolagem controla o progresso de propriedades `transform` em CSS. A navegação continua nativa, com roda, toque e teclado. Cada efeito é reversível e não altera a posição dos links no fluxo.
- A seção central tem pelo menos `174svh` em telas com altura a partir de 520 px. `position: sticky` mantém a composição no lugar enquanto há espaço na seção e a solta naturalmente na saída. Em larguras de até 900 px, o deslocamento de 112 px deixa espaço para o cabeçalho fixo.
- Em mobile, o título e o CTA ficam empilhados. A foto ocupa uma área maior do enquadramento, com proteção de contraste distinta. Os cortes laterais e os movimentos de câmera mudam de direção para acompanhar a disposição dos cards.
- O CSS estático apresenta as seções no fluxo normal com a composição já legível. As regras de movimento dependem de `prefers-reduced-motion: no-preference` e da consulta de suporte a View Timelines. O foco por teclado remove as cortinas dos cards e encerra o deslocamento das manchetes correspondentes. Fotos e máscaras decorativas ficam fora da árvore de acessibilidade.
- A foto central usa exatamente a URL já requisitada pela Home. O efeito não inclui novas bibliotecas, arquivos de mídia, listeners de scroll, atualização React por quadro ou animações de hover.

## Evidências e testes

- `npm test` passou com 61 testes, incluindo os de contraste do Design System e a regressão da marcação semântica e da fixação editorial. `npm run build`, `GITHUB_PAGES=true npm run build` e `git diff --check` passaram.
- Chromium 153 em 320×568, 390×844, 600×850, 761×900, 1024×850 e 1440×900. Em cada viewport, as sete cenas avançaram e regrediram com a rolagem, sem overflow horizontal. O Hero manteve sua animação de abertura. O palco conservou a posição durante o trecho fixo, a fotografia continuou avançando e ambos acompanharam a rolagem na saída.
- O modo com movimento reduzido, a simulação sem suporte às timelines, uma viewport de 390×500 e o cenário de imagens indisponíveis mantiveram o conteúdo acessível. O texto a 200% não criou overflow horizontal nos tamanhos testados. As duas linhas da manchete permaneceram dentro da máscara estática em 320×568, 390×844 e 1440×900.
- Validação por teclado e comercial nas seis larguras. A sequência percorreu categoria, catálogo, página de produto, galeria fechada com Escape, favoritos, tamanho, sacola, cálculo de frete e confirmação do checkout demonstrativo.
- Amostra de contraste contra a fotografia durante a fixação em 320×568, 390×844 e 1440×900. Os mínimos foram 6,39:1 no identificador de campanha, 14,55:1 na linha branca, 6,74:1 na linha vermelha e 9,68:1 no texto auxiliar. A amostra cobriu os retângulos dos textos em uma posição da rolagem por viewport.
- O vídeo está na entrega da revisão. Os builds foram capturados lado a lado no Chromium, com cenas sincronizadas pela posição na página. A gravação percorre do Hero ao rodapé em desktop e mobile. As imagens originais foram servidas de forma controlada para manter a comparação consistente.

## Desempenho e limites

O CSS principal do build para GitHub Pages passou de 10,14 kB para 10,88 kB gzip, cerca de 0,74 kB a mais. O movimento atualiza principalmente transformações em camadas recortadas. O filtro monocromático é fixo. A fotografia central usa o mesmo endereço e a mesma resolução usados anteriormente na Home e preserva o fundo escuro quando indisponível.

A gravação é uma comparação visual, sem medição de FPS, consumo de bateria ou comportamento de rede. A matriz de testes usou Chromium com viewports emulados. Safari, Firefox e aparelhos físicos permanecem sem validação direta. Os efeitos sem suporte foram verificados no Chromium desativando o bloco CSS correspondente. Como a Home é montada em React, a disponibilidade com JavaScript totalmente desativado depende da renderização da aplicação.

Os arquivos de implementação são `src/pages/Home.jsx` e `src/styles/scroll-showcase.css`, com regressão em `tests/scroll-showcase.test.js`.
