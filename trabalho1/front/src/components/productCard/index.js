import Card from "../card";

import './style.css'

function ProductCard({product}) {
    return (
      <div className="list-item product-card">
        <Card>
          <section>
            <img className="thumbnail" src={product.thumbnail} />
          </section>

          <section>
            <h2>{product.title} - {product.brand} <sup className="category">{product.category}</sup></h2>
          </section>

          <section>
            <h3>
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, })}
              <sup className="mark">{product.discountPercentage} OFF</sup>
              <small>⭐ {product.rating}</small>
            </h3>
            <p>Em estoque: {product.stock}</p>
          </section>

          <section>
            <p><small>{product.description}</small></p>
          </section>

          <button>Ver</button>
        </Card>
      </div>
    );
  }
  
  export default ProductCard;
  