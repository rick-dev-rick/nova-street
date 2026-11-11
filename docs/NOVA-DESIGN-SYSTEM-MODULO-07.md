# NØVA Design System — Módulo 07

Base `96a8c00`, com o módulo 06 integrado à `main`. Antes deste módulo, a galeria e os cards usavam durações fixas, enquanto as demais interações eram instantâneas.

| Duração | Aplicação |
| --- | --- |
| 150 ms | Estados de botões, bordas e seletores, mudança no coração e contador da sacola |
| 250 ms | Deslizamento do menu mobile, entrada e saída da sacola e galeria, entrada do conteúdo de uma nova rota |
| 350 ms | Aproximação da imagem nos cards e troca de visualização da galeria |

As durações vêm de `--nova-motion-fast`, `--nova-motion-normal` e `--nova-motion-slow`. A curva `--nova-ease-standard` é compartilhada. A troca de rota usa um deslocamento de 4 px. Menu, sacola e galeria usam deslocamento, e o fundo dos diálogos muda de opacidade. Textos e controles mantêm a opacidade integral durante o movimento.

O menu desliza a partir do cabeçalho até 600 px. Ao fechar, os links saem imediatamente da navegação por teclado enquanto a saída visual termina. A sacola desliza pela direita e a galeria aparece com um deslocamento vertical curto. Os diálogos nativos continuam responsáveis por Escape, foco e fechamento. Navegadores sem suporte às transições discretas mantêm abertura e fechamento imediatos.

Em `prefers-reduced-motion: reduce`, transições, animações, aproximação decorativa dos cards, escala do coração e rolagem suave são desativadas. O zoom escolhido na galeria continua disponível.

## Verificação

- `npm test` executa 56 testes. Três novos conferem tokens, regras de entrada e saída e movimento reduzido.
- `npm run build`, `GITHUB_PAGES=true npm run build` e `git diff --check`.
- No Chromium em **320 × 568** e **1440 × 1000**, foram verificadas as transições e durações em execução via `getAnimations()`. Foram testados entrada e saída do menu, sacola e galeria, troca de rota, contador, favoritos, cards e retorno do foco.
- As duas janelas também foram testadas com movimento reduzido. Os controles continuaram operáveis e nenhuma animação ficou em execução nas interações avaliadas.
- A suíte de navegação percorreu nove janelas de 320 a 1440 px, incluindo catálogo, produto, favoritos, sacola, cálculo de frete e checkout demonstrativo.

Para conferir manualmente, rode `npm run dev`. Em 320 px, abra o menu com Enter, use Tab para alcançar o primeiro link e feche com Escape. Abra a sacola e a foto de um produto e repita o fechamento. Ative movimento reduzido no sistema ou no navegador e repita as interações.

Safari, Firefox e dispositivos físicos permanecem sem validação neste módulo. O módulo 08 aguarda autorização.
