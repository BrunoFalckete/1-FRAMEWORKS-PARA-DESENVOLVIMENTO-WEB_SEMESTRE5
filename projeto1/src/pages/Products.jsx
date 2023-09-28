import { Component } from "react";
import ProductService from "../services/productService";
import { loadProducts } from "../utils/load-products";

class Products extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const productService = new ProductService();

    const products = await loadProducts(productService);

    if (products) this.setState({ products: products.products });
  };

  render() {
    return (
      <div className="">
        {this.state.products.map((product) => (
          <div className="" key={product.id}>
            <span>{product.description}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;
