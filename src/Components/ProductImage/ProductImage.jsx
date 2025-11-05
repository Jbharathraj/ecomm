// src/Components/ProductImage/ProductImage.jsx
const importAllImages = (r) => {
  const images = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '').replace(/\.(png|jpg|jpeg)$/, '');
    images[fileName] = r(key);
  });
  return images;
};

const productImages = importAllImages(
  require.context('../Assets', false, /\.(png|jpe?g)$/)
);

export default productImages;
