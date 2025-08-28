# case-tracking-highend
Esse projeto é um case de um teste técnico da empresa Tracking Highend. Onde o objetivo era construir uma API que consuma uma API pública e disponibilize funcionalidades.

Os objetivos esperados eram:
- Consumo de API REST.
- Manipulação de JSON.
- Criação de 3 endpoints (/avaliar, /buscar e /listar).
- Persistência em banco de dados (salvar e relacionar avaliações).
- Boas práticas (organização de código, clareza e tratamento de erros).

---

A estrutura da aplicação:
- server.js -> Arquivo principal; inicializa o servidor e sincroniza o banco de dados.
- /models/Models.js -> Configuração do ORM Sequelize; define tabelas e colunas e gerencia o acesso ao banco de dados.
- /routes/CountryRoutes.js -> Define as rotas da aplicação usando Router; as funções são importadas do controller.
- /controllers/CountryController.js -> Implementa a lógica dos endpoints; core da aplicação.

---

Instalação:
```
git clone https://github.com/seu-usuario/case-tracking-highend.git
cd case-tracking-highend
npm install

[!] o Models espera um arquivo .env.
```
