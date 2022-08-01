import './App.css';
import Products from './components/products';
import Users from  './components/users';
import Categories from './components/categories';


function App() {
  return (
    <div className="App">
        <div className="contenedorEstadistica">
          <Products></Products>
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