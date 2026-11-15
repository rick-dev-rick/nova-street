# NØVA Motion Showcase 2.0 · Etapa 02.2 · Evidência do iPhone

A revisão parte da `main` em `900d8d4` e incorpora a correção mobile do [PR #12](https://github.com/rick-dev-rick/nova-street/pull/12). O complemento concentra-se na passagem de **NO RULES. JUST STREET.** para **BEST SELLERS**. A abertura do Hero 2.0, a fixação no desktop e as rotas comerciais continuam na implementação existente.

## Diagnóstico reproduzido

A gravação original tem 14,5 segundos. No início e na rolagem de volta para o drop, a faixa escura ocupa boa parte da área antes de BEST SELLERS. Por volta de 8 segundos, aparecem as faixas diagonais sobre as fotos da primeira fileira.

| Sintoma | Verificação em navegador | Correção |
| --- | --- | --- |
| Trecho preto amplo após o palco | Em 402×670, Chromium e WebKit mediram 1.166 px na seção, 558 px no palco e 608 px de diferença. A seção reservava `174svh` para o palco `sticky`. Após a soltura, o trecho final escuro ficava visível de novo na rolagem reversa. | O PR #12 já recolocava o palco no fluxo mobile. O complemento elimina também sua altura mínima proporcional à viewport. O painel cresce com o conteúdo e a passagem termina a 24 px do CTA nas dimensões medidas. |
| Handoff entre seções sem continuidade | No PR #12, a viewport de 402×670 ainda tinha 43 px entre o CTA e o fim do painel, seguidos de 64 px antes do cabeçalho de BEST SELLERS. | A pausa caiu de 107 para aproximadamente 52 px. Um corte vermelho na linha de passagem e o filete do cabeçalho compartilham o mesmo progresso de rolagem. |
| Máscaras escuras surgindo sobre as fotos | A `main` usava uma View Timeline por card para mover um pseudoelemento listrado. Na correção inicial, o progresso mobile ainda movia uma faixa escura sobre a foto. | BEST SELLERS mobile move o próprio enquadramento. As fotos alternam o sentido da câmera, começando a 118% e estabilizando a 100%. A revelação preserva legenda, preço, favoritos e navegação. |
| Composição pouco estável na volta | Na versão original, a saída do palco e as revelações fotográficas seguiam faixas de animação distintas. Ao inverter o gesto, a reserva do palco e as máscaras reapareciam. | A passagem e o título evoluem juntos. As fotografias usam o progresso dos cards, sem transição temporal acumulada. Voltando à mesma posição, as transformações testadas retornam ao mesmo estado. |

O recorte do palco fica na fotografia decorativa. A composição mobile conserva o título e a ação no fluxo com texto ampliado. A intervenção não depende das View Timelines para renderizar a passagem mobile, nem usa bibliotecas ou mídia novas.

## Validação

- 63 testes com `npm test`. Builds padrão e GitHub Pages e `git diff --check` concluídos.
- Comparação do arquivo original com o build corrigido capturado no WebKit em Linux, em 402×665. Os trechos foram alinhados aproximadamente pela posição da passagem entre as seções. A coluna original conserva o conteúdo visível da gravação do iPhone. Captura comparativa sem áudio.
- Regressões da passagem em Chromium 153 e WebKit 26.5, em 320×568, 375×667, 390×844, 402×670, 430×932, 844×390 e 932×430. Medidos o espaçamento do painel, o movimento associado do filete e do cabeçalho, a reversão da foto, a ausência de máscara sobre os produtos, o foco e o movimento reduzido.
- Chromium com toque emulado, movimentos lentos, rápidos e reversos na passagem, além de redução isolada da viewport visual. As sete cenas da Home também passaram na regressão geral em Chromium e WebKit, com texto a 200%, imagens bloqueadas e fallback sem `ResizeObserver`.
- Regressão desktop em 1024×850 e 1440×900, com fixação, teclado e jornada até o checkout demonstrativo.

## Limites

A gravação é evidência do problema em aparelho físico. A versão corrigida foi examinada em motores rodando no Linux com viewport emulada. O gesto, a barra dinâmica do Safari e a composição em um iPhone físico ainda precisam ser verificados antes da aprovação visual. A redução simulada da viewport não reproduz a interface do Safari. O vídeo compara enquadramento e legibilidade, sem medir FPS.
