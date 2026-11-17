# Sistemas cinematográficos

A Home monta as cenas em [Home.jsx](../src/pages/Home.jsx). O [CSS de movimento do Design System](../src/design-system/motion.css) contém transições compartilhadas e a regra de `prefers-reduced-motion`. Durações, curvas e distâncias devem ser consultadas nos [tokens](../src/design-system/tokens.css) e nas folhas das cenas. Mantenha as camadas decorativas isoladas da interação e verifique que o conteúdo permanece legível e os controles funcionam quando o efeito não pode ser executado.

## Hero Cinematográfico 2.0

A montagem da Home inicia a abertura da fotografia em preto e branco, as linhas do título, o CTA e a faixa de frete. O recorte, a moldura, a cortina e a abertura são declarados em [hero-showcase.css](../src/styles/hero-showcase.css). A foto editorial vem do Unsplash com `srcSet`, `sizes` e prioridade alta. Em telas estreitas, a foto cobre o quadro inteiro e o texto se apoia no gradiente inferior.

A entrada exige preferência por movimento normal. A abertura usa a foto `.hero-photo`. A rolagem move o quadro externo `.hero-shot`. Essa separação permite que os efeitos coexistam. O foco dentro do Hero neutraliza o deslocamento dos textos e do CTA. A animação de entrada é CSS, sem listeners próprios. Confira a primeira pintura com a foto atrasada, o título quebrando em telas estreitas e o CTA acessível por Tab antes da conclusão da abertura. [Registro da Etapa 01](NOVA-MOTION-SHOWCASE-ETAPA-01.md).

## Scroll Cinematográfico

O movimento conecta a saída do Hero, o corte editorial do drop, a entrada de Mais Vendidos e a faixa de abertura do trecho final. A Home identifica as cenas por `data-scroll-scene`. [scroll-showcase.css](../src/styles/scroll-showcase.css) usa timelines de visualização para Hero e faixas no desktop quando compatível. [campaign-scroll.css](../src/styles/campaign-scroll.css) dá forma ao palco editorial, ao corte e à composição de Mais Vendidos. Categorias, Novidades e Lifestyle usam o Editorial Reveal descrito abaixo.

A Home liga [mobile-scroll.js](../src/lib/mobile-scroll.js), que calcula a progressão das trilhas da campanha e cobre as trilhas mobile do Hero e das faixas com [mobile-scroll.css](../src/styles/mobile-scroll.css). A seleção mobile considera largura e ponteiro grosseiro. O retrato da campanha usa um [WebP local](../src/assets/campaign-portrait-mobile.webp) nessa configuração. O corte mobile usa a timeline CSS quando os recursos testados estão disponíveis, deixando o controlador JavaScript fora da trilha desse corte. Sem preferência por movimento normal ou sem as APIs exigidas, a composição básica permanece visível.

O listener de rolagem é passivo e agenda um único quadro pendente. O observador de resize invalida medidas de referências estacionárias, e o controlador evita reescrever progresso idêntico. Mudança de mídia pode reiniciar ou parar o controlador. Na parada, ele desconecta o observador, remove listener e régua, cancela o quadro e limpa atributos e variáveis que aplicou. No desmontar, remove também listeners das media queries. Ao manter, teste ida e volta durante a rolagem, mudança de orientação, foco abaixo do cabeçalho e retorno à Home após navegação. [Refinamento mobile](NOVA-MOTION-SHOWCASE-ETAPA-02-3.md).

## Editorial Reveal

A entrada escalonada dá ritmo a Categorias, Novidades e Lifestyle. [Home.jsx](../src/pages/Home.jsx), [EditorialCard.jsx](../src/components/EditorialCard.jsx), [Lifestyle.jsx](../src/components/Lifestyle.jsx) e [ProductCard.jsx](../src/components/ProductCard.jsx) fornecem identificadores como `category:Masculino` ou `new:<id>`. [editorial-reveal.js](../src/lib/editorial-reveal.js) usa `IntersectionObserver` para marcar cada elemento visto, e [editorial-reveal.css](../src/styles/editorial-reveal.css) anima apenas os elementos marcados para entrada. No mobile estreito, deslocamentos e escalonamento diminuem.

