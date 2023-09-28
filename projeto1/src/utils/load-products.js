export const loadProducts = async (productService) => {
  const products = await productService.getAllProducts();

  if (products !== null) return products;

  return [];
};
