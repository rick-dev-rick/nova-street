# NØVA Motion Showcase 2.0 · Etapa 02.3 · Mobile Performance

Base `3d8ea3a`, integração do PR #14. Escopo da otimização visual: passagem entre **NO RULES. JUST STREET.** e **MAIS VENDIDOS.** no mobile.

## Diagnóstico

Há dois fatores distintos. A janela de progresso anterior usava 83% da altura útil para o recuo da moldura. Na viewport de referência, 10% a 90% desse recuo consumiam cerca de 480 px de rolagem. A sequência também movia o fundo, o recorte branco e o retrato filtrado com sombra. O perfil mostrou trabalho recorrente de pintura e rasterização. Nas dez execuções comparáveis, nenhum evento `Layout` caiu dentro da janela medida. Isso coloca a faixa de progresso e o custo de renderização como alvos diretos. O perfil do Safari em um iPhone real permanece desconhecido.

## Mudanças

- No mobile, só a moldura muda de posição e de escala durante a passagem vermelha. Os planos vermelhos e a diagonal branca mantêm o enquadramento. O retrato anterior e o da moldura compartilham um WebP de 56,47 kB, derivado da mesma fotografia da campanha, com o preto e branco e os ajustes tonais já incorporados. Filtros e sombra borrada saíram apenas desses planos no mobile.
- Quando o navegador oferece View Timelines, a posição da moldura é vinculada à rolagem por CSS e o controlador JavaScript deixa de atualizar essa trilha. A alternativa em JavaScript também usa a janela mais curta. Movimento reduzido apresenta a composição estática.
- O controlador calcula os limites das trilhas quando mede a geometria. Durante a rolagem, descarta as trilhas já nos extremos antes de recalcular o progresso. `ResizeObserver` continua invalidando as medidas, e o listener passivo continua agendando no máximo uma atualização por quadro. Os demais atos conservam sua direção.
- O desktop mantém a imagem, o filtro, a sombra e as três transformações da passagem. Geometria e matrizes coincidiram com a base em quatro posições amostradas por viewport desktop.

## Perfil antes e depois

Chromium 153 headless em Linux, 390×844, GPU desabilitada, CPU limitada a 4× via CDP, com fontes e imagens aquecidas. Cinco traces por versão. Cada execução começa 773 px antes da passagem e aplica os mesmos quatro gestos sintéticos de toque, sem inércia extra: avançar 398 px a 370 px/s, voltar 344 px a 1.100 px/s, avançar 344 px a 1.300 px/s e voltar 337 px a 800 px/s. O trace é recortado por marcas antes e depois da sequência.

| Indicador | Antes | Depois |
| --- | ---: | ---: |
| Rolagem para completar de 10% a 90% do recuo, amostragem a cada 10 px | 480 px | 250 px |
| Cadência mediana de callbacks de `requestAnimationFrame` | 59,15/s | 59,58/s |
| P95 mediano do intervalo entre callbacks | 16,8 ms | 16,8 ms |
| Mediana do maior intervalo por execução | 50,0 ms | 33,3 ms |
| Maior intervalo observado entre as cinco execuções | 50,0 ms | 33,4 ms |
| Long Animation Frames informados pelo navegador, total das cinco execuções | 1 | 0 |
| `UpdateLayoutTree`, duração mediana acumulada | 145,76 ms | 97,00 ms |
| `Paint`, duração mediana acumulada | 98,73 ms | 30,39 ms |
| `RasterTask`, duração mediana acumulada | 359,28 ms | 41,74 ms |
| Eventos `Layout` observados durante a sequência | 0 | 0 |

Os tempos de trace somam trabalho de eventos e podem incluir tarefas em threads diferentes. A cadência de callbacks é um indicador do teste, não uma medição da taxa de quadros efetivamente apresentada pelo iPhone. A maior diferença medida foi no custo por gesto e na distância necessária para a moldura assentar. Os recalculadores de estilo foram acionados mais vezes com a timeline nativa (mediana de 125 a 217 eventos `UpdateLayoutTree`), mas gastaram menos tempo no total. O vídeo compara o mesmo deslocamento programado nos dois builds; a profilagem usa gestos sintéticos de toque.

## Validação

- `npm test` passou com 64 testes, incluindo a regressão do progresso reversível com limites em cache. Os builds padrão e GitHub Pages e `git diff --check` passaram.
- Chromium 153 e WebKit 26.5 em 320×568, 390×844, 430×932, 844×390 e 1440×900. Testados reversão da transformação, conteúdo com texto a 200% e ausência de rolagem horizontal. Testados movimento reduzido e caminho JavaScript com View Timelines indisponíveis por simulação.
- Chromium com toque emulado lento, rápido e reverso em 390×844, incluindo favorito, produto, sacola, frete e confirmação do checkout demonstrativo.
- Desktop comparado diretamente com a base em 1024×850 e 1440×900. O vídeo mostra os dois builds mobile lado a lado.
- A versão instalada do Safari e a inércia da rolagem em um iPhone físico ainda precisam de conferência. Os números acima descrevem o ambiente de teste emulado.
