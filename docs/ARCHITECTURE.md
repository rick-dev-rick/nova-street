# Arquitetura e jornada comercial

## Aplicação e rotas

A [entrada React](../src/main.jsx) inicia o app em `StrictMode`. O [App](../src/App.jsx) define as rotas, mantém a sacola, o CEP aplicado e a abertura da sacola lateral. O [Layout](../src/components/Layout.jsx) inclui cabeçalho, rodapé, sacola lateral e o conteúdo da rota. Mudanças de caminho movem o foco para o conteúdo e levam a rolagem ao topo. Alterar somente a busca do catálogo mantém o caminho e o contexto da página.

| Caminho | Página |
| --- | --- |
| `/` | [Home](../src/pages/Home.jsx), com vitrine e campanhas |
| `/catalogo` | [Catálogo](../src/pages/Catalog.jsx), com busca, categorias e ordenação |
| `/produto/:id` | [Produto](../src/pages/Product.jsx), com galeria, informações e tamanhos. Um ID ausente tem estado próprio |
| `/favoritos` | [Favoritos](../src/pages/Favorites.jsx), com seleção local |
| `/carrinho` | [Sacola](../src/pages/Cart.jsx), com edição de quantidade e cotação |
| `/checkout` | [Checkout](../src/pages/Checkout.jsx), com revisão e confirmação demonstrativa |
| Rota desconhecida | Estado de página não encontrada com retorno à Home |

O [Vite](../vite.config.js) define a base e o roteador por build. O padrão usa `BrowserRouter` e fallback do servidor para `index.html`. GitHub Pages usa `HashRouter` e base `/nova-street/`. Para testar um link direto no Pages, abra `/nova-street/#/catalogo`. No servidor padrão, abra `/catalogo`.

Catálogo e checkout carregam sob demanda. [ProductRoute](../src/components/ProductRoute.jsx) usa a página de produto já carregada se ela estiver disponível ou carrega o chunk sob demanda. [Suspense](../src/components/Layout.jsx) mostra o [status de carregamento](../src/design-system/LoadingStatus.jsx). A [barreira de erro da rota](../src/components/RouteErrorBoundary.jsx) mostra uma mensagem e oferece recarregar a página. A troca de caminho reinicia esse estado.

## Componentes e fontes de verdade

- [Dados de catálogo](../src/data/products.js) definem IDs, categorias, fotos, preços, tamanhos e data de lançamento. [Detalhes](../src/data/product-details.js) complementam o catálogo com informações demonstrativas, relacionadas por ID.
- [Design System](NOVA-DESIGN-SYSTEM.md) provê tokens, tipografia e controles compartilhados. [ProductCard](../src/components/ProductCard.jsx), [FavoriteButton](../src/components/FavoriteButton.jsx), [QuantitySelector](../src/components/QuantitySelector.jsx), [CartLinePrices](../src/components/CartLinePrices.jsx), [ShippingCalculator](../src/components/ShippingCalculator.jsx) e [OrderTotals](../src/components/OrderTotals.jsx) compartilham comportamentos entre superfícies.
- O [contexto de favoritos](../src/context/FavoritesContext.jsx) expõe IDs e a operação de alternar uma peça. A sacola vive em `App` e alimenta produto, drawer, sacola completa e checkout. As duas coleções usam [useStoredList](../src/hooks/useStoredList.js).

## Home → confirmação demonstrativa

