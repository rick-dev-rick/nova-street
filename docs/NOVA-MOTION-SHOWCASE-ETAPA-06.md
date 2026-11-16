# NØVA Motion Showcase 2.0 — Etapa 06

## Posição na Home

A faixa entra entre NØVA Lifestyle e a chamada “Encontre seu estilo. Vista NØVA.”. A fotografia de Lifestyle cede o palco para a tipografia, que prepara a chamada final. A declaração aparece afastada da cena que já usa “NO RULES. JUST STREET.” e mantém juntas a passagem vermelha e a grade de Mais Vendidos.

A auditoria da base `d5dadb8` encontrou dois mecanismos de rolagem da Home, com View Timelines em CSS e um controlador para cenas móveis selecionadas. A faixa tem uma timeline própria, vinculada ao bloco que permanece no fluxo. O controlador existente e as transformações das cenas, dos cards e da assinatura conservam seus seletores e comportamento.

## Direção de arte e implementação

| Plano | Composição |
| --- | --- |
| NO RULES. JUST STREET. | Duas linhas em branco, alinhadas a margens opostas. A manchete percorre o quadro para a direita. |
| NØVA STREET | Contorno cinza no plano superior com movimento para a esquerda e ritmo diferente da manchete. Navegadores sem suporte ao contorno mostram o texto sólido. |
| MOVE DIFFERENT. | Frase em vermelho claro com um traço diagonal. Fica ancorada enquanto os dois planos se deslocam. |

No desktop, o percurso total chega a 192 px na manchete e 224 px no contorno. No retrato móvel, a manchete ocupa mais da largura útil e os planos têm faixas de progresso diferentes. A 390 px, o percurso total é de aproximadamente 47 px e 56 px, respectivamente. Em paisagem compacta, a faixa tem menos respiro vertical para caber no enquadramento.

As duas animações usam apenas `transform`, com progresso contínuo entre entrada e saída da seção. Ao voltar a rolagem, a composição percorre os mesmos estados em sentido inverso. A faixa tem altura intrínseca, recorte local e nenhuma repetição automática. A decoração é CSS e reaproveita Inter e os tokens da marca.

## Acessibilidade e compatibilidade

Com movimento reduzido, a faixa fica em repouso, com as três frases visíveis. A mesma composição funciona em navegadores que rejeitam o bloco de CSS de View Timelines. Cada frase tem uma única representação acessível na faixa. A seção usa título, parágrafos e texto selecionável. Seus elementos ficam fora da ordem de Tab, pois a faixa contém texto editorial sem ações.

Em Chromium e WebKit, a avaliação cobriu 320 × 568, 390 × 844, 844 × 390 e 1440 × 900. Foram inspecionados o movimento em direções opostas, a reversão nas mesmas posições, os limites dos textos, a ausência de overflow horizontal, o acento em uma linha, texto ampliado a 200%, movimento reduzido, teclado até a chamada final e o fallback com imagens remotas indisponíveis. O Chromium também recebeu gestos de toque sintéticos lentos, rápidos e reversos. A comparação em vídeo usa builds de produção e enquadra a passagem de Lifestyle à chamada final, em ambas as direções.

A validação de WebKit usa o motor distribuído pelo Playwright no Linux. A barra dinâmica, a inércia física do toque e a composição no Safari de um iPhone ainda precisam de verificação no aparelho.

O contraste calculado contra o ponto mais claro do fundo da faixa é 17,58:1 para a manchete, 4,76:1 para a cor do contorno e 8,04:1 para o acento vermelho.

## Testes e desempenho

- `npm test` — 75 testes.
- `npm run build` e `GITHUB_PAGES=true npm run build` — builds padrão e para GitHub Pages.
- O build do GitHub Pages passou de 15,67 para 16,30 kB de CSS principal em gzip e de 78,59 para 78,70 kB de JS principal em gzip. As fontes e imagens do build têm o mesmo tamanho. A faixa acrescenta somente a marcação React e os estilos. Sua animação prescinde de eventos de scroll, leituras de layout por quadro e scripts de animação.

- O teste no navegador passou pelo catálogo, cards de Novidades e Mais Vendidos, relacionados, favoritos, histórico, sacola e confirmação demonstrativa do checkout em ambos os motores nas versões desktop e mobile.

No Chromium headless, medi três passagens por versão e viewport. O mesmo roteiro deslocou 700 px a partir do fim de Lifestyle e voltou ao ponto inicial em 1,1 s. Registrei intervalos de `requestAnimationFrame` e a diferença de `LayoutDuration` pelo CDP após o carregamento inicial.

| Viewport | P95 antes → depois | Intervalos acima de 25 ms | Layout durante a janela |
| --- | --- | --- | --- |
| 1440 × 900 | 16,8 → 16,8 ms | 1 → 0 | 0 → 0 ms |
| 390 × 844 | 16,8 → 16,7 ms | 0 → 0 | 0 → 0 ms |

Os valores são medianas das três passagens. O roteiro usa a mesma distância, com cenas visíveis diferentes devido à presença da faixa. Essa amostra indica estabilidade no ambiente de teste. O custo de rasterização e a cadência no Safari do iPhone permanecem sem medição.
