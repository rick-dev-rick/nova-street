# Contribuir para a NØVA STREET

## Fluxo de trabalho

1. Confira `git status --short` e preserve alterações em andamento. Em uma árvore limpa, atualize a base e abra uma branch por mudança.

   ```sh
   git fetch origin main
   git switch -c docs/atualizar-guia origin/main
   npm ci
   ```

2. Mantenha a alteração pequena e documente a razão. Consulte as [fontes do Design System](docs/NOVA-DESIGN-SYSTEM.md), a [arquitetura](docs/ARCHITECTURE.md) e as [regras de manutenção das cenas](docs/MOTION.md) antes de mexer em contratos compartilhados.
3. Rode a suíte e os dois builds. Confira o espaço em branco no diff antes de enviar o trabalho.

   ```sh
   npm test
   npm run build
   GITHUB_PAGES=true npm run build
   git diff --check origin/main
   ```

   Em PowerShell, veja o procedimento de variável de ambiente no [README](README.md#github-pages).
4. Use commits pequenos, com mensagens que descrevam o resultado. Mensagens como `fix: preservar a navegação ao interromper a transição` deixam o objetivo visível no histórico.
5. Abra o PR contra `main`. Informe o problema, o que mudou, os testes e ambientes usados, limitações e, quando a aparência mudar, capturas comparáveis. Integre somente após revisão e aprovação.

## Checklist de revisão

### Automatizado

- [ ] Suíte e builds padrão e Pages passam. Diff e referências da documentação foram conferidos.
- [ ] Persistência, estados inválidos e casos de recuperação têm cobertura adequada quando afetados.
- [ ] Dependências novas têm justificativa e o lockfile corresponde à mudança.

### Manual, quando aplicável

- [ ] Jornada e regras comerciais corretas, incluindo variações, quantidade, cotação local e confirmação demonstrativa.
- [ ] Sem regressão visual inesperada. Tokens, componentes e direção artística continuam coerentes com as fontes existentes.
- [ ] Verificação mobile e desktop, com rotação se o layout depender da orientação.
- [ ] Teclado, foco visível, Escape e retorno de foco em diálogos, texto ampliado e preferência de movimento reduzido.
- [ ] Layout permanece legível com imagens atrasadas ou indisponíveis, e rotas com erro oferecem recuperação.
- [ ] A documentação reflete o comportamento e distingue dados ilustrativos de capacidade efetiva.

### Pendências

- [ ] Declare o que foi verificado, o que não se aplica e o que depende de aparelho físico. Resultados de laboratório ou análise automática não demonstram conformidade integral com WCAG.
- [ ] Em PR exclusivamente documental, confirme o escopo pelo diff. Uma verificação de smoke é suficiente quando a árvore de execução e os builds continuam equivalentes.

## Descrição de PR

Organize o PR nas seções **Contexto**, **Alterações**, **Validação** e **Limitações**. Liste comandos e resultados reais e, quando houver evidência visual, descreva os dados, navegador, viewport e estado usados na comparação.
