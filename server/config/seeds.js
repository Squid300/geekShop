const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Warhammer', image: 'http://placecorgi.com/600/250' },
    { name: 'Vintage Video Games', image: 'http://placecorgi.com/600/251' },
    { name: 'Trading Cards', image: 'http://placecorgi.com/600/252' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Mortarion, Daemon Primarch of Nurgle',
      description:
        'For ten thousand years Mortarion, Lord of the Death Guard, has crushed his enemies upon the field of battle. Surrounded by chittering Daemon mites, droning flies and noxious plague vapours, Mortarion swoops into battle on vast, creaking wings. the thudding beat of these foul pinions fills the enemy with crawling dread, even as they waft the reek of death across their lines.',
      image: 'http://placekitten.com/600/600',
      category: categories[0]._id,
      price: 160,
      quantity: 3,
      sold: 6
    },
    {
      name: 'Blades of Steel',
      description: 'Blades of Steel is an ice hockey video game released by Konami for the Nintendo Entertainment System in 1988.',
      image: 'http://placekitten.com/600/601',
      category: categories[1]._id,
      price: 31.00,
      quantity: 10,
      sold: 20
    },
    {
      name: 'Black Lotus - Beta Edition',
      description: 'Adds 3 mana of any single color of your choice to your mana pool, then is discarded. Tapping this artifact can be played as an interrupt.',
      image: 'http://placekitten.com/600/602',
      category: categories[2]._id,
      price: 10000,
      quantity: 1,
      sold: 0
    },
    {
      name: 'Warhammer Age of Sigmar: Dominion',
      description: 'If you’re looking to plunge headfirst into the new edition of Warhammer Age of Sigmar, look no further than this glorious boxed set. Includes two powerful armies, pitting the reforged Stormcast Eternals against the emerging threat of the Kruleboyz – cunning and deadly orruks native to the swamps of Ghur.',
      image: 'http://placekitten.com/600/603',
      category: categories[0]._id,
      price: 108.77,
      quantity: 18,
      sold: 15
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
      firstName: 'Ben',
      lastName: 'A',
      email: 'test@gmail.com',
      password: 'superSecretPassword'
    },
    {
      firstName: 'Haley',
      lastName: 'G',
      email: 'test1@gmail.com',
      password: 'evenSupererSecretPassword'
    }
  ])

  console.log('users seeded');

  process.exit();
});
