import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/HomePage";
import PasswordMngForm from "./components/NewPassMngForm/PasswordMngForm";
import PasswordMngCard from "./components/PassMngCard/PasswordMngCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route exact path="/" element={<Home />} />
        {/* A form will be displayed to create new password */}
        <Route exact path="/add-new-password" element={<PasswordMngForm />} />
        {/* Displaying all saved passwordS */}
        <Route exact path="/show-my-passwords" element={<PasswordMngCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
