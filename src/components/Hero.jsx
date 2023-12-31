import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { baseImageURL } from "../constants";

const Hero = () => {
  const state = useSelector((store) => store);

  // 0 ile 19 arasında rastgele bir sayı oluştur
  const random = Math.round(Math.random() * state.popularMovies.length);

  const randomMovie = !state.isMovieLoading && state.popularMovies[random];

  return (
    <div className="hero row p-4 ">
      {state.isMovieLoading || !randomMovie ? (
        <Loading />
      ) : (
        <>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center  gap-3 ">
            <h1>{randomMovie.title}</h1>
            <p>{randomMovie.overview}</p>
            <p>
              IMDB:
              <span className="text-warning ">
                {randomMovie.vote_average.toFixed(1)}
              </span>
            </p>

            <div className="d-flex gap-3 ">
              <Link className="btn btn-danger" to={`/detay/${randomMovie.id}`}>
                Filmi İzle
              </Link>
              <Link className="btn btn-info" to={"#"}>
                Listeye Ekle
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="img-fluid rounded shadow my-4 "
              src={baseImageURL.concat(randomMovie.backdrop_path)}
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
