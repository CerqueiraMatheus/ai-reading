---
title: "Attention Is All You Need — Mergulho Profundo"
---

### O que este artigo propõe?

O artigo "Attention Is All You Need" introduz o **Transformer**, uma arquitetura de rede neural que revolucionou o processamento de linguagem natural (NLP). Antes deste trabalho, os modelos dominantes usavam redes recorrentes (RNNs) ou convolucionais (CNNs) para processar sequências de texto.

### Por que isso importa?

O Transformer resolve dois problemas fundamentais das RNNs:

1. **Paralelização**: RNNs processam tokens um por vez (sequencialmente). O Transformer processa todos os tokens ao mesmo tempo, tornando o treinamento muito mais rápido.
2. **Dependências de longo alcance**: RNNs "esquecem" informações distantes na sequência. O mecanismo de atenção do Transformer consegue conectar diretamente qualquer par de palavras, independente da distância.

### O mecanismo de atenção

O conceito central é a **self-attention** (autoatenção). Imagine que você está lendo a frase:

> "O gato sentou no tapete porque **ele** estava cansado."

Para entender "ele", o modelo precisa relacionar essa palavra com "gato". A autoatenção calcula uma pontuação de relevância entre cada par de palavras na frase, permitindo que o modelo "preste atenção" nas palavras mais importantes.

### Componentes principais

- **Multi-Head Attention**: Em vez de calcular uma única atenção, o modelo calcula várias atenções em paralelo (as "cabeças"), cada uma focando em diferentes aspectos da relação entre palavras.
- **Encoder-Decoder**: O encoder processa a entrada (ex: frase em inglês) e o decoder gera a saída (ex: tradução em português).
- **Positional Encoding**: Como o Transformer não processa sequencialmente, ele precisa de uma forma de saber a posição de cada palavra — isso é feito adicionando vetores de posição aos embeddings.

### Impacto

Este artigo é a base de praticamente todos os modelos de linguagem modernos: BERT, GPT, T5, LLaMA, e muitos outros. É leitura obrigatória para qualquer pessoa interessada em IA.
