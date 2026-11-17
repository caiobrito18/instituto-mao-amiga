# API Instituto Mão Amiga

Execute com Java 17:

```bash
./mvnw spring-boot:run
```

Swagger: `http://localhost:8080/swagger-ui.html`  
Console H2: `http://localhost:8080/h2-console`

Endpoints de pontos:

- `GET /api/v1/pontos` e `GET /api/v1/pontos/filtro?filtro=bueno&page=0&size=10`
- `GET /api/v1/pontos/{id}`
- `POST`, `PUT /api/v1/pontos/{id}` e `DELETE /api/v1/pontos/{id}`

Endpoints de doações:

- `GET /api/v1/doacoes/filtro?filtro=alimento&page=0&size=10`
- `GET /api/v1/doacoes/{id}`
- `POST`, `PUT /api/v1/doacoes/{id}` e `DELETE /api/v1/doacoes/{id}`

Prints Swagger (sucesso 200/201), 400 e 404: _reservados para a apresentação._
