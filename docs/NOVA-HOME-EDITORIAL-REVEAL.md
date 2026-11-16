# Editorial Reveal na Home da NØVA STREET

## Diagnóstico

Na gravação do iPhone, as camadas diagonal e vermelha voltavam a cobrir as fotografias quando a direção da rolagem mudava. No mobile, quatro grupos no controlador atualizavam uma variável CSS de progresso em cartões de Categorias, Novidades, Lifestyle e no título de Categorias. No desktop, as mesmas áreas usavam View Timelines para máscara, zoom, pan e movimento do título. As regras dessas três áreas foram removidas nas duas implementações. Os gradientes estáticos usados para dar contraste às legendas continuam no card.

## Coreografia

| Seção | Revelação | Depois da entrada |
| --- | --- | --- |
| Categorias | O card sobe 28 px no desktop e 22 px no mobile, de 98% a 100% de escala. Os cards entram com defasagem de até 96 ms nas linhas desktop. Na pilha mobile, a posição de cada card já determina a sequência. | A imagem de fundo mantém o mesmo enquadramento. |
| Novidades | A frente do card sobe até 16 px sem aplicar escala. Um traço vermelho de 2 px se estende abaixo dos dados do produto. A segunda coluna no mobile entra 55 ms depois da primeira. | Fotografia, botão de favorito, preço e interações dos Cards Premium ficam nas camadas existentes. |
| NØVA Lifestyle | O quadro inteiro sobe 38 px no desktop e 26 px no mobile. O título e a chamada ganham uma entrada própria cerca de 85 ms depois do quadro. | A foto permanece estável dentro do quadro e o gradiente de contraste fica ancorado. |

As durações são 480, 410 e 580 ms, respectivamente. Parte da composição já está visível no primeiro quadro. Um `IntersectionObserver` registra a entrada de cada alvo e deixa de observá-lo. O CSS anima `transform` e `opacity` por tempo uma única vez. A inversão da rolagem durante a entrada segue o mesmo movimento até o repouso. O efeito fica na camada externa do card, separado dos planos interativos dos Cards Premium.

Os identificadores que já entraram ficam em memória e no `sessionStorage` da aba. Voltar de outra rota ou recarregar a Home na mesma sessão mantém o estado. Se o navegador bloquear armazenamento, a memória mantém esse comportamento entre as rotas do documento. Foco encerra o movimento imediatamente no card. Com movimento reduzido ou sem o observador, o conteúdo fica estático e visível desde o início. As imagens podem carregar depois sem condicionar a revelação.

A integração é opt-in nos cards de Categorias, Novidades e Lifestyle da Home. Hero, passagem NO RULES → MAIS VENDIDOS, faixa tipográfica, abertura do menu, transição de produto, final, assinatura e fluxos comerciais conservam suas implementações.

## Verificação

- `npm test` — 80 testes.
- `npm run build` e `GITHUB_PAGES=true npm run build` — builds padrão e GitHub Pages.
- O vídeo compara a base `88481fc` com a nova versão nas três seções, descendo e subindo. As capturas vêm de builds de produção no Chromium, em 390 × 844 e 1440 × 900. Os quadros representam posições de rolagem controladas.
- O build de GitHub Pages passou de 16,30 para 15,74 kB de CSS principal em gzip e de 78,70 para 79,22 kB de JS principal em gzip. O controlador existente perdeu as trilhas das três áreas. A nova revelação não executa trabalho contínuo de rolagem.

O iPhone físico serviu de referência para a versão anterior. A versão nova foi verificada em navegadores headless. O ensaio do Safari instalado no aparelho fica para a revisão visual do proprietário antes da integração.

### Medição em Chromium headless

O roteiro entrou e voltou em cada uma das três áreas, com 1 segundo por área e imagens previamente decodificadas. A tabela compara as medianas de três ensaios por versão e viewport. Layout vem de `Performance.getMetrics` e pintura soma eventos `Paint` da trilha do DevTools na janela do ensaio.

| Viewport | P95 entre quadros | Layout acumulado | Paint acumulado |
| --- | --- | --- | --- |
| 390 × 844 | 16,8 → 16,7 ms | 0 → 5,72 ms | 21,42 → 12,39 ms |
| 1440 × 900 | 16,8 → 16,7 ms | 0 → 3,53 ms | 1,70 → 8,58 ms |

A cadência permaneceu estável nos ensaios. A nova entrada reduziu o tempo de pintura medido no mobile e aumentou o trabalho de layout nas duas resoluções e de pintura no desktop. O ensaio mede eventos do Chromium em ambiente emulado. O custo de rasterização e o desempenho no Safari do aparelho seguem sem medição.

### Navegadores

Chromium e WebKit foram verificados em 320 × 568, 390 × 844 e 1440 × 900. O roteiro observou a entrada dos dez cards, a estabilidade da fotografia, a reversão sem repetir a entrada, foco e navegação por teclado, abertura de produto, retorno de rota, recarga na mesma aba, texto a 200% e ausência de overflow horizontal. O teste mobile do Chromium incluiu gestos de toque sintéticos lentos, rápidos e reversos.

Os dois motores mantiveram o conteúdo estático com movimento reduzido ou sem suporte a `IntersectionObserver`. O atraso de imagem foi testado em ambos. Em WebKit a 402 × 874, o card de Lifestyle revelou enquanto a resposta da foto estava retida e permaneceu na mesma posição após a imagem carregar.
