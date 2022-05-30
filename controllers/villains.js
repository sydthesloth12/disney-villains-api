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
  const slugSearch = request.params.slug;

  const foundSlug = await villains.findOne({
    where: { slug: slugSearch },
  });

  if (foundSlug) {
    return response.status(200).send(foundSlug);
  } else {
    return response.status(404).send("Slug not found");
  }
};

const addVillain = async (request, response) => {
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
};

module.exports = {
  getAllVillains,
  getVillainBySlug,
  addVillain,
};
