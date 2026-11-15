# NØVA Motion Showcase 2.0 — Etapa 01

## Auditoria do PR #8

A revisão partiu da main em `887bbad` e da proposta em `bd7e00a`. A proposta compilou e foi inspecionada no Chromium em 390 e 1440 px. Ela trouxe o escalonamento em três tempos, as máscaras por linha, a câmera sobre a foto original e a curva de desaceleração expressiva. Esses elementos foram reaproveitados. No primeiro quadro da proposta, o CTA estava com opacidade zero e a cortina vermelha ocupava a abertura inteira. O PR também alterava cards, menu, sacola e seções editoriais. A etapa 01 foi isolada em uma nova branch a partir da main e selecionou apenas as mudanças ligadas à abertura.

## Coreografia final

| Elemento | Início | Duração |
| --- | ---: | ---: |
| Câmera e plano fotográfico | 0 ms | 2.100 ms |
| Cortina diagonal sobre o recorte fotográfico | 0 ms | 1.250 ms |
| NEW DROP / STREET / ESSENTIALS | 120 / 255 / 390 ms | 900 ms por linha |
| Descrição e link da coleção | 505 / 630 ms | 700 ms |
| Cantos da moldura | 750 ms | 700 ms |
| Linha de acabamento na faixa de frete | 850 ms | 900 ms |

No desktop, o retrato ocupa o lado direito e a tipografia começa em um campo escuro à esquerda. Até 760 px, a foto passa a preencher a abertura e a tipografia fica sobre o gradiente inferior. A faixa de frete repete o fundo escuro e prolonga a abertura com uma linha vermelha. O valor e a indicação de checkout demonstrativo ficam legíveis desde o primeiro quadro.

A imagem original usa `srcset`, `sizes`, proporção declarada e prioridade alta. O recorte e os gradientes são estáticos. Câmera, cortina e tipo usam transformações, e a opacidade animada fica restrita à moldura decorativa. A coreografia roda uma vez em CSS. O botão **Ver coleção** conserva sua opacidade e seu destino durante a sequência. Quando ele recebe foco, o título e o apoio assumem a posição final. Com movimento reduzido, a composição final fica disponível imediatamente.

## Validação e limites

- `npm test` — 58 testes, incluindo duas verificações da estrutura e dos estados de movimento do hero.
- `npm run build`, `GITHUB_PAGES=true npm run build` e `git diff --check`.
- Chromium headless em 320 × 568, 390 × 844, 760 × 900, 761 × 900 e 1440 × 900, com o título ampliado a 200%, entrada de teclado e navegação para o catálogo. Movimento reduzido verificado em 390 × 844 e 1440 × 900.
- A composição também foi exercitada com a foto bloqueada. Para a captura, o navegador recebeu cópias baixadas das variantes fotográficas do Unsplash. O vídeo reúne quadros capturados em desktop e mobile, com a linha do tempo CSS posicionada em intervalos de 1/24 s.
- Safari, Firefox, aparelhos físicos e métricas de rede e desempenho em produção seguem sem aferição. O PR está destinado à revisão antes da integração. A etapa 02 aguarda autorização.
