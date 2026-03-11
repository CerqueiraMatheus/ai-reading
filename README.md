# AI Reading

Blog minimalista de leituras semanais de artigos de IA com mergulhos profundos
em português. Cada semana apresenta ~5 artigos do
[arXiv](https://arxiv.org/) com um leitor de PDF integrado.

**Status:** em desenvolvimento ativo.

## Como usar

### Desenvolvimento local

```sh
npm install
npm run dev
```

### Build e preview

```sh
./run.sh
```

Ou manualmente:

```sh
npm run build
npm run preview
```

### Type-checking

```sh
npm run check
```

## Adicionando uma nova semana

1.  Crie `content/semana-NN/week.json` com metadados e lista de artigos.
2.  Adicione mergulhos profundos como `content/semana-NN/paper-NN.md`.
3.  Faça push na branch `main` — nenhuma alteração de código necessária.

Veja `content/semana-01/` como exemplo.

## Deploy

Push na branch `main` aciona
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que publica
automaticamente no GitHub Pages.

## Documentação

-   [Copilot instructions](.github/copilot-instructions.md) — arquitetura,
    convenções e guia para contribuir com assistência de IA.
