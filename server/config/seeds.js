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
    },
    {
      name: 'Black Lotus - Beta Edition',
      description: 'Adds 3 mana of any single color of your choice to your mana pool, then is discarded. Tapping this artifact can be played as an interrupt.',
      image: 'blackLotus.jpg',
      category: categories[2]._id,
      price: 10000,
      quantity: 1
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
      userName: 'UserName',
      firstName: 'Bob',
      lastName: 'Test',
      email: 'test@gmail.com',
      password: 'superSecretPassword'
    },
    {
      userName: 'Mendelism',
      firstName: 'Haley',
      lastName: 'G',
      email: 'test1@gmail.com',
      password: 'evenSupererSecretPassword'
    }
  ])

  console.log('users seeded');

  process.exit();
});
