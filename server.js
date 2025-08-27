import express from "express";
import countryRoutes from "./routes/CountryRoutes.js";
import {sequelize} from "./models/Models.js";

const app = express();
app.use(express.json());
app.use("/paises", countryRoutes);

const PORT = 3000;

const startServer = async() => {
    try {
        await sequelize.sync();
        console.log("Banco conectado e tabelas sincronizadas.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }   
};

startServer();


