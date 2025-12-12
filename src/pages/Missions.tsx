import { useEffect, useState } from "react";
import { useShipContext } from "../contexts/ShipContext";
import type { Location, Character } from "../types";

export const QuestRoom = () => {
    const {crewList, fuel, subtractFuel, addCredit} = useShipContext();

    //Estado
    const [planets, setPlanets] = useState<Location[]>([]);
    const [selectedCrew, setSelectedCrew] = useState<number | "">("");
    const [selectedPlanet, setSelectedPlanet] = useState<string | "">("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // -----------------------------------------
    //1. Cargamos planetas desde la API (esto lo quitare cuando este el service)
    // -----------------------------------------
    useEffect(() => {
        const fetchPlanets = async () => {
            const res = await fetch("https://rickandmortyapi.com/api/location");
            const data = await res.json();
            setPlanets(data.results); //location tiene name + url
        };

        fetchPlanets();
    }, []);

    // -----------------------------------------
    //2. Enviar misión
    // -----------------------------------------
    const handleMission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCrew === "" || selectedPlanet === "") {
            return;
        }

        //Coste combustible aleatorio (5-50%)
        const fuelCost = Math.floor(Math.random() * 46) + 5;

        if (fuel < fuelCost) {
            setMessage("No hay suficiente combustible para esta misión, vaya a repostar.");
            return;
        }

        //Recompensa aleatoria (100–500 créditos)
        const reward = Math.floor(Math.random() * 401) + 100;

        //Aplicar efectos de los aleatorios
        subtractFuel(fuelCost);
        setLoading(true);
        setMessage("");

        //Simular misión (3 segundos) timeout
        setTimeout(() => {
        addCredit(reward);

        const planetName = planets.find((p) => p.name === selectedPlanet)?.name;

        setLoading(false);
        setMessage(`¡Misión cumplida en ${planetName}! Ganaron +${reward} créditos`);
        }, 3000);
    };

    return (
        <div>
        <h1>Sala de Misiones</h1>
        <p>Envia a tu tripulación a explorar.</p>

        {/* FORMULARIO */}
        <form onSubmit={handleMission}>
            
            {/* SELECT TRIPULANTES*/}
            <label>
            <strong>Selecciona tripulante:</strong>
            <br />
            <select value={selectedCrew} onChange={(e) => setSelectedCrew(Number(e.target.value))}>
                <option value="">Elegir Tripulante</option>

                {crewList.map((member: Character) => (
                    <option key={member.id} value={member.id}>{member.name} ({member.status})</option>
                ))}
            </select>
            </label>

            <br /><br />

            {/*SELECT PLANETA*/}
            <label>
            <strong>Selecciona planeta destino:</strong>
            <br />

            <select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                <option value="">Elegir Planeta</option>

                {planets.map((loc) => (
                    <option key={loc.url} value={loc.name}> {loc.name}</option>
                ))}
            </select>
            </label>

            <br />

            {/*BOTÓN*/}
            <button type="submit" disabled={loading}>
                {loading ? "Iniciando misión" : "Start Mission"}
            </button>
        </form>

        <br />

        {/*LOADING (timeout)*/}
        {loading && <p>⏳misión en en curso... (3s)</p>}

        {/*RESULTADO*/}
        {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
};

export default QuestRoom;