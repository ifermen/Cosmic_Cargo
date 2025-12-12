import { createContext, useContext, useState, type ReactNode } from "react";
import type { Character } from "../types";

interface ShipContextType {
    credit : number;
    subtractCredit : (creditToSubtract:number) => void;
    addCredit : (creditToAdd:number) => void;
    fuel: number;
    subtractFuel : (fuelToSubtract:number) => void;
    addFuel : (fuelToAdd:number) => void;
    addCharacterToCrewList : (character:Character) => void;
    crewList: Character[];
}
const ShipContext = createContext<ShipContextType | null>(null);

export const useShipContext = () => {
    const context = useContext(ShipContext);
    if(!context) {
        throw new Error("El contexto no está inicializado");
    }
    return context;
}

interface ShipContextProviderProps {
    children : ReactNode
}
export const ShipContextProvider = ({children}:ShipContextProviderProps) => {

    const [credit,setCredit] = useState(1000);
    const [fuel,setFuel] = useState(100);
    const [crewList,setCrew] = useState<Character[]>([]);

    /**
     * Resta credito al del contexto
     * @param creditToSubtract 
     * @throws Excepción de credito insuficiente
     */
    const subtractCredit = (creditToSubtract:number) => {
        if(credit < creditToSubtract){
            throw new Error("Credito insuficiente");
        }
        setCredit(credit - creditToSubtract);
    }

    /**
     * Suma credito al del contexto
     * @param creditToAdd
     */
    const addCredit = (creditToAdd:number) => {
        setCredit(credit + creditToAdd);
    }

    /**
     * Resta el combustible al del contexto
     * @param fuelToSubtract 
     * @throws Excepción de credito insuficiente
     */
    const subtractFuel = (fuelToSubtract:number) => {
        if(fuel < fuelToSubtract){
            throw new Error("Combustible insuficiente");
        }
        setFuel(fuel - fuelToSubtract);
    }

    /**
     * Suma combustible al del contexto
     * @param fuelToAdd 
     * @throws Combustible excedido (max: 100)
     */
    const addFuel = (fuelToAdd:number) => {
        if((fuel + fuelToAdd) > 100){
            throw new Error("Combustible excedido (max: 100)");
        }
        setFuel(fuel + fuelToAdd);
    }

    /**
     * Añade un personaje a la lista de tripulación
     * @param character 
     * @throws Ya hay 4 personajes añadidos
     */
    const addCharacterToCrewList = (character:Character) => {
        if (crewList.length >= 4){
            throw new Error("Tripulación completa");
        }
        setCrew([...crewList,character]);
    }

    return (
        <ShipContext.Provider value={{
            credit,
            subtractCredit,
            addCredit,
            fuel,
            subtractFuel,
            addFuel,
            crewList,
            addCharacterToCrewList
        }}>
            {children}
        </ShipContext.Provider>
    );
}