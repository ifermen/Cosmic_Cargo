import { CrewList } from "../../components/CrewList/CrewList";
import { useShipContext } from "../../contexts/ShipContext";
import "./Home.css";

export function Home() {
  const { fuel, credit } = useShipContext();

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
                <h2>Fuel</h2>
                <div className="home__value">{fuel}</div>
              </>
            )}
          </div>

          <div className="home__card home__card--credits">
            <h2>Credit</h2>
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
