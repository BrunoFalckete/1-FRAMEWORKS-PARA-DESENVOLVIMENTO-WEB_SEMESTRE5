class ProductService {
  async getAllProducts() {
    try {
      const response = await fetch("http://localhost:8000/api/products");
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductService;
