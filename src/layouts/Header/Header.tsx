import Navbar from "../Navbar/Navbar";
import './Header.css'

export default function Header(){
    return(
        <header>
            <h1 id="header-title">Cosmic Cargo</h1>
            <Navbar />
        </header>
    );
}