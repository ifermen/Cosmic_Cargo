import { CrewList } from "../../components/CrewList/CrewList";
import { useShipContext } from "../../contexts/ShipContext";
import "./Home.css";

export function Home() {
  const { fuel, credit,subtractCredit,addFuel } = useShipContext();

  const handleClickReloadFuel = () => {
    if(fuel < 100){
      if(fuel <= 50){
        if(credit >= 50){
          subtractCredit(50);
          addFuel(50);
        }else{
          alert("Credito insuficiente");
        }
      }else{
        let fuelToAdd = 50 - (fuel - 50);
        if(credit >= fuelToAdd){
          subtractCredit(fuelToAdd);
          addFuel(fuelToAdd);
        }else{
          alert("Credito insuficiente");
        }
      }
    }
  }

  return (
    <section className="home">
      <article className="shipInfo">
        <h1 className="shipInfoTitle">Informacion de la nave</h1>

        <div className="shipInfoContent">
          <div className="home__card home__card--fuel">
            {fuel <= 15 ? (
              <div className="home__status home__status--danger">
                Nave a la deriva
              </div>
            ) : (
              <>
                <h3>Combustible</h3>
                <div className="home__value">{fuel}</div>
              </>
            )}
            <button className="btnReload" onClick={handleClickReloadFuel} disabled={fuel >= 100? true : false}>Recargar</button>
          </div>

          <div className="home__card home__card--credits">
            <h3>Credit</h3>
            <div className="home__value">{credit}</div>
          </div>
        </div>
      </article>

      <article className="homeCrew">
        <div className="home-crewList">
          <CrewList />
        </div>

        <a href="./Hiring" className="home__cantina-link">
          Ir a la Cantina
        </a>
      </article>
    </section>
  );
}
