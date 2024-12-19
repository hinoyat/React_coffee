// src/components/ProductList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

function ProductList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'priceLow', 'priceHigh'

  // 샘플 데이터
  const products = [
    { productId: 1, productName: "아메리카노", price: 4500, category: "COFFEE" },
    { productId: 2, productName: "카페라떼", price: 5000, category: "COFFEE" },
    { productId: 3, productName: "카푸치노", price: 5000, category: "COFFEE" },
    { productId: 4, productName: "녹차", price: 4000, category: "TEA" },
    { productId: 5, productName: "홍차", price: 4000, category: "TEA" },
  ];

  // unique 카테고리 추출
  const categories = ['ALL', ...new Set(products.map(p => p.category))];

  // 필터링 및 정렬 로직
  const filteredAndSortedProducts = products
    // 카테고리 필터링
    .filter(product => 
      selectedCategory === 'ALL' ? true : product.category === selectedCategory
    )
    // 검색어 필터링
    .filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // 정렬
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        default:
          return a.productName.localeCompare(b.productName);
      }
    });

  // 상품 상세 페이지로 이동
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-list-container">
      {/* 필터링 및 검색 컨트롤 */}
      <div className="controls">
        {/* 검색 */}
        <input
          type="text"
          placeholder="메뉴 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* 카테고리 필터 */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* 정렬 옵션 */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">이름순</option>
          <option value="priceLow">가격 낮은순</option>
          <option value="priceHigh">가격 높은순</option>
        </select>
      </div>

      {/* 상품 리스트 */}
      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <div
            key={product.productId}
            className="product-item"
            onClick={() => handleProductClick(product.productId)}
          >
            <h3 className="product-name">{product.productName}</h3>
            <p className="product-price">{product.price.toLocaleString()}원</p>
            <p className="product-category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;