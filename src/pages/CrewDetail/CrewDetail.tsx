import { useNavigate, useParams } from "react-router-dom";
import { useShipContext } from "../../contexts/ShipContext";

export function CrewDetail(){
    const {id} = useParams();
    const {crewList} = useShipContext();
    const navigate = useNavigate();
    
    //Buscamos para traer el personaje por el id
    const character = crewList.find(c => c.id == Number(id));

    //Aseguramos que no sea nulo
    if(!character){
        return <div className="crewDetail">Tripulante no encontrado.</div>;
    }

    return(
        <>
            <div>
                <h2>{character.name}</h2>
                <img src={character.image} alt={"Imagen de " + character.name} />
                <p><strong>Especie:</strong> {character.species}</p>
                <p><strong>Estado:</strong> {character.status}</p>
                <p><strong>Origen:</strong> {character.origin?.name}</p>
                <p><strong>Ubicación:</strong> {character.location?.name}</p>
                <button onClick={() => navigate(-1)}>Volver</button>
            </div>
        </>
    );
}