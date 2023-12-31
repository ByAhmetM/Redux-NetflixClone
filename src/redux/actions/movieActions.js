import axios from "axios";
import { options } from "./../../constants/index";
import { actionTypes } from "./../actionTypes";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getPopular = () => (dispatch) => {
  axios
    .get("/movie/popular", options)
    .then((res) =>
      dispatch({ type: actionTypes.SET_MOVİES, payload: res.data.results })
    )
    .catch((err) => dispatch({ type: actionTypes.SET_MOVİES_ERROR }));
};

// tür verilerini al storea aktar

export const getGenres = () => (dispatch) => {
  axios
    .get("/genre/movie/list?language=tr", options)
    .then((res) =>
      dispatch({ type: actionTypes.SET_GENRES, payload: res.data.genres })
    )
    .catch((err) => dispatch({ type: actionTypes.SET_GENRES_ERROR }));
};
