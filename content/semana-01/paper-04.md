---
title: "Vision Transformer (ViT) — Mergulho Profundo"
---

### O que é o Vision Transformer?

O ViT (Vision Transformer) aplica a arquitetura Transformer, originalmente criada para texto, diretamente a **imagens**. A ideia central é simples e elegante: dividir uma imagem em pequenos quadrados (patches) e tratá-los como se fossem "palavras" de uma frase.

### Como funciona?

1. **Dividir a imagem**: Uma imagem de 224×224 pixels é dividida em patches de 16×16, resultando em 196 patches (14×14).
2. **Linearizar cada patch**: Cada patch é "achatado" em um vetor e projetado para a dimensão do modelo.
3. **Adicionar posição**: Assim como no Transformer original, embeddings de posição são adicionados para que o modelo saiba onde cada patch está na imagem.
4. **Processar com Transformer**: Os patches são processados pelo encoder do Transformer usando self-attention.

### Por que é importante?

Antes do ViT, a visão computacional era dominada por CNNs (Redes Neurais Convolucionais). O ViT mostra que, com dados suficientes, Transformers puros podem igualar ou superar CNNs em tarefas de classificação de imagens.

### A importância dos dados

Um ponto crucial do artigo: o ViT precisa de **muitos dados** para superar CNNs. Com datasets pequenos (como ImageNet), CNNs ainda vencem. Mas quando pré-treinado em datasets massivos (como JFT-300M com 300 milhões de imagens), o ViT ultrapassa todas as CNNs.

### Impacto

O ViT abriu caminho para uma unificação de arquiteturas entre visão e linguagem, possibilitando modelos multimodais como CLIP, DALL-E e GPT-4V.
