import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Code from './components/code';
import SehatSaathiDashboard from './components/PatientDash';
import FooterDemo from './components/PatientFooter';

function App() {
  return (
    <>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      {/* <SehatSaathiDashboard /> */}
      <Code/>
    </>
  );
}

export default App;
