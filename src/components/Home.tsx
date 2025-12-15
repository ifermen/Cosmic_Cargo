import {useShipContext} from '../contexts/ShipContext'


export function Home() {
    const {fuel,credit,crewList} = useShipContext();
    return (
        <div>
            <h1>Resumen visual</h1>
            <div>
                <div>
                    <p>
                        fuel
                    </p>
                    <p>
                        {fuel}
                    </p>
                </div>
                <div>
                    <p>
                        Creditos
                    </p>
                    <p>
                        {credit}
                    </p>
                </div>
            </div>
            <div>
                <p>
                    Tripulacion
                </p>
                <ul>
                    {crewList.map((person)=>{
                        return(
                            <li>
                                {person.name} el {person.species}
                            </li>
                        )
                    })}
                </ul>

                <a href='./Hiring'>Cantina</a>
            </div>
            {
                fuel <= 0 ? (
                    <div>
                        <h2><strong>Alerta:</strong> NAve a la deriva</h2>
                    </div>
                ):""
            }
        </div>
    )
}
