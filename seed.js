require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Misc', sortOrder: 10},
    {name: 'Beer', sortOrder: 20},
    {name: 'Mixed Drinks', sortOrder: 30},

  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Green Paint', category: categories[0], price: 5.95},
    {name: 'Glue', category: categories[0], price: 6.95},
    {name: 'Milk Steak', category: categories[0], price: 3.95},
    {name: 'Wine in a can', category: categories[1], price: 14.95},
    {name: 'The Country Mac', category: categories[2], price: 13.95},
    {name: 'Nightman', category: categories[2], price: 25.95},
    {name: 'The Bird (Dee)', category: categories[2], price: 1.95},
    {name: 'Trashman', category: categories[2], price: 4.95},
    {name: 'Milk with bathsalts', category: categories[2], price: 3.95},
    {name: '5-star man', category: categories[2], price: 7.95},
    {name: 'Golden God', category: categories[2], price: 9.95}
]);

  console.log(items)

  process.exit();

})();
