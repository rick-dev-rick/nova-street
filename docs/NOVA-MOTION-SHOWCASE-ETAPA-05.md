# NØVA Motion Showcase 2.0 · Etapa 05 · Cinematic Product Transition

Base `f6c06b1`, integração do menu fullscreen.

## Auditoria da navegação

A loja mantém `BrowserRouter` no build padrão e `HashRouter` no GitHub Pages. A página de produto já era carregada de forma assíncrona. Novidades, Mais Vendidos, catálogo, favoritos e relacionados usam o mesmo `ProductCard`. Os links da foto e do nome abrem o produto e o botão de favoritos é independente. A fotografia no card é carregada sob demanda. A galeria usa a mesma URL e a mesma proporção 4:5, com visualização editorial e um detalhe ampliado. A escala dos Cards Premium fica em uma camada própria, e a Home continua animando o elemento da fotografia pelo progresso da rolagem.

## Estratégia e coreografia

- A rota permanece em um chunk separado. Um observador compartilhado começa a antecipar esse chunk quando um card se aproxima da viewport. Foco e aproximação do ponteiro também podem iniciar a carga. O clique regular só anima quando a página e a foto já estão disponíveis. Quando estão indisponíveis, a navegação conserva o `Link` e o indicador de carregamento da loja.
- A View Transitions API captura somente o quadro da foto selecionada. Um quadro de recorte envolve a escala dos Cards Premium e a textura já visível na Home. A foto é movida na direção e no tamanho da galeria por uma única geometria compartilhada. O destino é montado no mesmo callback antes da captura, com a rolagem no topo. Preços, tamanhos, quantidade e sacola continuam disponíveis na página real durante o movimento.
- A passagem mobile dura 430 ms na folha de estilos e a desktop, 540 ms. A textura do destino assume a imagem durante o mesmo movimento. Depois que o retrato se aproxima do encaixe, a tipografia e os detalhes comerciais entram em sequência. O foco em um controle da coluna estabiliza seu texto.
- A primeira revisão visual mostrou um lampejo durante a captura da raiz da página no Chromium mobile. A versão final deixa a página nova renderizada atrás da foto e retira a raiz da captura. O vídeo registra a versão final sem o lampejo observado nessa revisão.
- Movimento reduzido, API indisponível, imagens ausentes, clique modificado e página ainda fria conservam a abertura normal. Voltar e avançar seguem o histórico nativo. A passagem compartilhada é aplicada à seleção de um card, que oferece uma origem de captura conhecida. Nova interação ou navegação pode interromper e limpar a animação.

## Verificação

- 73 testes com `npm test`, builds padrão e GitHub Pages e `git diff --check`.
- Chromium 153 e WebKit 26.5 em 390×844 e 1440×900, com as cinco origens verificadas. Conferidos foco, abertura por teclado, toque, avanço e volta, imagem correspondente, zoom a 200%, favoritos, tamanho, sacola e checkout demonstrativo.
- Também foi validado o build padrão com BrowserRouter em 320×568, galeria, Escape e texto a 200%. Os testes de exceção verificaram conexão simulada de chunk frio, imagem bloqueada, API desativada, movimento reduzido e seleção repetida.
- O clique modificado não é interceptado e o endereço correspondente abre em uma sessão de navegador independente. A criação automática de aba por atalho não foi reproduzida no Chromium headless disponível.
- Vídeo demonstrativo antes/depois em 1440×900 e 390×844. A passagem é mostrada por etapas, com as imagens servidas de forma controlada. A animação e os tempos no Safari de um iPhone físico ainda precisam de conferência.

## Desempenho

No build GitHub Pages, o CSS principal passou de 15,19 para 15,67 kB gzip. O JS principal passou de 77,82 para 78,59 kB gzip. O chunk do produto continua separado e tem 4,05 kB gzip. A animação delega o movimento da foto à API nativa e não executa um loop de animação em JavaScript. A captura de apenas uma foto, em vez do conteúdo inteiro da viewport, também limita o trabalho de composição. As amostras cronometradas são de emulação headless com recursos aquecidos. Elas não representam FPS ou latência em iPhone real.

Medianas de cinco ativações por combinação navegador/viewport. A primeira coluna mede o intervalo entre pedir a transição e montar a página. A segunda inclui o movimento inteiro e a finalização da API.

| Navegador e viewport | Até montar a página | Até terminar a transição |
| --- | ---: | ---: |
| Chromium 390×844 | 25,2 ms | 477,9 ms |
| Chromium 1440×900 | 29,3 ms | 601,1 ms |
| WebKit 390×844 | 40 ms | 519 ms |
| WebKit 1440×900 | 71 ms | 657 ms |
