import { CrewList } from '../../components/CrewList/CrewList';
import {useShipContext} from '../../contexts/ShipContext'
import './Home.css';

export function Home() {
    const {fuel,credit,crewList} = useShipContext();
    return (
        <div>
           
            <div>
                 <h1>Resumen visual</h1>
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

            {
                fuel <= 0 ? (
                    <div>
                        <h2><strong>Alerta:</strong> Nave a la deriva</h2>
                    </div>
                ):""
            }
            </div>
            <div>
                <CrewList></CrewList>

            </div>
        </div>
    )
}
