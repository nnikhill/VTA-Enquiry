import { Routes, Route } from "react-router-dom";
import EnquiryForm from "./pages/EnquiryForm";
import SuccessPage from "./pages/SuccessPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnquiryForm />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;