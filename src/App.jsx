import './App.css';
import HomePage from './components/HomePage';
import EmpDetails from './components/EmpDetails';
import AddEdit from './components/AddEdit';
import Delete from './components/Delete';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addedit" element={<AddEdit />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/details" element={<EmpDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
