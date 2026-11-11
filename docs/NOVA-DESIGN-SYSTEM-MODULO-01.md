# NØVA Design System — Módulo 01

A auditoria partiu do commit `3f81307`. Os tokens de base já estavam importados, mas várias cores ainda eram declaradas diretamente em `app.css`. A configuração escura ainda não era aplicada nas páginas. O nome da marca era repetido no cabeçalho e no rodapé, e os favoritos misturavam um caractere tipográfico com um ícone SVG.

## Paleta e papéis

| Papel | Tema claro | Tema escuro |
| --- | --- | --- |
| Fundo | Branco `#ffffff` | Preto `#0a0a0a` |
| Superfície secundária | Cinza quente `#f5f5f3` | Carvão `#191919` |
| Texto e texto secundário | `#0a0a0a` e `#686868` | `#ffffff` e `#d2d2d2` |
| Borda decorativa e borda de controle | `#e6e6e6` e `#858585` | `#454545` e `#858585` |
| Ação principal | Vermelho NØVA `#d71920` com texto branco | Vermelho NØVA `#d71920` com texto branco |
| Acento de texto e foco | Vermelho profundo `#b90f16` | Vermelho claro `#ff8f93` |

Os componentes usam papéis como `--nova-color-text-muted` e `--nova-color-action`. O valor de cada papel vem da paleta em `src/design-system/tokens.css`. Separar o vermelho do botão do vermelho usado como texto permite manter a identidade e ajustar o contraste de cada aplicação.

O tema claro é o padrão da loja. O hero, o destaque do drop, a chamada final e o rodapé aplicam `data-nova-theme="dark"`. Os papéis mudam dentro dessas áreas por herança do CSS. A preferência de tema do dispositivo não altera a composição editorial.

## Estados de interface

Use a classe `feedback` com `data-feedback` para aplicar texto, fundo e faixa lateral de um estado. Inclua uma mensagem que identifique o estado e a próxima ação quando houver.

| Estado | Aplicação |
| --- | --- |
| Sucesso | Produto adicionado à sacola e cotação de frete calculada |
| Alerta | Checkout aguardando a simulação de frete |
| Erro | CEP inválido com mensagem, borda e `aria-invalid` |
| Informação | Aviso de checkout demonstrativo |

Para texto corrente, use pares com contraste de pelo menos **4,5:1**. Para limites de controles, foco e indicadores visuais essenciais, use **3:1** contra as cores adjacentes. A borda suave serve a divisores decorativos. Links ativos de categoria recebem sublinhado e `aria-current`. Favoritos usam contorno ou preenchimento do coração, com `aria-pressed` no botão.

Referências do W3C: [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste de elementos não textuais](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) e [uso de cor](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

## Marca, ícones e fotografia

- `BrandWordmark` compartilha a assinatura **NØVA STREET** entre o cabeçalho e o rodapé. O símbolo **Ø** permanece no estado vazio da sacola e ganhou um favicon com a paleta escura da marca.
- `HeartIcon` usa traço uniforme e `currentColor`. A versão preenchida indica seleção. O controle fornece o nome acessível, e o desenho decorativo fica oculto para tecnologias assistivas.
- A fotografia editorial do hero e do Lifestyle mantém o preto e branco. As fotos de produto e de categoria mantêm o tratamento original. Os gradientes compartilhados escurecem o fundo das legendas, o destaque do drop usa textura diagonal discreta e o foco sobre fotografias combina anéis branco e preto.

## Validação

- `npm test` executa 39 testes. Quatro verificam os pares de contraste de texto, feedback, controles e foco nos dois temas.
- `npm run build` e `GITHUB_PAGES=true npm run build` compilam a loja. A segunda configuração também verifica o caminho `/nova-street/nova-mark.svg` no HTML gerado.
- Chromium em **320 × 800**, **601 × 850** e **1440 × 1000** verificou o tema das áreas, favicon, foco por teclado, categoria ativa, favoritos, galeria, sacola, CEP válido e inválido e confirmação do checkout demonstrativo. Para verificar o contraste sobre fotos, um fundo branco substituiu as imagens no teste. O ajuste do gradiente do Lifestyle acompanhou a altura da legenda quando o texto quebrou em mais linhas.
- `git diff --check` verifica problemas de formatação no diff.

A validação de contraste deste módulo cobre os pares testados. Uma avaliação completa de acessibilidade com leitores de tela, zoom e outros navegadores permanece fora dessa verificação. A implementação do módulo 02 aguarda autorização.
