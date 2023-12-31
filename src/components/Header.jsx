import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 ">
      <Link
        className="d-flex justify-content-between gap-3 align-items-center text-decoration-none"
        to={"/"}
      >
        <img
          style={{ maxWidth: "150px" }}
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt=""
        />
        <p className="fs-4 fw-bold text-info">@ogretmenbabis</p>
        <p className="text-warning fw-bold fs-4">Ahmet Edition</p>
      </Link>
    </header>
  );
};

export default Header;
