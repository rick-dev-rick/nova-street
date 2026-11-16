# NØVA Final Experience · Etapa 07

A direção criativa abrange a chamada **SUA PRÓXIMA VERSÃO**, a assinatura e sua passagem ao rodapé da Home. A gravação do iPhone fornecida como referência mostra a chamada anterior em um painel escuro, seguida pelo rodapé. Essa gravação é de uma versão anterior à assinatura monumental integrada. A implementação parte de `46cb102`, com a assinatura do PR #15, a transição do PR #14 e a otimização mobile do PR #16.

| Ato | Experiência |
| --- | --- |
| **Revelação** | “Encontre seu estilo.” e “Vista NØVA.” crescem e se alinham em momentos diferentes da rolagem. O texto permanece legível durante a entrada. |
| **Profundidade** | No desktop, o retrato entra na composição à direita e recua lateralmente. Em retrato mobile, ele abre o painel pelo topo e percorre o quadro na vertical. Gradientes e contorno da moldura permanecem estáveis. |
| **Assinatura final** | A marca já integrada fecha a sequência em escala monumental. No celular em retrato, a assinatura ocupa duas linhas. |
| **Rodapé** | O fundo da chamada termina no mesmo tom que inicia a assinatura. A assinatura assenta e entrega o bloco de atendimento e informações demonstrativas ao fluxo da página. |

A foto editorial reaproveita o mesmo endereço usado em NØVA Lifestyle. Ela carrega sob demanda, tem dimensões declaradas e é decorativa. Os efeitos da chamada usam apenas `transform` com View Timelines CSS. O CTA permanece na posição do layout e, ao receber foco, estabiliza a manchete. A composição estática mantém texto, foto e CTA quando as timelines estão indisponíveis ou a preferência é por movimento reduzido. Com imagens bloqueadas, o fundo local mantém texto e botão disponíveis. A chamada, a assinatura e o rodapé são contíguos e não interceptam a rolagem.

## Validação

- `npm test` com 68 testes, builds padrão e GitHub Pages, e `git diff --check`.
- Chromium 153 e WebKit 26.5 em 320×568, 390×844, 844×390 e 1440×900. Conferidos o progresso reversível da fotografia, da tipografia, da assinatura e das cenas anteriores, além de movimento reduzido, texto a 200% e ausência de overflow horizontal. Navegação do produto até o checkout demonstrativo nos dois motores.
- Em 390×844, CTA operado por teclado com imagens bloqueadas e fallback sem View Timelines. O Chromium também recebeu gestos emulados lentos, rápidos e reversos.
- Revisão visual da sequência com captura em desktop e mobile, com a continuidade inspecionada até o rodapé. A versão corrigida ainda precisa de conferência num iPhone físico. O vídeo é uma demonstração de composição com dimensões emuladas.
