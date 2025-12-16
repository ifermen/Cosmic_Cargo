import { useShipContext } from "../../contexts/ShipContext";
import './CrewList.css';
import {
  getCharacterId,
} from "../../services/characterService";

export function CrewList() {
  const { delCharacterToCrewList } = useShipContext();
  const handleDeleteCharacter = async (id: number) => {
      try {
        const character = await getCharacterId(id);
        delCharacterToCrewList(character);
        alert("Personaje despedido con éxito");
      } catch (error) {
        console.error("Error en despedir el personaje", error);
      }
    };
  const {crewList} = useShipContext();
  return (
    <>
      <h2 className="title">Lista de personajes de la tripulación</h2>
      <ul className="crewList">
        {crewList.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={"Imagen de " + character.name} />
            <span>{character.name}</span>
            <button
                        onClick={() => handleDeleteCharacter(character.id)}
                      >Despedir</button>
          </li>
        ))}
      </ul>
    </>
  );
}
