# NØVA Design System — Módulo 06

Base `c43a484`, com o módulo 05 integrado à `main`. O módulo aplica estados aos controles existentes e trata os caminhos de recuperação na loja demonstrativa.

| Estado | Comportamento |
| --- | --- |
| Hover | Filtros, tamanhos, galeria e favoritos destacam a borda em dispositivos com ponteiro. Links textuais recebem o acento da marca |
| Foco e pressionamento | O contorno de teclado continua visível. O pressionamento tem destaque interno, enquanto a seleção persistente usa `aria-pressed` |
| Desabilitado | Controles indisponíveis usam as cores de estado e o atributo nativo `disabled`. Produto e checkout explicam o motivo ao lado da ação |
| Carregando | As rotas carregadas sob demanda mostram o indicador também durante navegação interna lenta, preservando cabeçalho e rodapé |
| Validação | Checkout mostra mensagens associadas aos campos, mantém seus rótulos e foca o primeiro erro. O botão **Ir para o CEP** leva ao campo de frete. Um CEP inválido mantém o foco no próprio campo |
| Indisponibilidade | O limite demonstrativo de 99 unidades é calculado por produto e tamanho. Ao atingir o limite, a quantidade e a compra são bloqueadas para aquele tamanho. Se o botão de compra ficar desabilitado ao abrir a sacola, fechar o diálogo devolve o foco ao tamanho selecionado |
| Navegação | Ao mudar o caminho da rota, o foco vai ao conteúdo principal e a página volta ao topo. Alterações apenas nos parâmetros do catálogo preservam o foco local |

O checkout continua sendo uma simulação. A validação de e-mail reaproveita o tipo nativo do campo. Nome, telefone e endereço precisam estar preenchidos. Mensagens individuais ficam em `aria-describedby` para serem lidas com os campos.

## Verificação

- `npm test` executa 53 testes. Três novos cobrem capacidade da sacola por variante, ordem e conteúdo dos erros e dados válidos.
- Build local, build para GitHub Pages e `git diff --check`.
- Chromium em nove janelas, de 320 × 568 a 1440 × 1000. Exercitados navegação, teclado, retorno do foco, seleção, favoritos, galeria, sacola, frete e confirmação.
- No checkout, o teste enviou dados vazios, conferiu o foco e a descrição acessível, corrigiu um e-mail inválido e concluiu a simulação.
- O teste atrasou o arquivo de Catálogo em uma navegação interna para verificar o carregamento. Em 320 × 568, partiu de 98 unidades, adicionou a última permitida e verificou o retorno de foco ao tamanho ao fechar a sacola com Escape. Outro tamanho continuou disponível.

Safari, Firefox e leitores de tela permanecem sem validação neste módulo. O módulo 07 aguarda autorização.
