import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    let endpoints = [];

    for (let i = 1; i <= 500; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    let response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((resp) => setPokemons(resp));
  };

  return (
    <>
      <Grid container spacing={3}>
        {pokemons.map((pokemon, key) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
