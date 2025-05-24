import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";
import ViewPage from "./pages/ViewPage";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
