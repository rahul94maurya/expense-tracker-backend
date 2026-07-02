const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");

const categories = require("./data/categories");
const subcategories = require("./data/subCatogories");

const categoriesSeed = async () => {
  const existingCategories = await Category.countDocuments();
  if (existingCategories > 0) return;

  const insertedCategories = await Category.insertMany(categories);

  const categoryMap = {};
  insertedCategories.forEach((cat) => {
    categoryMap[cat.name] = cat._id;
  });

  const subcategoriesToInsert = [];

  for (const group of subcategories) {
    for (const item of group.items) {
      subcategoriesToInsert.push({
        name: item,
        categoryId: categoryMap[group.category],
      });
    }
  }

  await Subcategory.insertMany(subcategoriesToInsert);
};

module.exports = categoriesSeed;
