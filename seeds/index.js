const mongoose = require('mongoose');
const campground = require('../model/campground');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/riahbukdb', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connnection error : "));
db.once('open', () => {
    console.log('Database Connected');
})

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const randomDB = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new campground({
            author:'61c7f5abadd590a4e6253f38',
            title: "Imanuels Campsite",
            location: `${cities[randomDB].city}, ${cities[randomDB].state}`,
            image: 'https://source.unsplash.com/random/484351',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae minima,et laboriosam a quod consequatur adipisci enim quia ipsum omnis in liberonostrum exercitationem culpa veniam, natus facilis aperiam magni.',
            price
        })
        await camp.save();
    }
}

seedDB();