# NØVA Motion Showcase 2.0 · Etapa 02.2 · Redesign cinematográfico

A sequência substitui a composição entre NO RULES. JUST STREET. e BEST SELLERS na Home. A referência do vídeo é a `main` em `900d8d4`. O PR incorpora os commits dos PRs [#12](https://github.com/rick-dev-rick/nova-street/pull/12) e [#13](https://github.com/rick-dev-rick/nova-street/pull/13), que corrigiram os problemas mobile registrados no [diagnóstico do iPhone](NOVA-MOTION-SHOWCASE-ETAPA-02-2-IPHONE.md).

## Direção visual

| Ato | Desktop | Mobile |
| --- | --- | --- |
| **NO RULES. JUST STREET.** | O retrato monocromático ocupa a direita e recua em profundidade. NO RULES. estabiliza primeiro, enquanto JUST STREET. sobe e termina em seu próprio ritmo. | O rosto abre a cena no topo. As linhas entram sobre a parte escura da fotografia e os controles ficam abaixo. Em paisagem, o retrato volta para a lateral para resguardar o espaço vertical. |
| **Passagem de câmera** | O retrato reaparece como um quadro recortado sobre um plano vermelho. O quadro diminui e se desloca à direita, enquanto o vermelho passa por trás dele. Uma diagonal branca introduz o plano de BEST SELLERS. | O quadro começa na lateral direita e recua para dentro da área central. O painel é mais curto e a rotação é menor, com margem para o retrato ficar dentro do vermelho. |
| **MAIS VENDIDOS.** | O título se abre sobre o fundo branco. A grade ganha profundidade com deslocamentos alternados e defasagem entre as colunas. | As fotos aproximadas assentam em pares, com o segundo card de cada par em ritmo distinto. Preço, nome, favoritos e área de acionamento seguem a grade normal. |

A sessão de revisão visual mostrou que a moldura inicial chegava perto demais da diagonal branca em retrato. A revisão escureceu os planos vermelhos, reduziu a rotação e ajustou a altura e as margens da moldura. A comparação final mostra a ida e a volta em desktop e mobile, com as versões alinhadas aproximadamente pelas seções.

## Implementação

- A seção do drop tem altura dada pelo conteúdo. O retrato e o plano vermelho participam da composição sem gerar uma reserva de altura para fixação. Apenas as áreas com fotografia e detalhes decorativos recortam o que ultrapassa seus próprios limites.
- O controlador existente da Home reutiliza as posições medidas e aplica progresso reversível aos três atos no desktop e no mobile. As faixas de progresso variam pelo enquadramento. O listener passivo agenda uma atualização por quadro e escreve as variáveis CSS quando o valor muda. Ao focar o CTA do drop, o link de BEST SELLERS ou um card, a transformação correspondente se estabiliza.
- Preferência por movimento reduzido e indisponibilidade de `ResizeObserver` mantêm a composição estática e utilizável. A fotografia é reutilizada da campanha existente. O Hero 2.0, as outras seções e as rotas comerciais preservam seus comportamentos.
- O build GitHub Pages usa 11,88 kB de CSS principal e 76,81 kB de JS principal, em gzip. A referência em `main` usava 10,88 kB e 75,80 kB. A implementação reaproveita as dependências e as fotos existentes.

## Verificação

- `npm test` com 63 testes. Builds padrão e GitHub Pages e `git diff --check` concluídos.
- Chromium 153 e WebKit 26.5 em seis viewports mobile (320×568, 375×667, 390×844, 430×932, 844×390 e 932×430) e duas desktop (1024×850 e 1440×900). Repetir uma posição nos dois sentidos devolveu os mesmos estados de cada ato. Verificados texto a 200%, ausência de overflow horizontal, foco, movimento reduzido, imagens indisponíveis e fallback sem `ResizeObserver`.
- Toque emulado no Chromium com gestos lentos, rápidos e reversos e redução isolada da viewport visual. Jornada comercial a 390×844 e 1440×900, incluindo favoritos, página do produto, sacola e confirmação do checkout demonstrativo.
- Contraste do Ato 1 amostrado em 320×568, 390×844 e 1440×900. Os menores valores na amostra foram 5,95:1 para o identificador, 16,67:1 para a primeira linha, 6,96:1 para a segunda linha e 13,02:1 para o texto auxiliar. A amostra comparou os pixels do texto com o fundo correspondente em uma posição de rolagem por viewport.
- O vídeo comparativo usa os builds em desktop de 1440×900 e mobile de 390×844, com as imagens da campanha servidas de forma controlada. O capítulo mobile começa por volta de 0:14.

A aprovação no iPhone físico segue pendente. A verificação usou motores em Linux, com dimensões e toque emulados, e o vídeo compara a composição sem medir FPS. A barra dinâmica e a inércia do Safari móvel precisam de conferência no aparelho.
