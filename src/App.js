// import logo from './logo.svg';
// import './App.css';
// import SearchForm from './Components/SearchForm';

// function App() {
//   return (
//     <div className="App">
//       <SearchForm />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ResultsPage from "./Components/ResultsPage/ResultsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/" element={<ResultsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
