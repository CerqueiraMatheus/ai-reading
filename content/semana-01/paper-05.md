---
title: "InstructGPT (RLHF) — Mergulho Profundo"
---

### O que é o InstructGPT?

O InstructGPT é o artigo que introduz o **RLHF** (Reinforcement Learning from Human Feedback) — a técnica que transformou modelos de linguagem em assistentes úteis. É a base do que tornou o ChatGPT possível.

### O problema

Modelos de linguagem grandes (como GPT-3) são treinados para prever a próxima palavra. Isso os torna bons em gerar texto, mas não necessariamente em **seguir instruções** ou ser **úteis e seguros**.

Um modelo treinado apenas com previsão de texto pode:
- Ignorar a instrução e divagar
- Gerar conteúdo ofensivo
- Inventar informações (alucinar)

### A solução em três etapas

1. **Supervised Fine-Tuning (SFT)**: Humanos escrevem respostas ideais para prompts diversos. O modelo é treinado nessas respostas.

2. **Treinamento do modelo de recompensa**: Para um mesmo prompt, o modelo gera múltiplas respostas. Humanos ordenam as respostas da melhor para a pior. Um modelo de recompensa aprende a prever essas preferências.

3. **Otimização com PPO**: O modelo de linguagem é otimizado usando Proximal Policy Optimization (PPO) para maximizar a recompensa prevista pelo modelo de recompensa.

### Resultado surpreendente

O InstructGPT com **1.3 bilhão de parâmetros** foi preferido pelos avaliadores humanos em relação ao GPT-3 com **175 bilhões de parâmetros**. Isso mostra que **alinhamento** importa mais que tamanho bruto.

### Por que isso importa?

O RLHF se tornou a técnica padrão para alinhar modelos de linguagem. Praticamente todos os assistentes de IA modernos (ChatGPT, Claude, Gemini) usam alguma variação dessa abordagem.
