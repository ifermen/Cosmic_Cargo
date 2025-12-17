# Documentación del Proyecto
## Modelos
Character
```ts
export interface Character {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}
```
Location
```ts
export interface Location {
    name: string;
    url:  string;
}
```

## Estructura de carpetas
```
src/
├── assets/ Recursos multimedia
├── components/ Componentes aparte utilizados
├── contexts/ Donde se ubica el ShipContext (combustible, créditos y lista de tripulantes)
├── layouts/ Componentes que definen la estructura visual común a todas las pantallas (header, footer, etc)
├── pages/ Donde se ubican las diferentes vistas
├── services/ Carpeta donde se encuentra la capa negocio de los recursos utilizados
└── types/ Donde se encuentran las interfaces que sirven como modelos
```

## React Router -> Luis
El proyecto tiene la librería **react-router-dom** implementada y se han configurado 4 rutas:
- Home (Vista 1)
- Hiring (Vista 2)
- QuestRoom (Vista 3)
- Crew/{id} (Vista detalle de tripulación)

## Layout -> Iván y Luis
Se ha desarrollado una estructura visual común a todas las páginas. En la parte superior se encuentra una cabecera (header) y el la inferior un pie (footer) y en medio se encuentra el contenido principal (main) que es donde se renderiza todas las vistas.

Dentro del hearder se encuentra el menú de navegación (nav) que utilizando la librería de **react-router-dom** se establecen los links a **Información de la Nave** (home), **Cantina** (Hiring) y **Sala de Misiones** (QuestRoom). Si el combustible es menor que 15% el menú se deshabilita.

## Contexto -> Iván
En el contexto guardamos la siguiente información:
- Combustible (un porcentaje que por defecto está a 100%)
- Créditos (por defecto 1000)
- Lista de tripulantes (lista de objetos de tipo Character cuyo máximo es 4)

En el contexto también hay implementado un **hook** para permitirnos utilizar el contexto con mayor facilidad (nos aseguramos de que el contexto no sea nunca null).

En el provider se encuentran los estados de los valores anteriores así como una serie de funciones para manipularlos.

## Vista 1 | Home ->  Abel
En esta vista hay un resumen visual de la información del contexto (combustible y créditos).

Si el combustible llegara a 0 se informaría de lo ocurrido. Además también se ha desarrollado un botón que nos permite recargar el combustible (maximo 50% de una sola vez) y restando 1 crédito por cada 1% de combustible rellenado.

También hay un listado de la tripulación.

## Vista 2 | Hiring -> Paco
Esta vista está dedicada ha reclutar personajes para nuestra tripulación. Al cargar la pagina (**useEffect**) llama a la api de **rickandmortyapi** con la url https://rickandmortyapi.com/api/character que nos devuelve un listado de todos los personajes.

Cada personaje cuesta 200 créditos reclutarlo y si está muerto no nos permitirá reclutarlo, tampoco si no tenemos suficientes créditos.

En el listado de personajes se encuentra un input text para filtrar por sus nombres.

También hay un listado de la tripulación.

## Vista 3 | Quest Room -> José María
La vista de Sala de Misiones tiene un formulario donde se pueden seleccionar 1 o varios tripulates y a que planeta deben hacer la misión.

Las misiones duran 3 segundos y una vez finalizadas te consumen un porcentaje de combustible aleatorio y añaden una recompensa en créditos también aleatoria.

Si no hay combustible suficiente la misión no iniciará.

## Listado de tripulantes -> Iván
Es un componente aparte que se utiliza tanto en la **Cantina** como en la **Información de la Nave**.

En ella se muertra todos los tripulates con 2 botones cada uno:
- Ver detalles, nos permite viajar a la vista de detalles (crew/{id}).
- Eliminar, nos permite despedir al tripulante.

## Vista detalles de tripulación -> Luis
La vista consiste en mostrar la información del tripulante en base al id introducido por la url (useParam).

También hay un botón para volver a la página anterior (useNavigate).

## LocalStorage -> Luis
Se ha implementado un servicio para manejar el LocalStorage. Y en el contexto se ha implementado 2 **useEffect**, una para cargar la información del LocalStorage y otro para guardarla. Se utilizó un estado como bandera que evitó la corrupción de información en el LocalStorage.
