---
title: "BERT — Mergulho Profundo"
---

### O que é o BERT?

BERT significa **Bidirectional Encoder Representations from Transformers**. É um modelo de linguagem pré-treinado que revolucionou o NLP ao introduzir o conceito de **pré-treinamento bidirecional**.

### O problema que o BERT resolve

Antes do BERT, modelos como o GPT processavam texto apenas da esquerda para a direita. Isso significa que, ao processar uma palavra, o modelo só tinha acesso às palavras anteriores. O BERT processa o texto em **ambas as direções** simultaneamente.

### Como funciona o pré-treinamento?

O BERT usa duas tarefas de pré-treinamento:

1. **Masked Language Model (MLM)**: O modelo recebe frases onde 15% das palavras são substituídas por `[MASK]`. A tarefa é prever as palavras mascaradas. Isso força o modelo a entender o contexto de ambos os lados.

2. **Next Sentence Prediction (NSP)**: O modelo recebe pares de frases e precisa prever se a segunda frase segue a primeira no texto original. Isso ajuda a entender relações entre frases.

### Por que bidirecional importa?

Considere a palavra "banco" nas frases:
- "Sentei no **banco** do parque."
- "Depositei dinheiro no **banco**."

Um modelo unidirecional teria dificuldade em distinguir os significados. O BERT, por ler o contexto completo, consegue diferenciar com facilidade.

### Fine-tuning

Após o pré-treinamento, o BERT pode ser ajustado (fine-tuned) para tarefas específicas como classificação de texto, resposta a perguntas e reconhecimento de entidades, geralmente com poucos dados adicionais.
