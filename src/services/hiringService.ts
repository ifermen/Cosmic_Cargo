import type { Character } from "../types";


const API_URL = "https://rickandmortyapi.com/api/character";

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

export const getCharacterId = async (id:number):Promise<Character>=>{
    try{
        const response = await fetch(`${API_URL}/${id}`);
        const character = await response.json();  
        return character.results;      
    }catch(error){
        console.error("Error al cargar el personaje",error); 
        throw error;
    }
        
}
        