import { Route, Routes } from "react-router-dom";

import Workshops from "./pages/Workshops/Workshops";
import Lecturers from "./pages/Lecturers/Lecturers";
import Administration from "./pages/Administration/Administration";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/radionice" element={<Workshops />} />
              <Route path="/predavaci" element={<Lecturers />} />
              <Route path="/administracija" element={<Administration />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
};

export default App;
