import axios from "axios";
import { CountryRating } from "../models/Models.js";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
  timeout: 5000,
});

const FIELDS = "name,population,region";

const formatar = (country) => ({
    name: country.name.common, 
    population: country.population, 
    region: country.region
});

const avaliar = async (req, res) => {
  const {name, like} = req.body;

  if (typeof name !== "string" || !name.trim() || typeof like !== "boolean") {
    return res.status(400).json({erro: "Parâmetros inválidos."});
  }

  try {
    const [country] = await CountryRating.findOrCreate({
      where: {country_name: name},
      defaults: {likes: 0, dislikes: 0}
    });

    like ? country.likes++ : country.dislikes++;
    await country.save();

    res.json({message: "Avaliação registrada com sucesso.", data: country});
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarAvaliacoes = async (country) => {
  const avaliacao = await CountryRating.findOne({where: {country_name: country.name}});
  return {
    ...country,
    likes: avaliacao?.likes ?? 0,
    dislikes: avaliacao?.dislikes ?? 0,
  };
};

const buscar = async (req, res) => {
  const nome = req.query.nome;
  if (!nome) 
    return res.status(400).json({erro: "Parâmetro 'nome' obrigatório"});

  try {
    const response = await api.get(`name/${nome}?fields=${FIELDS}`);
    const result = await Promise.all(response.data.map((country) => buscarAvaliacoes(formatar(country))));
    res.json({data: result});
  } catch (error) {
    const status = error.response?.status === 404 ? 404 : 500;
    res.status(status).json({erro: error.message});
  }
};

const listar = async (req, res) => {
  try {
    const response = await api.get(`all?fields=${FIELDS}`);
    const top = response.data
      .map(formatar)
      .sort((a,b) => b.population - a.population)
      .slice(0,10);
      
    const result = await Promise.all(top.map((country) => buscarAvaliacoes(country)));                         
    res.json({data: result});
  } catch (error) {
    res.status(500).json({erro: error.message});
  }
};

export {avaliar, buscar, listar};
