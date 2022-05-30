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
const {
  villainsList,
  jafarVillain,
  redSkullVillain,
  badVillain,
} = require("../mocks/villains");

chai.use(sinonChai);
const { expect } = chai;

describe("Testing the villains controller", () => {
  let sandbox = sinon.createSandbox();
  let stubFindAll = sandbox.stub(villains, "findAll");
  let stubFindOne = sandbox.stub(villains, "findOne");
  let stubCreate = sandbox.stub(villains, "create");
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
    it("returns a 404 when no hero is found in the db", async () => {
      const request = { params: { searchTerm: "villainDoesNotExist" } };

      stubFindOne.returns(null);

      await getVillainBySlug(request, response);

      expect(stubFindOne).to.have.been.calledWith({
        where: { slug: "villainDoesNotExist" },
      });
      expect(stubSendStatus).to.have.been.calledWith(404);
    });
    it("returns a 500 when the database errors out", async () => {
      const request = { params: { searchTerm: "jafar" } };

      stubFindOne.throws("ERROR!");

      await getVillainBySlug(request, response);

      expect(stubFindOne).to.have.been.calledWith({
        where: { slug: "jafar" },
      });
      expect(stubSendStatus).to.have.been.calledWith(500);
    });
  });
  describe("addVillain", () => {
    it("accepts a new villain and saves to db, returns status of 201 and villain", async () => {
      const request = { body: redSkullVillain };

      stubCreate.returns(redSkullVillain);

      await addVillain(request, response);

      expect(stubCreate).to.have.been.calledWith(redSkullVillain);
      expect(stubStatus).to.have.been.calledWith(201);
      expect(stubSend).to.have.been.calledWith(redSkullVillain);
    });
    it("returns a 404 when the user forgets to include all the required fields ", async () => {
      const request = { body: badVillain };

      await addVillain(request, response);

      expect(stubStatus).to.have.been.calledWith(404);

      expect(stubSend).to.have.been.calledWith(
        "Please enter all fields; name, movie, slug"
      );
    });
    it("returns a 500 status code if the database fails", async () => {
      const request = { body: redSkullVillain };

      stubCreate.throws("Error!");

      await addVillain(request, response);

      expect(stubCreate).to.have.been.calledWith(redSkullVillain);
      expect(stubSendStatus).to.have.been.calledWith(500);
    });
  });
});
