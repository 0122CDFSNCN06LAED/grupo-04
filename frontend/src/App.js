import './App.css';
import Prodcuts from './components/products';
import Users from  './components/users';
import Categories from './components/categories';


function App() {
  return (
    <div className="App">
      <div className="contenedorEstadistica">
        <Prodcuts></Prodcuts>
      </div>
      <div className="contenedorEstadistica">
        <Users></Users>
      </div>
      <div className="contenedorEstadistica">
        <Categories/>
      </div>
    </div>
  );
}

export default App;