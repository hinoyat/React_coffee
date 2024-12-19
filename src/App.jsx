import './App.css'
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function Header() {
  return (
    <header>
      <h1>header</h1>
    </header>
  );
};

// "/products" 제품 리스트
//"/products/:id" 제품 상세 정보

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/product" element={<ProductList />} />
            {/* 상세 페이지 가야겠지? */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