Em condições normais, a chave `nova:editorial-reveal:v1` no `sessionStorage` evita repetição durante a sessão daquela aba, inclusive ao recarregar. Com armazenamento bloqueado, o registro em memória dura o documento. Foco revela o elemento imediatamente. Movimento reduzido também mantém o conteúdo visível, e a ausência de observador deixa a apresentação estática. O controlador libera o alvo ao revelar, limpa a marca no fim da animação ou na troca para preferência reduzida e desconecta o observador e os listeners no desmontar. Use chaves estáveis e distintas por grupo. Confira retorno pelo histórico, foco antes da interseção e sessão bloqueada. [Registro do Editorial Reveal](NOVA-HOME-EDITORIAL-REVEAL.md).

## Cards Premium

[ProductCard.jsx](../src/components/ProductCard.jsx) e [premium-product-card.css](../src/styles/premium-product-card.css) compõem fotografia enquadrada, indicação de navegação, linha de destaque e feedback de favorito. Hover com ponteiro fino ou foco na foto ou título acentua a imagem. Toque e caneta sinalizam o estado pressionado. A indicação do favorito usa o estado do [FavoriteButton](../src/components/FavoriteButton.jsx). Em telas estreitas, o posicionamento de selo e indicação se ajusta.

A camada `.product-image-plane` recebe o movimento de interação. A foto em seu interior pode seguir o movimento de rolagem da Home. A moldura que envolve ambas é a origem da transição para produto. Mantenha essa hierarquia e teste foto, título e favorito como alvos distintos. A preferência reduzida desliga o zoom animado e conserva os estados estáticos. `pointerup`, `pointercancel` e perda de captura removem a marca de pressão, sem listener global exclusivo do efeito. O desmontar libera a inscrição do card no observador de preload. Confira o fim da pressão ao rolar, a navegação por teclado e a convivência com Editorial Reveal e Mais Vendidos. [Registro da Etapa 03](NOVA-MOTION-SHOWCASE-ETAPA-03.md).

## Menu Fullscreen

[CategoryNavigation.jsx](../src/components/CategoryNavigation.jsx) usa o [Dialog](../src/design-system/Dialog.jsx) nativo e [fullscreen-menu.css](../src/styles/fullscreen-menu.css) para a cortina e entrada das linhas. O botão Menu abre o diálogo e foca Fechar. Enquanto aberto, a rolagem externa fica bloqueada e a interna permanece disponível. Tab e Shift+Tab percorrem os limites do diálogo. Escape, o botão Fechar, mudança de rota e navegação pelo menu fecham o painel. O fechamento restaura foco ao gatilho. A ida para a sacola fecha o menu antes de abrir o drawer. A ativação modificada de link mantém seu comportamento habitual.

No mobile, a navegação em linha cede espaço ao menu, que usa altura dinâmica da viewport, áreas seguras e ajustes para paisagem e para contêiner estreito. Com movimento reduzido, fecha imediatamente. Fora desse modo, o conteúdo fica inerte durante a saída e um timer cobre a ausência de `animationend`. Fechar limpa o timer e as marcas de pressão e de saída. Desmontar cancela o timer. Confira Tab durante a entrada, Escape com e sem movimento, acesso a favoritos e sacola, 200% de texto, rolagem interna e restauração de foco. [Registro da Etapa 04](NOVA-MOTION-SHOWCASE-ETAPA-04.md).

## Transição Catálogo → Produto

A foto do card passa à galeria com uma View Transition. [ProductCard.jsx](../src/components/ProductCard.jsx) fornece a origem. [ProductGallery.jsx](../src/components/ProductGallery.jsx) fornece `data-product-flight-target`. [product-route.js](../src/lib/product-route.js) aquece a rota ao aproximar um card da viewport, focar ou entrar com o ponteiro. [product-flight.js](../src/lib/product-flight.js) sincroniza navegação e registro das molduras. [product-flight.css](../src/styles/product-flight.css) controla o recorte, a troca de imagens e a entrada do texto. A duração e o atraso se ajustam ao mobile.

