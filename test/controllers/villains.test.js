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
const { heroesList, villainsList } = require("../mocks/villains");

chai.use(sinonChai);
const { expect } = chai;

describe("Testing the villains controller", () => {
  let sandbox = sinon.createSandbox();
  let stubFindAll = sandbox.stub(villains, "findAll");
  let stubSend = sandbox.stub();
  let stubStatus = sandbox.stub();
  let stubSendStatus = sandbox.stub();
  let response = {
    send: stubSend,
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
  });
});
