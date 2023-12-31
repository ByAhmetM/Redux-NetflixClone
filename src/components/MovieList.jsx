import axios from "axios";
import { useEffect, useState } from "react";
import { baseImageURL, options } from "../constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=tr-TR&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
        options
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 ">
      <h1>{genre.name}</h1>
      <Splide
        options={{
          pagination: false,
          autoWidth: true,
          rewind: true,
        }}
        aria-label="My Favorite Images"
      >
        {movies?.map((i) => (
          <SplideSlide className="p-3 " key={i.id}>
            <Link to={`/detay/${i.id}`}>
              <img className="movie" src={baseImageURL.concat(i.poster_path)} />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
