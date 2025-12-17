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
            <Link to="Home">Home</Link>
          </li>
          <li>
            <Link to="Hiring">Hiring</Link>
          </li>
          <li>
            <Link to="QuestRoom">QuestRoom</Link>
          </li>
        </ul>
      </nav>
    );
  }else{
    return (
      <nav>
        <ul>
          <li className="disabled">Home</li>
          <li className="disabled">Hiring</li>
          <li className="disabled">QuestRoom</li>
        </ul>
      </nav>
    );
  }
}
