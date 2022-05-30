const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { describe, it, afterEach, beforeEach } = require("mocha");
const {
  getAllVillains,
  getVillainBySlug,
  addVillain,
} = require("../../controllers/villains");
const { villains } = require("../../models/index");
const { heroesList } = require("../mocks/villains");

chai.use(sinonChai);
const { expect } = chai;
