import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ItemsList from './pages/items/ItemsList';
import ItemForm from './pages/items/ItemForm';
import ItemDetail from './pages/items/ItemDetail';
import BranchesList from './pages/branches/BranchesList';
import BranchForm from './pages/branches/BranchForm';
import BranchDetail from './pages/branches/BranchDetail';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="items" element={<ItemsList />} />
          <Route path="items/new" element={<ItemForm />} />
          <Route path="items/edit/:id" element={<ItemForm />} />
          <Route path="items/:id" element={<ItemDetail />} />
          <Route path="stores" element={<BranchesList />} />
          <Route path="stores/new" element={<BranchForm />} />
          <Route path="stores/edit/:id" element={<BranchForm />} />
          <Route path="stores/:id" element={<BranchDetail />} />
          <Route path="map" element={<MapPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
