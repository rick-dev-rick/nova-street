# NØVA Design System — Módulo 04

A implementação partiu de `0a97233`, com o módulo 03 integrado à `main`. A revisão encontrou duas chamadas vermelhas para o catálogo na Home, duas saídas para o mesmo destino em Favoritos vazio e uma busca sem resultados que exigia desfazer filtros manualmente. Na página de produto, seleção e compra apareciam misturadas às informações editoriais. No checkout, o aviso aparecia antes do título da página.

## Prioridades e chamadas

| Papel | Aplicação |
| --- | --- |
| Ação principal `.btn-primary` | Ver a coleção no hero, adicionar à sacola, avançar para o checkout e simular pedido |
| Ação secundária `.btn-secondary` | Explorar o drop e retomar a navegação no fim da Home |
| Link contextual `.text-link` | Abrir a listagem associada a uma seção. O link de novidades abre o catálogo já com a ordenação correspondente |

Cada área dá maior destaque à ação que faz a jornada avançar. A faixa de frete ficou logo abaixo do hero, com fundo neutro, condição de R$ 299 e indicação de checkout demonstrativo. O Lifestyle recupera a alternância de superfícies na parte final da Home.

## Agrupamento e leitura rápida

- O catálogo reúne categorias, busca e ordenação em um painel identificado. A contagem continua acima dos resultados e informa mudanças.
- A página de produto apresenta título, preço e descrição antes do grupo de compra. Dentro do grupo ficam tamanho, quantidade, ação principal e favoritos. O botão mantém o mesmo rótulo e a instrução informa o que falta para habilitá-lo. Composição, cuidados e medidas ficam na seção de detalhes.
- A sacola identifica a lista de itens e usa uma chamada que nomeia o destino. No checkout, o título e o aviso demonstrativo precedem os grupos **Dados do pedido** e **Resumo e frete**. Os itens são apresentados como lista. Ao concluir, a página volta ao topo e o foco passa ao título da confirmação.

## Estados vazios

O componente `EmptyState` usa título, contexto quando necessário e uma saída. Ele é aplicado no catálogo sem resultados, nos favoritos, na sacola e no checkout vazios e nas rotas de produto ou página inexistente. No catálogo, **Limpar filtros** limpa a busca e a categoria, preserva a ordenação e leva o foco de volta à contagem de resultados.

## Verificação

- `npm test` executa 47 testes, incluindo três de hierarquia, composição e recuperação de busca vazia.
- `npm run build`, `GITHUB_PAGES=true npm run build` e `git diff --check` passaram.
- Chromium verificou nove janelas de **320 × 568** a **1440 × 1000**. Foram exercitados o fluxo da Home, estados vazios, recuperação dos resultados, escolha de tamanho, galeria, favoritos, sacola, cálculo de frete e confirmação do checkout demonstrativo.
- A fonte-base foi ampliada a 200% no Chromium para verificar o layout das seis páginas principais. Os testes sobre fotografias usaram fundo branco para avaliar o contraste do tratamento de texto.

Safari, Firefox e leitores de tela permanecem sem validação neste módulo. O módulo 05 aguarda autorização.
