//  src/Options/Options.jsx
import data from "../Data/data.jsx";


const Options = {
  getColors: () => {
    const allColors = data.flatMap(item => item.color || []);
    return [...new Set(allColors.map(c => c.trim()))];
  },

  getMaterial: () => {
    const allMaterials = data.map(item => item.material);
    return [...new Set(allMaterials.map(m => m.trim()))];
  },

  getCategory: () => {
    const allCategories = data.flatMap(item => item.category || []);
    return [...new Set(allCategories.map(c => c.trim()))];
  },

  getSize: () => {
    const allSizes = data.flatMap(item => item.size || []);
    const unique = [...new Set(allSizes.map(s => s.trim()))];
    const sizeOrder = ["S", "M", "L", "XL", "XXL", "XXXL"];
    return sizeOrder.filter(size => unique.includes(size));
  },
};

<<<<<<< HEAD
export default Options;
=======
export default Options;
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
