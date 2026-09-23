# Arquivo Impossível — v0.1 A Contradição

Vertical slice do **Caso 000 — O Envelope Azul**.

## Escopo desta versão

- abertura do Caso 000;
- ocorrência;
- controle financeiro;
- três personagens;
- registro de acesso;
- depoimento inicial de Marta;
- três linhas de investigação disponíveis;
- câmera simulada confirmando a saída de Marta às 18:35;
- timeline que passa a exibir a contradição 18:35 × 18:47;
- encerramento: **“Então quem estava com o crachá?”**;
- layout responsivo para mobile e desktop.

André → Caio não foi implementado nesta versão.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Estrutura

```text
src/
├── cases/
│   ├── case000.ts       # todo o conteúdo do caso
│   └── types.ts         # contrato reutilizável para casos futuros
├── components/          # componentes visuais reutilizáveis
├── engine/
│   └── useCaseProgress.ts # progressão/desbloqueio separado do conteúdo
├── App.tsx
└── styles.css
```

## Princípio de arquitetura

O conteúdo narrativo fica em `src/cases/`. A interface consome uma definição de caso e não depende do texto específico de *O Envelope Azul*. Isso permite evoluir o motor antes de adicionar Caso 001, 002 etc.

## Observação sobre assets

A imagem de CCTV nesta versão é uma simulação vetorial local, sem dependência de arquivo externo. Áudio e vídeo sofisticados ficaram deliberadamente fora do v0.1.
