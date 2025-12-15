import type { Location } from "../types";

interface LocationApiResponse {
    results: Location[];
}

export const locationService = {
    /*Obtiene las localizaciones (planetas) desde la API de Rick & Morty*/
    getLocations: async (): Promise<Location[]> => {
        const response = await fetch("https://rickandmortyapi.com/api/location");

        if (!response.ok) {
        throw new Error("Error al obtener las localizaciones");
        }

        const data: LocationApiResponse = await response.json();
        return data.results;
    },
};
