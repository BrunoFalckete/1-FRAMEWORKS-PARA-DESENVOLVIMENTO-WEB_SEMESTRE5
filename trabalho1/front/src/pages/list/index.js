import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import MainLayout from "../../layouts/main";
import axios from 'axios';

import './style.css'

function Page() {
    const [products, setProducts] = useState([])
    const [showInsertProductSection, setShowInsertProductSection] = useState(false)
    let page = 1;


    // inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [rating, setRating] = useState(0);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const loadProducts = () => {
      axios.get(`http://localhost:5000/products?page=${page}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then((response) => {
          const data = response.data;
  
          setProducts((prevProducts) => prevProducts.concat(data))
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da rota:', error);
        });
    }

    const handleAddProduct = () => {
      axios.post(`http://localhost:5000/products`, {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then((response) => {
          alert('Produto adicionado com sucesso')
          setShowInsertProductSection(false)
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da rota:', error);
        });
    }

    useEffect(() => {
      loadProducts()
    },);

    useEffect(() => {
      const handleScroll = () => {
        // Verifica se o usuário chegou ao final da página
        if (
          document.documentElement.scrollTop > 7e2 &&
          window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
          page++
          loadProducts()
        }
      };
  
      // Adiciona um event listener para o evento de rolagem da janela
      window.addEventListener('scroll', handleScroll);
  
      // Remove o event listener quando o componente for desmontado
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },)

    return (
      <MainLayout>
        <header>
          <h1>Lojinha Shein</h1>

          <button onClick={() => setShowInsertProductSection(true)}>Adicionar</button>
        </header>

        {
          showInsertProductSection && (
            <div className="insert-product-container">
              <h3>Adicione um produto</h3>
              <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
              <input placeholder="Desconto" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />
              <input placeholder="Avaliação" value={rating} onChange={(e) => setRating(e.target.value)} />
              <input placeholder="Estoque" value={stock} onChange={(e) => setStock(e.target.value)} />
              <input placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
              <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
              <input placeholder="Thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
              <button onClick={handleAddProduct}>Adicionar</button>
            </div>
          )
        }

        <main>
          <h3>Total: {products.length}</h3>

          <div className="list-grid">
            {
              products.map((e) => <ProductCard key={e.id} product={e} />)
            }
          </div>
        </main>
      </MainLayout>
    );
  }
  
  export default Page;
  
