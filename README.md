# **⚠️ ES OBLIGATORIO COMENTAR EL CODIGO ⚠️**

# Modelos
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

export interface Location {
    name: string;
    url:  string;
}

# React Router -> Iván / Luis
- Bloquear la navegación en caso de que no haya combustible

# Layout -> Iván / Luis
- Cabecera donde estará el menú de navegación (React Router)
- Main donde se cargará las vistas
- Footer que dirá: Creado por los Marcianitos (Iván, Abel, Paco, Luis, José María).

# Contexto -> Iván / Luis
- Objeto {credito=1000,combustible=100,tripulacio:lista[4]}

# Vista 1 | Home ->  Abel
- Resumen (credito y combustible consumido(NO ACTUAL))
- Lista de tripulacion / mensaje informativo y enlace a zona de contratacion
- Si el combustible llega ha cero se debe de mostrar un mensaje: NAVE A LA DERIVA

# Vista 2 | Hiring (Conexión a API) -> Paco
- Llamadas a la Api (https://rickandmortyapi.com/api/character) **useEffect**
- Interfaz de character (**./model**)
- Input para buscar candidatos
  - Mostrar una tabla de candidatos (cabecera: name, species, status, gender, action (donde estará el boton de contratar)).
  - Botón "Contratar": Al hacer click, cuesta 200 créditos (solo  si tienes menos de 4 tripulantes en el contexto,  si tienes dinero suficiente y si no está muerto).
  - Status 'Dead':  si el personaje esta muerto debe aparecer el botón deshabilitado y la tarjeta en gris (Renderizado condicional basado en datos de API).

# Vista 3 | Quest Room -> Chumari
- Formulario:
  - Input select para elegir al tripulante elegido (del context). 
  - Input select con 5 planetas harcodeados (en un futuro seran de la api).
  - Boton submit con el texto Start Mission.
- Evento Submit:
  - Restamos combustible al almacenado en el contexto (Aleatorio 5 - 50%).
  - Crear temporizador (**setTimeout**) al enviar el formulario (**evento submit**).
  - Sumar creditos (aleatorio) al total del contexto.

# Opcional

## LocalStorage
  Contexto también se guardará en LocalStorage.

## ¿HOOK?

## ¿Detalle del tripulante?
 
