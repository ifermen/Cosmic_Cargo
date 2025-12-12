import type { Character } from '../types/index';
export const localStorageService = {
    /**
     * get data trae el item shipData, comprobamos si devuelve nulo para devolverlo
     * o sino devolvemos el valor del localStorage
     */
    getData : () => {
        const data = localStorage.getItem("shipData");
        if(!data){
            return null;
        }
        return JSON.parse(data);
    },
    /**
     * Creamos el objeto data con los valores de los parámetros
     * lo guardamos en el localStorage
     * 
     * @param credit 
     * @param fuel 
     * @param crewList 
     */
    saveData : (credit : number, fuel : number, crewList : Character []) => {
        const data = {
            credit,
            fuel,
            crewList
        }
        localStorage.setItem("shipData", JSON.stringify(data));
    }
}