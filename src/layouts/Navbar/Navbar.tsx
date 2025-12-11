import { Link } from 'react-router-dom';
export default function Navbar(){
    return(
        <nav>
            <ul>
                <Link to="Home">Home</Link>
                <Link to="Hiring">Hiring</Link>
                <Link to="QuestRoom">QuestRoom</Link>
            </ul>
        </nav>
    );
}