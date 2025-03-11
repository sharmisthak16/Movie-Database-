import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import "./app.css";
import { routePath } from "./constants/routes";
import CategoryMovies from "./pages/CategoryMovies";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={routePath.home}
          element={<Home />}
        />
        <Route
          path={routePath.categories}
          element={<CategoryMovies />}
        />
        <Route
          path={routePath.invalid}
          element={<Home />}
        />
      </Routes>
    </Router>
  );
}

export default App;
