import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ResultsPage from "./Components/ResultsPage/ResultsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">E-commerce</h1>
        </header>

        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
