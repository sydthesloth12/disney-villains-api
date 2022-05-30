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
const { villainsList, jafarVillain } = require("../mocks/villains");

chai.use(sinonChai);
const { expect } = chai;

describe("Testing the villains controller", () => {
  let sandbox = sinon.createSandbox();
  let stubFindAll = sandbox.stub(villains, "findAll");
  let stubFindOne = sandbox.stub(villains, "findOne");
  let stubSend = sandbox.stub();
  let stubStatus = sandbox.stub();
  let stubSendStatus = sandbox.stub();
  let response = {
    send: stubSend,
    sendStatus: stubSendStatus,
    status: stubStatus,
  };

  beforeEach(() => {
    stubStatus.returns({ send: stubSend });
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe("getAllVillains", () => {
    it("gets all the villains from database and responds w response.send", async () => {
      stubFindAll.returns(villainsList);

      await getAllVillains({}, response);

      expect(stubFindAll).to.have.callCount(1);
      expect(stubSend).to.have.been.calledWith(villainsList);
    });

    it("returns 500 when database down, throws error in process", async () => {
      stubFindAll.throws("error");

      await getAllVillains({}, response);

      expect(stubFindAll).to.have.callCount(1);
      expect(stubSendStatus).to.have.been.calledWith(500);
    });
  });

  describe("getVillainBySlug", () => {
    it("retrieves only the hero w/ users provided slug from the database, and responds with it", async () => {
      const request = { params: { searchTerm: "jafar" } };

      stubFindOne.returns(jafarVillain);

      await getVillainBySlug(request, response);

      expect(stubFindOne).to.have.callCount(1);
      expect(stubSend).to.have.been.calledWith(jafarVillain);
    });
  });
});
