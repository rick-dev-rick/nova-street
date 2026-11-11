# NØVA Design System — Módulo 05

Base de implementação `ae77916`, com o módulo 04 integrado à `main`. As variantes abaixo reutilizam as cores, a tipografia e os estilos existentes.

| Componente | Variantes e uso |
| --- | --- |
| `Button` e `ActionLink` | Ação primária, secundária, textual e sem classe visual. Use botão para executar e link para navegar. O botão usa `type="button"` por padrão |
| `InputField` e `SelectField` | Campo nativo com rótulo, aplicado à busca, ordenação e dados do checkout |
| `ChoiceButton` | Seleção com `aria-pressed` em categoria, tamanho e visualização da galeria |
| `QuantityControls` | Quantidade editável no produto e contador com botões na sacola lateral. Ambos respeitam o intervalo de 1 a 99 |
| `EditorialCard` e `ProductCard` | Categoria e história editorial usam o mesmo destino por categoria. O card comercial mantém preço, selo e favoritos |
| `CategoryNavigation` | Navegação visível no desktop e menu recolhível até 600 px. Escape fecha e devolve o foco ao botão |
| `Dialog` | Diálogo nativo para galeria e sacola. Clique no fundo fecha o painel. O conteúdo e o preenchimento internos seguem interativos |
| `Feedback` | Informação, aviso, erro com `role="alert"` e sucesso com `role="status"`, usados no frete, produto e checkout |
| `LoadingStatus` | Mensagem no carregamento inicial de Catálogo, Produto e Checkout. Cada rota é carregada separadamente. A estrutura da loja continua visível durante a espera e em caso de falha |
| `SizeTable` | Tabela semântica de medidas, com cabeçalhos por linha e coluna e área rolável acessível pelo teclado |

Na navegação interna, o roteador pode manter a página anterior enquanto a próxima carrega. O indicador de carregamento foi validado na abertura direta de uma rota com o arquivo atrasado. Uma falha de carregamento mantém cabeçalho e rodapé disponíveis e oferece recarregar a página.

## Verificação

- `npm test` executa 50 testes. Três novos verificam o uso de componentes compartilhados nos fluxos da loja.
- Build local, build para GitHub Pages e `git diff --check`.
- Chromium em nove janelas, de 320 × 568 a 1440 × 1000. Verificados menu por teclado e histórico, campos, filtros, galeria, sacola, tabela de medidas, mensagens de frete e checkout demonstrativo.
- O teste de carregamento atrasou e, em um caso separado, bloqueou o arquivo do catálogo. A mensagem de espera, a recuperação por recarga e a permanência do cabeçalho e do rodapé foram verificadas.

Safari, Firefox e leitores de tela permanecem sem validação neste módulo. O módulo 06 aguarda autorização.
