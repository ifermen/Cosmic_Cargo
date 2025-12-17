import { useEffect, useState } from "react";
import { useShipContext } from "../../contexts/ShipContext";
import type { Location, Character } from "../../types";
import { locationService } from "../../services/locationService";
import "./QuestRoom.css";

export const QuestRoom = () => {
  const { crewList, fuel, subtractFuel, addCredit } = useShipContext();
  const [isError, setIsError] = useState(false);

  // Estado
  const [planets, setPlanets] = useState<Location[]>([]);
  const [selectedCrew, setSelectedCrew] = useState<number[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Cargar planetas
  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const locations = await locationService.getLocations();
        setPlanets(locations);
      } catch {
        setMessage("Error al cargar los planetas");
      }
    };

    loadPlanets();
  }, []);

  // 2. Enviar misión
  const handleMission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (selectedCrew.length === 0 || selectedPlanet === "") {
      setMessage("Debes seleccionar al menos un tripulante y un planeta.");
      setIsError(true);
      return;
    }

    // Coste combustible aleatorio (5–50)
    const fuelCost = Math.floor(Math.random() * 46) + 5;

    if (fuel < fuelCost) {
      setMessage("No hay suficiente combustible para esta misión.");
      setIsError(true);
      return;
    }

    // Recompensa aleatoria (100–500)
    const reward = Math.floor(Math.random() * 401) + 100;

    // Aplicar efectos
    subtractFuel(fuelCost);
    setLoading(true);
    setMessage("");

    // Simular misión (3s)
    setTimeout(() => {
      addCredit(reward);

      const planetName = planets.find(
        (p) => p.name === selectedPlanet
      )?.name;

      setLoading(false);
      setIsError(false);
      setMessage(
        `Misión cumplida en: ${planetName}
          Tripulantes enviados: ${selectedCrew.length}
          Gasolina gastada: ${fuelCost}
          Créditos ganados: +${reward}`
      );

      // Reset selección
      setSelectedCrew([]);
      setSelectedPlanet("");
    }, 3000);
  };

    return (
        <div className="quest-room">
        <h1>Sala de Misiones</h1>
        <p>Envía a tu tripulación a explorar.</p>

        {/* FORMULARIO */}
        <form onSubmit={handleMission}>
            {/* SELECT TRIPULANTES */}
            <label>
            <strong>Selecciona tripulantes:</strong>
            <br />
            <select multiple value={selectedCrew.map(String)} onChange={(e) => {
                const values = Array.from(e.target.selectedOptions).map(
                    (option) => Number(option.value)
                );
                setSelectedCrew(values);
                }}
            >
                {crewList.map((member: Character) => (
                  <option key={member.id} value={member.id}>
                      {member.name} ({member.status})
                  </option>
                ))}
            </select>
            </label>

            <p>Seleccionados: {selectedCrew.length}</p>

            <br />

            {/* SELECT PLANETA */}
            <label>
            <strong>Selecciona planeta destino:</strong>
            <br />
            <select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                <option value="">Elegir Planeta</option>
                {planets.map((loc) => (
                <option key={loc.url} value={loc.name}>
                    {loc.name}
                </option>
                ))}
            </select>
            </label>

            <br /><br />

            {/* BOTÓN */}
            <button type="submit" disabled={loading}>
            {loading ? "Iniciando misión..." : "Start Mission"}
            </button>
        </form>

        <br />

        {/* LOADING */}
        {loading && <p>⏳ Misión en curso... (3s)</p>}

        {/* RESULTADO */}
        {message && (
          <p className={isError ? "message-error" : "message-success"}> {message}</p>
        )}

        <p>Tripulación actual: {crewList.length}</p>
        </div>
    );
};

export default QuestRoom;