import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
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
}
