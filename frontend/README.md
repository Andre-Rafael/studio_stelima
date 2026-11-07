# Studio Stelima — Frontend

Painel em React + Vite + TypeScript para o backend Spring Boot em `../backend`.

## Como rodar

Pré-requisito: [Node.js 18+](https://nodejs.org/).

```bash
# 1. Suba o backend (porta 8080)
cd backend
./mvnw spring-boot:run

# 2. Em outro terminal, suba o frontend (porta 5173)
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173.

Para checar os tipos sem gerar build: `npm run typecheck` (o `npm run build` também roda o `tsc`).

O Vite faz proxy de `/api/*` para `http://localhost:8080`, então não é preciso configurar CORS no backend
durante o desenvolvimento. Para apontar para outra URL, crie um `.env.local` com `VITE_API_URL=https://...`
(nesse caso o backend precisa liberar CORS).

## Telas

| Rota             | O que faz                                                        |
| ---------------- | ---------------------------------------------------------------- |
| `/`              | Resumo do dia, próximos atendimentos e faturamento do mês        |
| `/agendamentos`  | Agenda por dia; criar, editar, concluir e cancelar               |
| `/clientes`      | Cadastro de clientes com foto (multipart) e busca de CEP         |
| `/profissionais` | Cadastro e desativação de profissionais                          |
| `/servicos`      | Catálogo de serviços por categoria; desativação                  |

## Estrutura

```
src/
  api/          chamadas HTTP para cada recurso do backend
  components/   Layout, Modal, Toast, ícones e componentes de UI
  pages/        uma página por recurso
  utils/        formatação de datas, dinheiro e máscaras (CPF, telefone, CEP)
  hooks/        hooks reutilizáveis (useFetch)
  constants.ts  categorias, status e salas
  types.ts      tipos que espelham os DTOs do backend
```

## Limitações conhecidas (vêm do backend)

- **Salas**: o backend exige `salaId`, mas não existe cadastro de salas. O front usa 3 salas fixas
  (`src/constants.ts`).
- **Foto da cliente**: o `PUT /client/{id}` exige reenviar a foto a cada edição, e o backend ainda não
  serve as imagens salvas em `uploads/`, por isso a lista mostra as iniciais.
- **Fotos de agendamento** (`/agendamento/{id}/fotos`) ainda não estão na interface: o endpoint devolve a
  entidade JPA diretamente, o que causa erro de serialização.
