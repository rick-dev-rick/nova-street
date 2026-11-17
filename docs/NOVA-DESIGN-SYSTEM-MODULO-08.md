# NØVA Design System · Módulo 08 · Responsividade e acessibilidade

> Os testes de checkout deste relatório cobrem o formulário que existia antes da revisão comercial. A partir do Módulo 09, a única entrada da simulação é o CEP. [Módulo 09](NOVA-DESIGN-SYSTEM-MODULO-09.md)

Base auditada `d0c011b`. Escopo de referência [WCAG 2.2 nível AA](https://www.w3.org/TR/WCAG22/). A severidade indica o impacto observado na jornada e ajuda a priorizar a revisão.

## Achados e correções

| Severidade | Achado reproduzido | Correção e arquivos |
| --- | --- | --- |
| Alta | Ao voltar com Shift+Tab, controles de Home, catálogo, produto e checkout podiam ficar inteiramente sob o cabeçalho fixo. Foram 51 ocorrências no roteiro Chromium com fonte ampliada. | `Layout.jsx` e `Header.jsx` mantêm o controle à vista quando recebe foco de teclado. A checagem só ocorre ao focar, sem monitoração de rolagem. O mesmo roteiro terminou com zero ocorrências. |
| Alta | Ao remover um favorito ou uma variante, o controle focado era desmontado e a sequência de teclado perdia a posição. | `Favorites.jsx` mantém foco no botão vizinho ou no título do estado vazio. `Cart.jsx` e `CartDrawer.jsx` mantêm foco na variante vizinha ou no link do estado vazio. Os rótulos da sacola distinguem tamanhos da mesma peça. |
| Média | O atalho de conteúdo ficava parcialmente visível sem foco a 200%. O painel do menu fragmentava palavras e a cortina podia cobrir controles quando o teclado avançava durante a abertura. | `app.css` recorta o atalho enquanto está sem foco. `fullscreen-menu.css` adapta a coluna numérica ao espaço disponível e mantém opções focadas acima da cortina. A coreografia padrão com ponteiro permanece a mesma. |
| Média | As miniaturas da galeria fragmentavam rótulos a 200% e a abertura do ampliador carecia de identificação do diálogo. | `ProductGallery.jsx` liga o botão ao diálogo nomeado. `app.css` empilha as miniaturas quando o espaço, relativo à fonte, fica estreito. Escape devolve foco à foto. |
| Média | A instrução de obrigatoriedade não era visível antes do preenchimento. No CEP, o foco podia chegar antes do texto de erro. O botão Calcular quebrava o rótulo no desktop. No WebKit, a troca de cores ao liberar o envio criou contraste insuficiente por um instante. | `Field.jsx` usa rótulos nativos explícitos e preserva a associação a descrições de erros. `Checkout.jsx` mostra a instrução. `ShippingCalculator.jsx` associa e apresenta o erro antes de focar o CEP. `app.css` mantém Calcular em uma linha, empilha os controles em largura relativa estreita e sincroniza cor do texto e fundo ao liberar o envio. |
| Média | Controles próximos às bordas dependiam das áreas seguras do navegador. O botão Remover na sacola completa tinha área estreita, e o nome de alguns estados do favorito era variável. | `index.html` e `app.css` reservam área segura no cabeçalho, nos conteúdos, no rodapé e nos diálogos quando o navegador fornece os insets. Remover usa alvo mínimo de 44 px. `FavoriteButton.jsx` mantém o nome estável com estado pressionado, e `QuantitySelector.jsx` e `Cart.jsx` explicitam teclado numérico. |

Os mecanismos centrais de Hero, Scroll Cinematográfico, Cards Premium, transição ao produto, Kinetic Typography, Final e Editorial Reveal estão fora do diff de animação. A abertura do menu só muda quando a cortina encobre um item focado pelo teclado. Regras de CEP, catálogo, preços, persistência e checkout demonstrativo conservam o comportamento comercial.

## Evidências

- [Antes e depois mobile a 320 × 568 e fonte a 200%](https://chatgpt.com/library?file_id=libfile_cdee7010b1248191b455ff2e0eef2b0b&account_id=personal). Atalho, menu e miniaturas.
- [Antes e depois desktop a 1440 × 900](https://chatgpt.com/library?file_id=libfile_b36c6b3314448191b39e7fd48e4788d9&account_id=personal). Checkout com indicação de obrigatoriedade e erros, incluindo o botão de frete.
- As imagens comparativas usam Chromium com os mesmos dados de teste e fotografias. Os cenários desktop e mobile correspondem a builds de produção.

## Testes e resultado

- `npm test` passou com 80 testes. `npm run build` e `GITHUB_PAGES=true npm run build` passaram. `git diff --check` passou.
- Chromium e WebKit percorreram oito rotas em 13 viewports, com fonte padrão e a 200%. Larguras 320, 360, 375, 390, 430, 600, 768, 844 paisagem, 901, 1024, 1280, 1440 e 1920 px. A medição comparou o `scrollWidth` da página e os limites dos controles selecionados. Zero casos de overflow horizontal da página nessa matriz.
- A jornada Home → Catálogo → Produto → Tamanho → Sacola → Checkout passou em 390 × 844, 844 × 390 e 1440 × 900 nos dois motores. O roteiro acionou atalhos, menu e galeria por teclado, Escape, foco de rota, CEP inválido e válido, primeiro campo inválido e foco na confirmação. A entrada em produto no retrato foi exercitada com toque emulado. Favoritos e remoção de variantes também passaram em verificações Chromium dedicadas.
- Axe-core 4.11.1, com tags WCAG A/AA de 2.0 a 2.2, retornou zero violações nos 14 estados consultados por motor. Estados incluem rotas, menu, drawer, galeria aberta e formulário com erros. O resultado automático complementa a verificação manual de foco, legibilidade e estados.
- Movimento reduzido foi conferido nas matrizes, no menu e na jornada paisagem. A foto principal manteve 362 × 453 px antes e depois de uma resposta de imagem atrasada em 450 ms, em ambos os motores. O cenário também abortou fotos secundárias e o módulo do catálogo para verificar que a página expõe a ação de recarga.

## Desempenho

| Build GitHub Pages | Base | Módulo 08 |
| --- | --- | --- |
| CSS principal em gzip | 15,74 kB | 16,03 kB |
| JS principal em gzip | 79,22 kB | 79,63 kB |

O ensaio de imagem atrasada registrou CLS 0 no Chromium nas duas versões. Essa amostra cobre o quadro do produto e a jornada testada. A intervenção de foco usa uma leitura geométrica quando o teclado muda de alvo, sem observador de layout, listener de scroll ou dependência nova no site. Os resultados descrevem a amostra local e não medem FPS ou latência de um iPhone.

## Limites e revisão em aparelho físico

A revisão depende de iPhone com Safari e aparelho Android com Chrome para aferir áreas seguras reais, teclado virtual e zoom, rotação com teclado aberto e barras do navegador em movimento. Os nomes, estados e descrições foram verificados no DOM e em consultas por papel e nome acessível, sem sessão de VoiceOver ou TalkBack no dispositivo. O teste de ampliação aplicou 200% ao tamanho de fonte raiz e não substitui testar o zoom ou os ajustes de acessibilidade do sistema. A auditoria tem escopo definido e não certifica conformidade integral.
