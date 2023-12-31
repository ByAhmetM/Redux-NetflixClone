import { useEffect } from "react";
import Hero from "./../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPopular } from "../redux/actions/movieActions";
import { actionTypes } from "../redux/actionTypes";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
const MainPage = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store);

  useEffect(() => {
    // filmler için yükleniyor stateini aktif eden aksiyon
    dispatch({ type: actionTypes.SET_MOVİES_LOADİNG });

    // populer filmleri al ve storea aktar
    dispatch(getPopular());
    dispatch({ type: actionTypes.SET_GENRES_LOADİNG });
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />

      {state.isGenresLoading ? (
        <Loading />
      ) : state.isGenresError ? (
        <p>Üzgünüz hata oluştu.</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
