# Studio Stelima

Sistema de gestão para studio de estética: clientes, profissionais, serviços e agenda.

- `backend/`: API em Spring Boot 4 (Java 21) com SQLite
- `frontend/`: painel em React + Vite (veja [frontend/README.md](frontend/README.md))

## Rodando com Docker

Pré-requisito: Docker Desktop aberto.

```bash
docker compose up -d --build
```

| Serviço  | URL                    |
| -------- | ---------------------- |
| Painel   | http://localhost:3000  |
| API      | http://localhost:8080  |

O nginx do frontend repassa `/api/*` para o backend, então o navegador só fala com a porta 3000.

O banco (`stelima.db`) e as fotos das clientes ficam no volume `stelima-data`, então sobrevivem a
`docker compose down` e a rebuilds.

```bash
docker compose logs -f backend   # ver logs
docker compose down              # parar (mantém os dados)
docker compose down -v           # parar e APAGAR o banco e as fotos
```

Depois de alterar o código, rode `docker compose up -d --build` de novo.

## Rodando sem Docker (desenvolvimento)

```bash
cd backend && ./mvnw spring-boot:run       # http://localhost:8080
cd frontend && npm install && npm run dev  # http://localhost:5173
```
