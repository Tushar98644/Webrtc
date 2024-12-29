import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;