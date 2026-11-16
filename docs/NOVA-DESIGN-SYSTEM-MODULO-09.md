# NØVA Design System · Módulo 09 · Experiência comercial

Base `0132899`. Escopo Home → Catálogo → Produto → Tamanho → Sacola → Checkout demonstrativo → Confirmação.

## Diagnóstico e correções

| Severidade | Evidência reproduzida na base | Correção |
| --- | --- | --- |
| Alta | O checkout bloqueava a simulação até preencher nome, e-mail, telefone e endereço. A confirmação usava os itens e o total da cotação, sem usar os quatro campos. | O checkout apresenta produtos, variantes, quantidades e valores por linha. O CEP é a única entrada da simulação. A opção **Usar CEP de exemplo** calcula a cotação imediatamente e libera a ação que segue os totais. |
| Alta | Apagar provisoriamente a quantidade M×2 gravava 1 e mudava o contador e o subtotal antes da próxima tecla. | O campo compartilhado trata o valor vazio como edição temporária. Ao sair do campo vazio, restaura a quantidade confirmada. Um número válido aplica a alteração e os limites existentes. |
| Média | A busca continuava local. Recarregar ou voltar pela navegação podia perder o termo e a lista filtrada. Limpar filtros mantinha a ordenação anterior. | `busca`, `categoria` e `ordem` compõem a URL. A primeira edição da busca cria uma entrada no histórico e a digitação contínua atualiza essa mesma entrada. Limpar restaura os destaques e foca a contagem. |
| Média | A pesquisa por “boné” retornava zero, embora a descrição do Urban Cap Redline contenha “Boné”. “nova cropped” também não encontrava “Nøva Cropped Tee”. | O catálogo pesquisa os termos sobre nome, categoria e descrição reais. Ignora caixa, acentos e a variante Ø. Os resultados continuam sendo filtrados e ordenados sobre o catálogo existente. |
| Média | O drawer apresentava apenas o valor da linha e a sacola completa apenas o preço unitário, ambos sem identificação. | As duas superfícies identificam preço unitário e subtotal da variante. Checkout, sacola e drawer usam o mesmo cálculo da linha. |
| Média | O limite de 9 caracteres no CEP impedia colar valores válidos com espaços externos. Alterar só a pontuação descartava uma cotação já calculada. | A validação aceita CEP com ou sem hífen e ignora espaços externos. A cotação continua ativa quando os oito dígitos são os mesmos. Um CEP diferente exige novo cálculo. Mantém o erro associado e o foco no campo inválido. |
| Baixa | A página do produto dizia “Troca simplificada”, sem política de troca ou operação real. A exigência do tamanho aparecia apenas na ajuda do botão. | A promessa foi removida e o grupo identifica o tamanho como obrigatório. Os valores, selos, dados das peças e recursos de galeria foram preservados. |

O carrinho e os favoritos continuam salvos pelo navegador. A confirmação deixa explícito que as peças continuam na sacola. CEP e confirmação ficam apenas em memória e são reiniciados na recarga. Voltar à sacola pelo link da confirmação permite rodar outra simulação. A cotação ainda usa R$ 19,90 abaixo de R$ 299, frete fictício grátis a partir desse limite e prazo ilustrativo de 5 a 8 dias úteis.

## Arquivos e escopo

- Catálogo e URL: `src/pages/Catalog.jsx`, `src/lib/catalog.js` e `tests/catalog.test.js`.
- Sacola e quantidade: `Cart.jsx`, `CartDrawer.jsx`, `CartLinePrices.jsx`, `QuantitySelector.jsx`, `src/lib/cart.js` e `tests/cart.test.js`.
- Simulação: `Checkout.jsx`, `ShippingCalculator.jsx`, `src/lib/shipping.js`, `tests/shipping.test.js` e testes de composição e estados. O validador de dados de contato foi removido junto com os campos.
- Produto e apresentação: `Product.jsx`, `src/styles/app.css` e `src/design-system/typography.css`. O CSS novo se limita ao resumo e às ações comerciais. As folhas de movimento, os Cards Premium, as rotas assíncronas e o mecanismo de transição do produto foram preservados. Nenhuma dependência ou chamada de API foi acrescentada.

## Evidências

- [Comparativo mobile, 390 × 844](https://chatgpt.com/library?file_id=libfile_749cc58267cc81919ee56049929eeeff&account_id=personal)
- [Comparativo desktop, 1440 × 900](https://chatgpt.com/library?file_id=libfile_530298a6fc2c8191ba2a6487364656e1&account_id=personal)

Cada comparativo reúne a busca por “boné”, a mesma edição de quantidade iniciada com M×2 e o checkout com duas peças e três variantes. Na captura do checkout novo, o CEP de exemplo já foi acionado.

## Validação

- `npm test` passou com 87 testes. `npm run build`, `GITHUB_PAGES=true npm run build` e `git diff --check` passaram.
- Chromium e WebKit validaram 320 × 568, 390 × 844 e 1440 × 900. A jornada incluiu digitação, histórico, combinação e limpeza de filtros, retorno à página de produto, favoritos e recarga. A sequência comercial adicionou Essential Oversized Tee em P e M e Studio Oversized Tee em G. Com M×2 o total foi R$ 529,60, com frete fictício gratuito. Foram verificadas quantidades independentes, limite de 99, edição vazia, sacola lateral e completa, persistência, CEP inválido e válido, exemplo, foco na confirmação e estado após recarga.
- A validação por teclado e toque incluiu a navegação entre rotas, diálogos da sacola e remoção de favorito. Foram verificadas ampliação da fonte raiz a 200%, sem overflow nas telas testadas, e preferência de movimento reduzido. Axe-core foi executado no checkout cotado e na confirmação a 390 px nos dois motores. Os quatro escaneamentos retornaram zero violações no conjunto aplicado de regras WCAG A/AA.
- Imagens indisponíveis, transição de página sem API, sacola e checkout vazios e produto inexistente foram reproduzidos. O bloqueio deliberado do arquivo assíncrono do catálogo mostrou a mensagem e a ação de recarregar.
- A leitura de nomes, foco e descrições foi verificada pelo DOM e pela árvore acessível. VoiceOver, TalkBack, teclado virtual e gestos no Safari do iPhone e no Chrome do Android precisam de verificação em aparelho físico.

## Desempenho

Tamanho em bytes gzip, medido com o mesmo nível de compressão sobre os builds de produção para GitHub Pages.

| Arquivo | Antes | Depois | Diferença |
| --- | ---: | ---: | ---: |
| CSS principal | 16.001 | 15.984 | −17 |
| JS principal | 78.821 | 79.372 | +551 |
| JS assíncrono do catálogo | 1.077 | 1.278 | +201 |
| JS assíncrono do checkout | 1.814 | 1.283 | −531 |

O custo adicional vem principalmente do estado de catálogo na URL, do campo reutilizável e do resumo de preço por variante. O checkout ficou menor com a remoção do formulário e da validação de contato. A medição é de transferência comprimida e não estima velocidade, renderização ou FPS em aparelho físico.
