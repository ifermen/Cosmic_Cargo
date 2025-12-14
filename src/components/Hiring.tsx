import React, { useEffect, useState, type ChangeEvent } from "react";
import type { Character } from "../types";
import {fetchCharacters} from "../services/hiringService";
import {useShipContext} from "../contexts/ShipContext";

export const Hiring: React.FC = () => {
    //Estado que almacena los personajes obtenidos desde la api
    const [characters,setCharacters] = useState<Character[]>([]);
    const [search,setSearch] = useState<string>('');
    //Obtiene las acciones del context
    const {credit,crewList} = useShipContext();
    
    /**
     * useEffect
     * Realiza la llamada a la api para cargar todos los personajes en el service
     * Leemos los personajes
     */
    useEffect(()=>{
      const loadCharacters = async()=>{
        try{
          const characters = await fetchCharacters();
          setCharacters(characters);
        }catch(error){
          console.error("Error en conseguir a los personajes",error);
        }
      }
      loadCharacters();
    },[])

    

    /**
     * Filtrado de personajes por nombre que crea un array que el nombre del personaje se asemeje a lo que se busca
     */
    const filteredCharacters = characters.filter(c=>c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    /**
     * Manejar el cambio del buscador y coger el valor para aplicarselo al estado search
     */

    const handleSearch = (e:ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }

  return (
    <div>

      <section className="hiring">
  
  <h1>Reclutar Personajes</h1>

    <h2>{filteredCharacters.length===0?'No hay personajes para reclutar':''}</h2>
  
  <input
    type="text"
    placeholder="Buscar personajes ..."
    value={search}
    onChange={handleSearch}
  />

  <table>
    <thead>
      <tr>
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

        return (
          <tr
            key={character.id}
          >
            <td>{character.name}</td>
            <td>{character.species}</td>
            <td>{character.status}</td>
            <td>{character.gender}</td>
            <td>
              {/* Botón de Reclutar */}
              <button disabled={isDead || noCredits || crewFull}>
                {isDead ? "No disponible" : "Reclutar"}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</section>
    </div>
    
  );
};
