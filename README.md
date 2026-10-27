# NØVA STREET

Case de e-commerce streetwear unissex para o portfólio rick_dev.

## Executar

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

`npm test` executa os testes do carrinho e `npm run build` gera `dist`.

## Fluxo

Home → catálogo com busca e categorias → produto com tamanho → sacola com edição de quantidade e remoção → checkout com confirmação demonstrativa.

React + Vite + React Router; componentes separados, catálogo local e CSS responsivo. O carrinho é salvo no navegador deste dispositivo e restaurado após recarregar ou reabrir o site. Se o armazenamento estiver bloqueado, a loja continua funcionando em memória. Preços vêm sempre do catálogo atual. Não há sincronização entre dispositivos. Sem backend, cadastro ou pagamento. Dados do formulário não são enviados. Frete não é calculado. As imagens editoriais são carregadas do Unsplash e precisam de conexão.

No GitHub Pages, a build usa `/nova-street/` e navegação com `#`, sem depender de fallback de rotas. Outras hospedagens usam as rotas normais e precisam de fallback para `index.html`.

## Informações de produto

Cada peça oferece foto editorial, detalhe recortado da mesma imagem e ampliação em janela com suporte a Esc. Composição, caimento, cuidados e tabelas de medidas são fictícios e identificados como demonstrativos. Para uma loja comercial, substitua por fotos e especificações verificadas do fornecedor.

## Publicar no GitHub Pages

Repositório previsto: `rick-dev-rick/nova-street`, branch `main`.

1. No GitHub, em Settings → Pages → Source, escolha **GitHub Actions**.
2. O workflow `.github/workflows/deploy.yml` instala dependências, testa e publica a build em cada push para `main`.
3. Consulte a aba Actions para verificar a publicação. O endereço esperado é `https://rick-dev-rick.github.io/nova-street/`.

O endereço só fica disponível depois da configuração do Pages e da execução bem-sucedida do workflow. No Pages, as rotas terão formato `#/catalogo` e `#/produto/...` para permitir acesso direto e recarregamento.
