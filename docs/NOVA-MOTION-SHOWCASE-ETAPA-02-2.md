# NØVA Motion Showcase 2.0 · Etapa 02.2

Refinamento mobile sobre `900d8d4`, integração do [PR #11](https://github.com/rick-dev-rick/nova-street/pull/11). A Home mantém a abertura do Hero 2.0 e as rotas comerciais. A fixação editorial e as View Timelines continuam no desktop.

## Diagnóstico

| Problema observado | Causa | Correção |
| --- | --- | --- |
| A segunda linha de **NO RULES. JUST STREET.** entrava cortada nas quatro larguras de retrato. A 320 px, a palavra chegou a x=362, enquanto a máscara acabava em x=308. | As linhas eram transladadas lateralmente por 60% e recortadas por `overflow: clip`. O deslocamento era proporcional à largura do bloco, mesmo quando a palavra já ocupava quase todo o espaço. | Redução e escala com origem à esquerda, deslocamento em função da tipografia e quebra de texto disponível para ampliação. O recorte fotográfico fica numa camada separada. |
| Em uma redução simulada de 568 para 458 px de altura, o topo do palco passou de 112 para −23 px no mesmo ponto de rolagem. | O palco alternava entre `sticky` e fluxo ao cruzar 520 px. O valor fixo de 112 px também deixava 43 px de diferença para o cabeçalho de 69 px observado em 430×932. | Palco em fluxo no mobile, referência estável em `100svh` e cálculo da área visível a partir da altura medida do cabeçalho. Em paisagem, o palco distribui título e CTA em duas colunas. |
| A imagem podia continuar se reposicionando depois de uma mudança de direção na implementação mobile. | Durante o desenvolvimento, a transformação da fotografia de NOVIDADES herdou uma transição de 350 ms que reiniciava a cada novo valor de progresso. | A transformação das fotos de NOVIDADES acompanha o progresso diretamente enquanto o efeito mobile está ativo. A cortina e a foto foram verificadas separadamente na ida e na volta. |
| Havia risco de salto ao ativar ou desativar o efeito em BEST SELLERS. | O filete inserido no cabeçalho acrescentava altura quando o efeito era ativado. | A linha faz parte da composição estática. Só a escala da linha depende do progresso. |

Os dois primeiros defeitos foram reproduzidos no build do PR #11. A barra de endereço nativa do iOS e o relato no aparelho do proprietário não foram reproduzidos diretamente.

## Sete cenas

| Cena | Composição mobile |
| --- | --- |
| Saída do Hero 2.0 | O plano externo aproxima a fotografia quando o Hero sai da área útil da tela. O filete de frete abre lateralmente. |
| EXPLORE | A manchete se alinha por escala e inclinação. As lâminas diagonais alternam o sentido nos cards empilhados e mantêm os rótulos legíveis acima delas. |
| NOVIDADES | Uma cortina vermelha desce enquanto a foto recua de 132% para o tamanho natural. Nome, preço e favorito conservam seu enquadramento. |
| NO RULES. JUST STREET. | Duas linhas avançam em ritmos diferentes, com a fotografia panorâmica em movimento atrás delas. O título e o CTA ficam no fluxo da página, inclusive em paisagem. |
| BEST SELLERS | Uma linha de registro se abre e as faixas nas fotos se afastam em diagonais alternadas, com direção diferente de NOVIDADES. |
| NØVA LIFESTYLE | As fotografias em planos recortados atravessam o quadro em sentidos alternados. A legenda permanece no primeiro plano. |
| Continuidade final | Um filete vermelho se estende e se afina até a chamada final. |

## Implementação e desempenho

Em mobile, um listener passivo de `scroll` agenda no máximo uma atualização por quadro com `requestAnimationFrame`. A posição no documento é convertida em progresso entre 0 e 1 para cada cena. As camadas decorativas usam esse valor em transformações CSS. O mesmo ponto da página produz a mesma transformação nos dois sentidos. As medições de geometria ficam em cache até que o `ResizeObserver` detecte mudanças na régua de viewport, no cabeçalho ou no conteúdo. O controlador é removido ao sair da Home ou ativar movimento reduzido.

O build para GitHub Pages passou de 10,88 para 11,67 kB gzip no CSS principal e de 75,80 para 76,66 kB gzip no JS principal. A revisão usa as fotografias e dependências existentes. A composição fica estática em movimento reduzido ou sem as APIs necessárias. A capacidade de montar a página com JavaScript totalmente desativado continua condicionada à aplicação React.

## Verificação

- `npm test` passou com 63 testes. `npm run build`, o build para GitHub Pages e `git diff --check` passaram.
- Chromium 153 e WebKit 26.5 no Linux, com configuração mobile em 320×568, 375×667, 390×844 e 430×932, mais 844×390 e 932×430 em paisagem. Testadas as sete cenas nos dois sentidos, texto ampliado a 200%, geometria dos títulos, foco e acionabilidade do CTA, ausência de overflow horizontal e disponibilidade da animação de abertura do Hero.
- Chromium com entrada de toque emulada, gestos lentos, rápidos e reversos. Em 390×844, as sete cenas responderam ao gesto e a navegação por toque passou pelo menu, catálogo, produto, sacola e checkout. Também foi verificada a redução isolada da viewport visual e a redução completa da altura da viewport. A primeira mantém a referência enquanto a segunda permite que o layout se ajuste com o palco sempre em fluxo.
- Nos dois motores, verificadas imagens indisponíveis, movimento reduzido e fallback com `ResizeObserver` indisponível.
- Desktop a 1024×850 e 1440×900, com fixação do palco, as sete cenas em View Timelines, foco, catálogo, produto, galeria, favoritos, sacola e confirmação do checkout demonstrativo.
- A comparação em vídeo percorre a Home em 320×568, 390×844 e 844×390, com os builds capturados lado a lado no Chromium. A gravação compara a composição, sem medir FPS ou reproduzir a interface do navegador do aparelho.

## Revisão em aparelho físico

A validação desta entrega usou motores reais com dimensões e toque emulados. A barra do Safari, a inércia nativa e o desempenho de um iPhone ou Android físico continuam pendentes. Para conferir a branch em um aparelho na mesma rede do computador, execute `npm ci` e `npm run dev -- --host 0.0.0.0`, abra o endereço de rede mostrado pelo Vite e role da saída do Hero até BEST SELLERS. Na passagem por **NO RULES. JUST STREET.**, inverta a direção do gesto e repita em paisagem.
