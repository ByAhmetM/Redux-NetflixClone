import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detay/:id" element={<DetailPage />} />
          <Route path="*" element={<h1>Yol Bulunamadı</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
