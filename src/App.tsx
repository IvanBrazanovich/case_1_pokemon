import type { Pokemon } from "./types";

import { useState, useMemo, useEffect } from "react";

import { POKEMONS } from "./constants";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [fav, setFav] = useState(() => {
    return JSON.parse(localStorage.getItem("fav")) || [];
  });

  const total = useMemo(
    () => cart?.reduce((total, item) => item.price + total, 0),
    [cart]
  );

  useEffect(() => {
    const buscar = () => {
      const filtrado = POKEMONS.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ? item : null
      );

      if (filtrado?.length !== 0) {
        setPokemons(filtrado);
      } else {
        setPokemons(POKEMONS);
      }
    };

    buscar();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);
  console.log(fav);
  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure onClick={() => setFav([...fav, pokemon])}>
              <i className="nes-icon is-medium is-transparent heart" />
              <img alt="imagen" className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button
              className="nes-btn"
              onClick={() => {
                if (total >= 10) return;
                setCart(cart.concat(pokemon));
              }}
            >
              Agregar
            </button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">0 items (total ${total})</button>
      </aside>
    </>
  );
}

export default App;
