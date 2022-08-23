const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Warhammer' },
    { name: 'Vintage Video Games' },
    { name: 'Trading Cards' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Mortarion, Daemon Primarch of Nurgle',
      description:
        'For ten thousand years Mortarion, Lord of the Death Guard, has crushed his enemies upon the field of battle. Surrounded by chittering Daemon mites, droning flies and noxious plague vapours, Mortarion swoops into battle on vast, creaking wings. the thudding beat of these foul pinions fills the enemy with crawling dread, even as they waft the reek of death across their lines.',
      image: 'mortarion.jpg',
      category: categories[0]._id,
      price: 160,
      quantity: 3
    },
    {
      name: 'Blades of Steel',
      description: 'Blades of Steel is an ice hockey video game released by Konami for the Nintendo Entertainment System in 1988.',
      image: 'bladesOfSteel.jpg',
      category: categories[1]._id,
      price: 31.00,
      quantity: 10
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  console.log('users seeded');

  process.exit();
});
