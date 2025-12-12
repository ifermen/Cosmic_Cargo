import { useContext } from "react";
import { ShipContext } from "../contexts/ShipContext";

export const useShip = () => {
    const ctx = useContext(ShipContext);

    if (!ctx) {
        throw new Error("useShip must be used inside ShipContextProvider");
    }

    return ctx;
};