import { Route, Routes } from "react-router-dom";
import Workshops from "./pages/WorkshopsPage/WorkshopsPage";
import Lecturers from "./pages/LecturersPage/LecturersPage";
import Administration from "./pages/AdministrationPage/AdministrationPage";
import Navbar from "./components/Navbar/Navbar";
import LecturerWorkshops from "./pages/LecturerWorkshops/LecturerWorkshops";

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
              <Route path="/predavaci/:id" element={<LecturerWorkshops />} />
              <Route path="/administracija" element={<Administration />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
};

export default App;
