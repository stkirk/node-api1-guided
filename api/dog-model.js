const { nanoid } = require("nanoid");

function getId() {
  return nanoid().slice(0, 5);
}

//single table in this fake database
//dogs table
let dogs = [
  { id: getId(), name: "Captain", weight: 25 }, // row or record
  { id: getId(), name: "Doggo", weight: 13 }, //another record
];

//real database might have an adopters table to complement dogs table

// global node variable with exports property, set to whatever we want, becomes the 'thing' other files can read and use
// whatever we set modules.export to be (in this case an object full of helper functions), becomes requireable to other files
module.exports = {
  async findAll() {
    // SELECT * FROM dogs;
    // return Promise.resolve(dogs);
    return dogs;
  },

  async findById(id) {
    // SELECT * FROM dogs WHERE id = 1;
    const dog = dogs.find((d) => d.id === id);
    return dog;
  },

  async create({ name, weight }) {
    // INSERT INTO dogs (id, name, weight) VALUES ('xyz', 'Foo', 10);
    const newDog = { id: getId(), name, weight };
    dogs.push(newDog);
    return newDog;
  },

  async update(id, changes) {
    // UPDATE dogs SET name = 'Foo', weight = 9 WHERE id = 1;
    const dog = dogs.find((dog) => dog.id === id);
    if (!dog) return null;

    const updatedDog = { ...changes, id };
    dogs = dogs.map((d) => (d.id === id ? updatedDog : d));
    return updatedDog;
  },

  async delete(id) {
    // DELETE FROM dogs WHERE id = 1;
    const dog = dogs.find((dog) => dog.id === id);
    if (!dog) return null;

    dogs = dogs.filter((d) => d.id !== id);
    return dog;
  },
};
