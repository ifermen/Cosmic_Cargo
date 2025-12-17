import { Link } from "react-router-dom";
import './Navbar.css'
import { useShipContext } from "../../contexts/ShipContext";

export default function Navbar() {
  const {fuel} = useShipContext();
  if(fuel>15){
    return (
      <nav>
        <ul>
          <li>
            <Link to="Home">Información de la nave</Link>
          </li>
          <li>
            <Link to="Hiring">Cantina</Link>
          </li>
          <li>
            <Link to="QuestRoom">Sala de misiones</Link>
          </li>
        </ul>
      </nav>
    );
  }else{
    return (
      <nav>
        <ul>
          <li className="disabled">Información de la nave</li>
          <li className="disabled">Cantina</li>
          <li className="disabled">Sala de misiones</li>
        </ul>
      </nav>
    );
  }
}
