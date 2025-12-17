import { useEffect, useState, type ChangeEvent } from "react";
import {
  fetchCharacters,
  getCharacterId,
} from "../../services/characterService";
import { useShipContext } from "../../contexts/ShipContext";
import type { Character } from "../../types";
import { CrewList } from "../../components/CrewList/CrewList";
import "./Hiring.css";

export const Hiring = () => {
  //Estado que almacena los personajes obtenidos desde la api
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState<string>("");
  //Obtiene las acciones del context
  const { subtractCredit, credit, crewList, addCharacterToCrewList } =
    useShipContext();

  /**
   * useEffect
   * Realiza la llamada a la api para cargar todos los personajes en el service
   * Leemos los personajes
   */
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const characters = await fetchCharacters();
        setCharacters(characters);
      } catch (error) {
        console.error("Error en conseguir a los personajes", error);
      }
    };
    loadCharacters();
  }, [crewList]);

  const handleAddCharacter = async (id: number) => {
    try {
      const character = await getCharacterId(id);
      addCharacterToCrewList(character);
      subtractCredit(200);
    } catch (error) {
      console.error("Error en añadir el personaje", error);
    }
  };

  /**
   * Filtrado de personajes por nombre que crea un array que el nombre del personaje se asemeje a lo que se busca
   */
  const filteredCharacters = characters.filter((c) =>
    c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  /**
   * Manejar el cambio del buscador y coger el valor para aplicarselo al estado search
   */

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className="hiring">
      <article className="hiring-crewList">
        <CrewList></CrewList>
      </article>

      <article className="hiringList">
        <h2 className="title">Reclutar Personajes</h2>

        <div className="hiringList-content">
          <input
            className="input"
            type="text"
            placeholder="Buscar personajes ..."
            value={search}
            onChange={handleSearch}
          />
          {filteredCharacters.length === 0 ? (
            <h2>No hay personajes para reclutar</h2>
          ) : (
            <table>
              <thead>
                <tr className="trTitlesTable">
                  <th></th>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Estado Vital</th>
                  <th>Género</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {filteredCharacters.map((character) => {
                  // No se puede contratar a ningún personaje que cumpla alguno de estos requisitos
                  const isDead: boolean = character.status === "Dead";
                  const noCredits: boolean = credit < 200;
                  const crewFull: boolean = crewList.length >= 4;
                  const crewCharacterPut: boolean = crewList.some(
                    (crewCharacter) => {
                      return crewCharacter.id == character.id;
                    }
                  );

                  return (
                    <tr key={character.id} className="trCharacters">
                      <td>
                        <img
                          src={character.image}
                          alt="Imagen de cada personaje"
                          className="imageCharacters"
                        ></img>
                      </td>
                      <td>{character.name}</td>
                      <td>{character.species}</td>
                      <td>{character.status}</td>
                      <td>{character.gender}</td>
                      <td>
                        {/* Botón de Reclutar */}
                        <button
                          disabled={
                            isDead || noCredits || crewFull || crewCharacterPut
                          }
                          onClick={() => handleAddCharacter(character.id)}
                        >
                          {isDead
                            ? "No disponible"
                            : crewFull
                            ? "Equipo lleno"
                            : crewCharacterPut
                            ? "Personaje añadido"
                            : noCredits
                            ? "No créditos"
                            : "Reclutar"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </article>
    </section>
  );
};
