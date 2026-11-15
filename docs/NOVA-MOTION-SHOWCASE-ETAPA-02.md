# NØVA Motion Showcase 2.0 — Etapa 02

A base é a `main` em `2925af7`, que integrou o PR #9. A auditoria confirmou que a entrada do hero anima `.hero-photo`, dentro de `.hero-shot`. A saída desta etapa atua no elemento externo e permite que os dois movimentos coexistam. O PR #8 usava uma subida com fade genérico no drop e no CTA final. A implementação aproveitou a técnica de progresso pela rolagem e partiu do PR #9 integrado.

## As sete cenas

| Cena | Movimento aplicado |
| --- | --- |
| 01 · Saída do hero | A camada externa do retrato amplia até 14% e se desloca até 3% na saída. A faixa de frete recebe um corte vermelho que se estende na direção da primeira seção |
| 02 · Explore | O título cresce de 78% ao tamanho final enquanto sobe até 28 px. Um corte diagonal escuro e vermelho recua sobre cada foto |
| 03 · Novidades | Uma máscara clara se recolhe para baixo na área fotográfica, mantendo nome, preço e controles fora da animação |
| 04 · No Rules. Just Street. | As duas linhas ganham distâncias e ritmos diferentes. A segunda fica vermelha e o campo vermelho diagonal chega por trás da tipografia |
| 05 · Best Sellers | Uma régua fina se estende sob o título e um corte escuro inclinado sobe pela fotografia, invertendo a direção e a paleta de Novidades |
| 06 · Lifestyle | Máscaras laterais liberam as fotos. Cada imagem percorre um eixo vertical dentro do próprio quadro, com escala de 1,18 em telas maiores e 1,09 até 600 px |
| 07 · Continuidade | Uma linha vermelha cruza a emenda entre Lifestyle e a chamada final, que mantém a composição do PR #9 |

Em desktop amplo, máscaras da mesma linha entram em momentos diferentes. No mobile, o ritmo acompanha a posição das linhas no viewport. Os elementos que medem a rolagem ficam estáveis. Os deslocamentos são aplicados aos seus filhos ou pseudoelementos. Voltar na rolagem devolve as cenas ao progresso correspondente.

## Implementação e acessibilidade

- As sete cenas usam CSS scroll-driven animations com `view-timeline-name`, `animation-timeline` e `animation-range`. A tarefa adiciona aproximadamente **1,19 kB gzip** de CSS em relação ao build da etapa 01. Os efeitos usam principalmente `transform`, com máscaras geométricas fixas. Nenhuma dependência foi adicionada.
- Textos, preços e botões conservam sua opacidade. As máscaras fotográficas são decorativas, deixam parte da imagem visível e aceitam cliques através delas. O foco por teclado retira a máscara do card focado. Ao entrar pelo teclado em Explore ou Drop, os títulos ficam na posição final.
- Movimento reduzido e a falta de suporte às timelines mantêm a composição estática. A rolagem depende de CSS. A renderização inicial da loja continua dependendo do bundle React, como na etapa 01.

## Validação

- `npm test` passou com 60 testes, incluindo dois da Etapa 02. Build local, build para GitHub Pages e `git diff --check` passaram.
- Chromium em **320 × 568**, **390 × 844**, **600 × 850**, **761 × 900**, **1024 × 850** e **1440 × 900**. Verificados progresso crescente e reversível das sete cenas, ausência de overflow horizontal, texto a 200%, saída do hero e foco no catálogo.
- Nas seis janelas, a jornada percorreu Home, catálogo, produto, galeria com Escape, favoritos, sacola, frete e confirmação do checkout demonstrativo.
- Em 390 × 844 foram verificadas a versão com movimento reduzido, a ausência do bloco de melhoria progressiva simulada via CSSOM e a indisponibilidade das imagens.
- A comparação gravada em 1440 × 900 e 390 × 844 usa os builds do commit base e desta etapa, com as mesmas fotografias já usadas pela loja. Foram capturados 270 quadros comparativos no navegador, com rolagem de cima a baixo.
- Safari, Firefox, dispositivos físicos e métricas de FPS ou rede em produção seguem sem aferição. O PR fica aberto para revisão. A etapa 03 aguarda autorização.