O efeito só consome a ativação quando o módulo já está carregado, a foto está pronta e visível, há suporte à API, a preferência permite movimento e o link não tem modificadores para outra navegação. Nos outros casos, vale o link normal. O observador ignora notificações de cards removidos e é liberado quando fica sem alvos ou quando o módulo resolve. O fim ou interrupção da transição limpa os nomes temporários, a marca da raiz e os listeners via `AbortController`. Uma rolagem, tecla ou novo toque pode interromper o efeito antes do callback. O clique ainda navega se sua rota e entrada de histórico continuam atuais e nenhuma ativação mais recente o substituiu. A navegação de histórico tem prioridade.

Confira foto indisponível, navegação direta, clique com modificador, interrupção antes do callback, voltar/avançar, movimento reduzido e ausência da API. Ao mexer na galeria, preserve uma moldura de destino única e com dimensões estáveis. [Registro da Etapa 05](NOVA-MOTION-SHOWCASE-ETAPA-05.md) e [correções do Módulo 10](NOVA-DESIGN-SYSTEM-MODULO-10.md).

## Kinetic Typography

[KineticBand.jsx](../src/components/KineticBand.jsx) e [kinetic-band.css](../src/styles/kinetic-band.css) fazem título e contorno se deslocarem em sentidos distintos dentro da faixa. A progressão vem da timeline de visualização do próprio bloco ao entrar e sair da viewport. As versões estreita e paisagem baixa ajustam tipografia, amplitude e trechos de progressão.

A animação é CSS, sem listeners ou recursos JavaScript próprios. O texto permanece em fluxo, com fallback estático quando a timeline não é suportada ou se o movimento está reduzido. A aparência do contorno também tem fallback e tratamento para cores forçadas. Confira as duas direções da rolagem, ausência de overflow horizontal e leitura quando o efeito ou o contorno não estiverem disponíveis. [Registro da Etapa 06](NOVA-MOTION-SHOWCASE-ETAPA-06.md).

## Final Cinematográfico

[FinalCTA.jsx](../src/components/FinalCTA.jsx) e [home-finale.css](../src/styles/home-finale.css) encerram a campanha com fotografia editorial, convergência de título e ação para voltar ao catálogo. A fotografia do Unsplash tem dimensões declaradas e carregamento sob demanda. Quando a timeline de visualização é suportada, a entrada do bloco conduz a progressão da foto e das duas linhas em intervalos distintos. No mobile retrato, a foto ocupa o topo e o conteúdo fica abaixo.

O plano decorativo ignora ponteiro, e o foco no CTA suspende o deslocamento das linhas. Sem timeline ou com movimento reduzido, a composição estática fica legível. O efeito do CTA é CSS, sem recursos JavaScript próprios a liberar. A faixa acima pertence ao controlador do Scroll Cinematográfico. Confira carregamento tardio da foto, legibilidade no mobile, foco no CTA e retorno ao catálogo. [Registro do Final](NOVA-MOTION-SHOWCASE-ETAPA-07-FINAL.md).

## Assinatura NØVA STREET

[HomeSignature.jsx](../src/components/HomeSignature.jsx) e [home-signature.css](../src/styles/home-signature.css) exibem a marca entre o CTA final e o rodapé. A entrada na viewport dirige a revelação dos dois termos, a profundidade, a luz e a linha final por timeline CSS. A versão estreita empilha os termos, e paisagem baixa compacta o quadro. A camada duplicada de profundidade é decorativa e permanece fora da árvore acessível.

A combinação estática mantém a marca legível com movimento reduzido ou sem suporte à timeline. O efeito não registra listeners nem observadores JavaScript. Confira palavras inteiras em mobile, alinhamento com o rodapé, ausência de overflow horizontal e assinatura única para tecnologias assistivas. [Registro do encerramento](NOVA-MOTION-SHOWCASE-ETAPA-07-FINAL.md).

## Revisão

- Rode `npm test`. Os testes de movimento estão em [tests/](../tests/). Eles cobrem contratos e casos pontuais de controle, sem medir a aparência da animação nativa.
- Compare a primeira pintura, uma posição intermediária e o repouso de cada efeito afetado. Use dados, viewport, navegador e preferência de movimento equivalentes. Verifique teclado, histórico, retrato e paisagem.
- Registre o navegador, a preferência, o tamanho e os cenários efetivamente verificados. Execução em WebKit automatizado não confirma comportamento em Safari físico. Veja as limitações no [relatório do Módulo 10](NOVA-DESIGN-SYSTEM-MODULO-10.md).
