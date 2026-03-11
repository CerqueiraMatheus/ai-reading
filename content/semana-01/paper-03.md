---
title: "GPT-3 — Mergulho Profundo"
---

### O que é o GPT-3?

GPT-3 (Generative Pre-trained Transformer 3) é um modelo de linguagem com **175 bilhões de parâmetros** desenvolvido pela OpenAI. O artigo demonstra que escalar modelos de linguagem melhora drasticamente sua capacidade de realizar tarefas sem treinamento específico.

### Few-shot, one-shot e zero-shot

O conceito central do artigo é que modelos grandes o suficiente conseguem realizar tarefas com poucos ou nenhum exemplo:

- **Zero-shot**: O modelo recebe apenas a descrição da tarefa. Ex: "Traduza para francês: Hello" → "Bonjour"
- **One-shot**: O modelo recebe um exemplo antes da tarefa.
- **Few-shot**: O modelo recebe alguns exemplos (geralmente 10-100) no prompt.

### Por que isso é revolucionário?

Antes do GPT-3, para cada tarefa de NLP, era necessário:
1. Coletar dados rotulados específicos
2. Treinar ou ajustar um modelo
3. Avaliar e iterar

Com o GPT-3, muitas tarefas podem ser resolvidas simplesmente descrevendo o que você quer no prompt — sem nenhum treinamento adicional.

### Escala como ingrediente principal

O artigo mostra uma relação clara entre o tamanho do modelo e sua performance em few-shot learning. Modelos menores (com "apenas" milhões de parâmetros) não conseguem o mesmo desempenho.

### Limitações discutidas

Os autores são transparentes sobre limitações: o modelo pode gerar textos plausíveis mas factualmente incorretos, tem dificuldade com raciocínio lógico complexo, e pode reproduzir vieses presentes nos dados de treinamento.
