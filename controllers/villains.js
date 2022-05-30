const { villains } = require("../models/index");

const getAllVillains = async (request, response) => {
  try {
    const listOfVillains = await villains.findAll();

    return response.send(listOfVillains);
  } catch (error) {
    return response.sendStatus(500);
  }
};

const getVillainBySlug = async (request, response) => {
  try {
    const { searchTerm } = request.params;

    if (!searchTerm) return response.sendStatus(404);

    const foundSlug = await villains.findOne({
      where: { slug: searchTerm },
    });

    if (!foundSlug) return response.sendStatus(404);

    return response.send(foundSlug);
  } catch (error) {
    return response.sendStatus(500);
  }
};

const addVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body;

    if (!name || !movie || !slug) {
      return response
        .status(404)
        .send("Please enter all fields; name, movie, slug");
    }

    const newVillain = await villains.create({
      name,
      movie,
      slug,
    });

    return response.status(201).send(newVillain);
  } catch (error) {
    return response.sendStatus(500);
  }
};

module.exports = {
  getAllVillains,
  getVillainBySlug,
  addVillain,
};
