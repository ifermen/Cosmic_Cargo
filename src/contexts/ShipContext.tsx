import { createContext, useState, type ReactNode } from "react";
import type { Character } from "../types";

interface ShipContextType {
    credit : number;
    fuel: number;
    crewList: Character[];
}
const ShipContext = createContext<ShipContextType | null>(null);


interface ShipContextProviderProps {
    children : ReactNode
}
export const ShipContextProvider = ({children}:ShipContextProviderProps) => {

    const [credit,setCredit] = useState(1000);
    const [fuel,setFuel] = useState(100);
    const [crewList,setCrew] = useState<Character[]>([]);

    /**
     * Función para restar credito al del contexto
     * @param {number} creditToSubtrack 
     * @throws {Error} Excepción de credito insuficiente
     */
    const subtractCredit = (creditToSubtrack:number) => {
        if(credit < creditToSubtrack){
            throw new Error("Credito insuficiente");
        }
        setCredit(credit - creditToSubtrack);
    }

    /**
     * Función para restar credito al del contexto
     * @param {number} fuelToSubtrack 
     * @throws {Error} Excepción de credito insuficiente
     */
    const subtractFuel = (fuelToSubtrack:number) => {
        if(fuel < fuelToSubtrack){
            throw new Error("Fuel insuficiente");
        }
        setFuel(fuel - fuelToSubtrack);
    }

    return (
        <ShipContext.Provider value={{
            credit,
            fuel,
            crewList
        }}>
            {children}
        </ShipContext.Provider>
    );
}