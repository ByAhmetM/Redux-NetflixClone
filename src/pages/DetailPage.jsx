import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImageURL, options } from "../constants";
import Loading from "./../components/Loading";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  axios.defaults.baseURL = "https://api.themoviedb.org/3";
  useEffect(() => {
    /* filmin temel bilgilerini alır */
    axios
      .get(`/movie/${id}?language=tr-TR`, options)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    /* filmdeki kişilerin bilgileri */
    axios
      .get(`/movie/${id}/credits?language=tr-TR`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));
  }, []);

  const newDate = new Date(movie?.release_date).toLocaleDateString();

  return (
    <div className="row">
      {!movie ? (
        <Loading />
      ) : (
        <>
          {/* üst alan */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={
                movie.backdrop_path
                  ? baseImageURL.concat(movie.backdrop_path)
                  : baseImageURL.concat(movie.poster_path)
              }
              alt=""
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          {/* oyuncular kişiler */}
          <div className="col-12 p-4 my-3">
            <h2>Oyuncular</h2>
            <Splide
              options={{
                pagination: false,
                autoWidth: true,
                rewind: true,
                height: "200px",
              }}
              aria-label="My Favorite Images"
            >
              {cast?.map((i) => (
                <SplideSlide className="p-3 " key={i.id}>
                  {i.profile_path && (
                    <div className="actor-card h-100 ">
                      <img
                        className="movie"
                        src={baseImageURL.concat(i.profile_path)}
                      />
                      <p>
                        <span>{i.name}</span>
                      </p>
                    </div>
                  )}
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {/* sol taraf */}
          <div className="col-md-6 mt-4 p-4">
            {/*1) şirketler */}
            <h3>Yapımcı Şirketler</h3>
            <div className="d-flex flex-wrap gap-4 mt-3">
              {movie.production_companies.length > 0 ? (
                movie.production_companies?.map((comp) => (
                  <div
                    key={comp.id}
                    className="d-grid place-items-center bg-white rounded p-1"
                  >
                    {comp.logo_path ? (
                      <img
                        width={100}
                        height={50}
                        title={comp.name}
                        className="object-fit-contain"
                        src={baseImageURL.concat(comp.logo_path)}
                        alt=""
                      />
                    ) : (
                      <span className="text-black fw-bold h-100 d-flex align-items-center justify-content-center">
                        {comp.name}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <h5 className="fw-bold text-danger">
                  ! Bilgi Bulunmamaktadır..
                </h5>
              )}
            </div>
            {/* 2) diller */}
            <h3 className="mt-4">Konuşulan Diller</h3>
            <div className="d-flex flex-wrap gap-4 mt-3">
              {movie.spoken_languages.map((lang, i) => (
                <div key={i} className="bg-white rounded p-1 text-black">
                  <span className="fw-bold p-2">{lang.english_name}</span>
                </div>
              ))}
            </div>
            {/* 3) ülkeler */}
            <h3 className="mt-4">Yapımcı Ülkeler</h3>
            <div className="d-flex flex-wrap gap-4 mt-3">
              {movie.production_countries.map((country, i) => (
                <div key={i} className="bg-white rounded p-1 text-black ">
                  <span className="fw-bold p-2 ">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* sağ taraf */}
          <div className="col-md-6 mt-4 p-4">
            <p className="d-flex gap-3 align-items-center">
              <span className="fw-bold">Filmin Türü : </span>
              <span>
                {movie.genres.map((genre) => (
                  <span className="fw-bold text-info mx-2" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </span>
            </p>

            <p className="lead fs-6">{movie.overview}</p>
            <p>
              <span className="fw-bold">Bütçe : </span>
              {movie.budget === 0 ? (
                <span className="text-warning">Veri Bulunamadı</span>
              ) : (
                <span className="text-danger">{millify(movie.budget)}</span>
              )}
            </p>
            <p>
              <span className="fw-bold">Gelir : </span>
              {movie.revenue === 0 ? (
                <span className="text-warning">Veri Bulunamadı</span>
              ) : (
                <span className="text-danger">{millify(movie.revenue)}</span>
              )}
            </p>
            <p>
              <span className="fw-bold">Çıkış Tarihi : </span>
              <span className="text-primary fw-bold">{newDate}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
