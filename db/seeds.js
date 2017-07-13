const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/cheeky-beers';
mongoose.connect(dbURI);

const User = require('../models/user');
const Beer = require('../models/beer');

User.collection.drop();
Beer.collection.drop();

User
  .create([{
    username: 'Mark',
    email: 'look@me.com',
    password: 'pw',
    passwordConfirmation: 'pw'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Beer
      .create([{
        name: 'Atlantic APA',
        brand: 'Brixton Brewery',
        style: 'Pale Ale',
        percentage: '5.4',
        description: 'Brixton’s famous street market winds down Atlantic Road, where bold exotic aromas and flavours compete for passing attention, a bit like this beer. Inspired by the legendary American Pale Ales, Citra and Simcoe hops deliver bursts of tropical fruit and a refreshing finish.',
        image: ['../assets/images/beers/Brixton-Atlantic-APA.jpg']
      }, {
        name: 'Soundwave',
        brand: 'Siren Craft Brew',
        style: 'IPA',
        percentage: '5.6',
        description: 'Soundwave smacks you about with intense grapefruit, peach and mango hop flavours before leading into a lengthy, dry and resinous finish. The kind of beer you’d want to suck down while chowing on a tasty salt beef sandwich or a citrusy stir-fry.',
        image: ['../assets/images/beers/Siren-Soundwave.jpg']
      }, {
        name: 'Brooklyn Lager',
        brand: 'Brooklyn Brewery',
        style: 'Vienna Lager',
        percentage: '5.2',
        description: 'Brooklyn Lager is aromatically enhanced using the centuries-old British technique of \'dry-hopping\'. The result is an amber-gold Viennese-style lager beer with a refreshing bitterness and floral hop aroma.',
        image: ['../assets/images/beers/Brooklyn-Lager.jpg']
      }, {
        name: '312',
        brand: 'Goose Island',
        style: 'Wheat Ale',
        percentage: '4.2',
        description: 'Barack Obama\'s favourite beer, inspired by the city of Chicago, 312 is densely populated with flavour. The spicy aroma of Cascade hops is followed by a crisp, fruity ale flavor that\'s immensely refreshing.',
        image: ['../assets/images/beers/Goose-Island-312.jpg']
      }, {
        name: 'Punk IPA',
        brand: 'BrewDog',
        style: 'IPA',
        percentage: '5.6',
        description: 'Layered with new world hops to create an explosion of tropical fruit and an all-out riot of grapefruit, pineapple and lychee before a spiky bitter finish, this is transatlantic fusion running at the fences of lost empires.',
        image: ['../assets/images/beers/BrewDog-Punk-IPA.jpg']
      }, {
        name: 'Neck Oil',
        brand: 'Beaver Town',
        style: 'Session IPA',
        percentage: '4.3',
        description: 'Picture sucking a few of these down in front of the barbecue in a park on a sun-shiny day – that’s this beer’s raison d’etre. Light, crisp and refreshing with punchy notes of citrus peel and light pine, Neck Oil is nicely balanced with slightly sweet biscuity malt throughout, finishing with a medium grapefruit bitterness.',
        image: ['../assets/images/beers/Beavertown-Neck-Oil.jpg']
      }]);
  })
  .then((beers) => {
    console.log(`${beers.length} beers created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
