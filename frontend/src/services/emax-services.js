import axios from "axios";

export const _transformProduct = (product) => {
  return {
    _id: product.id,
    name: product.name,
    image: product.image,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    countInStock: product.count_in_stock,
    rating: product.rating,
    numReviews: product.num_reviews,
  };
};

export const _transformUserInfo = (user) => {
  return {
    email: user.email,
    exp: user.exp,
    firstName: user.first_name,
    jti: user.jti,
    tokenType: user.token_type,
    _id: user.user_id,
    username: user.username,
  };
};

export const fetchProducts = async () => {
  const { data } = await axios.get("/api/products/");
  const transformedData = data.map((product) => _transformProduct(product));
  return transformedData;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const transformedData = _transformProduct(data);
  return transformedData;
};
