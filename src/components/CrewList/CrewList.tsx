import { useShipContext } from "../../contexts/ShipContext";
import './CrewList.css';

export function CrewList() {
  const {crewList, deleteCharacterById} = useShipContext();
  const handleDelete = (id : number) => {
    deleteCharacterById(id);
  }
  return (
    <>
      <h2 className="title">Lista de personajes de la tripulación</h2>
      <ul className="crewList">
        {crewList.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={"Imagen de " + character.name} />
            <span>{character.name}</span>
            <button onClick={() => handleDelete(character.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
