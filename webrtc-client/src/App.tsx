import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';

const Routing = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
   );
}
 
export default Routing;