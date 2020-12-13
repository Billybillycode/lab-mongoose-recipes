const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // ---Iteration 2 ----
    Recipe.create({
      title: "Pizza 3 fromage",
      level: "Amateur Chef",
      cuisine: "Italian",
      dishType: "main_course",
      ingredient: ["mozzarella", "comté", "gorgonzola"],
      image: "https://assets.afcdn.com/recipe/20160926/5624_w600.jpg",
      duration: 20,
      creator: "Mama Primi",
    })
    .then((recipe) => {
      console.log(recipe.title);
      // ---Iteration 3---

      Recipe.insertMany(data);
      data.forEach((element) => {
        console.log(element.title);
      });
    });

    //--Iteration 4 ---
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("!!!succes duration changed!!!");

    Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
