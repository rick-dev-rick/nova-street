# NØVA STREET · Módulo 10 · Front-end Architecture & Engineering

Execução independente na branch `engineering/modulo-10-recovery`, a partir de `4df2aedac8947ce72740378a5cda15908becb276`. Clone limpo confirmado com `git status --short` e `git rev-parse HEAD`. A base passou em 87 testes após `npm ci`. Ambiente de verificação com Node 24.22.1, npm 11.9.0, Git 2.52.0, Chromium 153.0.8010.0 e WebKit 26.5.

## Achados

| Severidade | Reprodução na base e impacto | Correção e risco |
| --- | --- | --- |
| Alta | Uma leitura bloqueada com escrita permitida substituiu a sacola e os favoritos válidos por `[]`. | A hidratação distingue leitura bloqueada de dado vazio ou malformado. O estado inicial não é gravado, e a sessão fica em memória se o conteúdo anterior não pôde ser lido. Chaves, esquema e limites continuam compatíveis. Regressões se concentrariam em hidratação e gravação de uma edição posterior. |
| Alta | Uma rolagem entre o clique e o callback da View Transition deixava o usuário no catálogo com o clique já consumido. | Interromper o efeito limpa suas marcas e listeners. O callback ainda navega sem efeito compartilhado se a rota e a entrada do histórico forem as mesmas e a ativação ainda for a mais recente. Uma alteração de histórico tem prioridade. O risco é uma navegação atrasada após outra ação, coberto por teste de histórico. |
| Média | Uma entrada já enfileirada para um card removido iniciava preload e desconectava o observador de cards que ainda estavam na tela. | A chamada processa somente alvos registrados. O observador é desconectado ao remover o último alvo ou ao resolver o módulo. A margem de 240 px e os gatilhos por foco e ponteiro continuam iguais. |
| Média | Um HTTP 503 transitório no chunk do catálogo recuperou na mesma aba do Chromium, com respostas 503 → 200. O WebKit não fez nova requisição do chunk ao recarregar, mas o endereço abriu em outra aba do mesmo contexto. | A tela de falha mantém a ação de recarga e inclui a recuperação verificada em outra aba. O ensaio mostra a ausência de nova requisição na mesma aba. O mecanismo interno do WebKit não foi isolado, e a intervenção não adiciona retries automáticos nem invalidação de cache. |

## Arquivos

- Sacola e favoritos: `App.jsx`, `FavoritesContext.jsx`, `useStoredList.js`, `read-stored-array.js`, `cart-storage.js` e `favorites.js`.
- Navegação e preload: `ProductCard.jsx`, `product-flight.js`, `product-route.js` e `RouteErrorBoundary.jsx`.
- Regressões: `cart-storage.test.js`, `favorites.test.js`, `product-flight.test.js` e `product-route.test.js`.

## Evidências

- `npm test`: 92/92. Build padrão, build para GitHub Pages e `git diff --check` concluídos.
- Jornada Home → Catálogo → Produto → Tamanho → Sacola → Checkout → Confirmação em Chromium e WebKit em 320 × 568, 390 × 844, 844 × 390 e 1440 × 900. Incluiu histórico de busca, recarga da sacola, favoritos, Escape em menu e galeria, CEP inválido, teclado, fonte a 200% e movimento reduzido.
- Falhas de leitura e gravação foram injetadas separadamente nos dois motores. As alterações em memória funcionaram e os registros anteriores ficaram intactos. Uma edição em memória sob falha de armazenamento não é garantida na próxima recarga.
- A ordem clique → roda → callback foi controlada com um substituto da API no navegador. Na base, o produto não abriu. Na revisão, abriu nos dois motores. A regressão Node verifica também cancelamento por histórico e limpeza das marcas. Isso valida o fluxo da aplicação sob a ordem reproduzida, sem medir a animação nativa.
- [Capturas de paridade visual](https://chatgpt.com/library?file_id=libfile_66a14faef52c81919aa9d8d9ad0ad6ad&account_id=personal). Em cada motor, 390 × 844 e 1440 × 900, foram comparadas Hero, Categorias, Novidades, Mais Vendidos, Lifestyle, Kinetic Typography, Catálogo, Produto, Sacola e Checkout. Os 40 pares tiveram zero diferenças de pixels nos enquadramentos testados com movimento reduzido e os mesmos dados e fotos.

## Desempenho

Build GitHub Pages, valores gzip do Vite.

| Bundle | Base | Revisão |
| --- | ---: | ---: |
| JS principal | 80,14 kB | 80,36 kB |
| CSS principal | 16,01 kB | 16,01 kB |
| Catálogo assíncrono | 1,28 kB | 1,28 kB |
| Produto assíncrono | 4,10 kB | 4,10 kB |
| Checkout assíncrono | 1,27 kB | 1,27 kB |

Em Chromium headless a 390 × 844, três amostras por versão repetiram uma rolagem controlada de ida e volta, deslocamento de 1.450 px e duração de 1,1 s. O P95 mediano entre quadros permaneceu em 16,7 ms. O layout acumulado mediano ficou em 1,61 → 1,26 ms. A amostra é curta e não sustenta uma conclusão de ganho de desempenho.

A verificação usou navegadores headless. Safari no iPhone, Chrome no Android físico, gestos nativos e comportamento de cache nesses aparelhos permanecem pendentes. Os estilos de campanha, o catálogo, os preços, as regras comerciais e a publicação foram preservados.
