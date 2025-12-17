import type { Character } from "../types";


const API_URL = "https://rickandmortyapi.com/api/character";

/**
 * Llama a la api y devuelve una promesa de todos los personajes
 * @returns 
 */
export const fetchCharacters = async ():Promise<Character[]>=>{
    try{
        const response = await fetch(API_URL);
        const characters = await response.json();  
        return characters.results;      
    }catch(error){
        console.error("Error al cargar los personajes",error); 
        throw error;
    }
        
}
/**
 * Recibe un id y devolvemos la promesa del personaje con el mismo id
 * @param id 
 * @returns 
 */
export const getCharacterId = async (id:number):Promise<Character>=>{
    try{
        const response = await fetch(`${API_URL}/${id}`);
        const character = await response.json();  
        return character;      
    }catch(error){
        console.error("Error al cargar el personaje",error); 
        throw error;
    }
        
}




        