1. **Encontrar uma peça.** [catalog.js](../src/lib/catalog.js) lê `categoria`, `busca` e `ordem` da URL. A busca combina os termos do nome, da categoria e da descrição, ignora caixa e diacríticos e equipara Ø a O. A categoria restringe o conjunto. A ordenação oferece Destaques, Menor preço, Maior preço e Novidades. A edição contínua de uma busca substitui a entrada corrente após a primeira alteração. Limpar restaura os padrões e move o foco à contagem de resultados.
2. **Inspecionar e escolher tamanho.** [ProductGallery](../src/components/ProductGallery.jsx) oferece foto editorial, recorte e ampliação em diálogo. [ProductInformation](../src/components/ProductInformation.jsx) mostra informações fictícias, inclusive tabela de medidas quando aplicável. Adicionar à sacola exige um tamanho.
3. **Revisar sacola.** [cart.js](../src/lib/cart.js) identifica linhas por produto e tamanho. Um novo item com a mesma combinação soma à linha existente. Tamanhos diferentes permanecem independentes. O limite é 99 unidades por variante. Deixar a quantidade temporariamente vazia mantém a quantidade anterior até uma edição válida. O subtotal da linha é preço × quantidade, arredondado a duas casas, e o subtotal da sacola soma as linhas.
4. **Simular frete.** [shipping.js](../src/lib/shipping.js) valida localmente oito dígitos, com hífen opcional, e rejeita sequência de dígitos iguais. O botão de exemplo usa `12345-678`. Com subtotal positivo, o cálculo cobra R$ 19,90 abaixo de R$ 299, simula gratuidade a partir desse limite e informa prazo ilustrativo de 5 a 8 dias úteis. Sacola e checkout compartilham o CEP aplicado e a cotação acompanha o subtotal. O CEP e a confirmação ficam em memória.
5. **Confirmar.** A simulação é liberada com cotação válida. A confirmação guarda o total cotado enquanto a tela permanece montada. Os itens continuam na sacola. Recarregar reinicia o CEP e a confirmação. A operação inteira é local e demonstrativa, sem cadastro, processamento de pedidos, transportadora ou pagamento.

## Persistência e garantias do Módulo 10

| Chave | Conteúdo |
| --- | --- |
| `nova-street:cart:v1` | Registros de produto, tamanho e quantidade. Preço e dados da peça vêm do catálogo atual ao restaurar. |
| `nova-street:favorites:v1` | IDs de produtos válidos. A leitura remove duplicatas e ignora produtos ausentes do catálogo. |

[Cart storage](../src/lib/cart-storage.js), [favoritos](../src/lib/favorites.js) e [leitura compartilhada](../src/lib/read-stored-array.js) tratam dados malformados e exceções do navegador. A montagem não grava o estado inicial. Quando a leitura falha, a coleção funciona em memória durante a sessão sem tentar sobrescrever o registro anterior. Uma falha de escrita também mantém a edição em memória. Essas edições podem se perder ao recarregar. O armazenamento é por navegador e origem, sem sincronização remota.

## Pré-carregamento e transição

[ProductCard](../src/components/ProductCard.jsx) pede o pré-carregamento do produto por foco, entrada do ponteiro e aproximação da área visível. [product-route.js](../src/lib/product-route.js) compartilha a importação. Entradas atrasadas de cards já removidos são ignoradas. O observador é liberado sem alvos ou quando o módulo fica disponível.

[product-flight.js](../src/lib/product-flight.js) só inicia o efeito para navegação normal em mesma aba, com módulo pré-carregado, fotografia visível, suporte à View Transitions API e movimento permitido. Os demais caminhos seguem pelo React Router. Interromper a animação libera os estilos e listeners do efeito. O clique aceito ainda efetua a navegação enquanto corresponde à rota, entrada de histórico e ativação vigentes. A direção visual e os demais sistemas estão no [guia de movimento](MOTION.md).

## Limitações e pendências

- O [Módulo 10](NOVA-DESIGN-SYSTEM-MODULO-10.md) reproduziu HTTP 503 transitório no chunk do catálogo. O Chromium recuperou após recarga. No WebKit headless, a recarga na mesma aba não solicitou o chunk novamente. Abrir o endereço em outra aba recuperou o catálogo. O mecanismo interno não foi isolado. A orientação da tela de erro registra o caminho observado.
- As fotografias remotas dependem do Unsplash e de conexão. O ativo de campanha local e a fonte empacotada seguem o build.
- Safari no iPhone e Chrome no Android físicos ainda precisam de verificação, sobretudo teclado virtual, gestos nativos, VoiceOver, TalkBack e cache específico do dispositivo. Resultados em Chromium e WebKit headless não constituem certificação de acessibilidade ou cobertura de todos os aparelhos.
