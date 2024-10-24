import { expect, assert } from "chai";
import hre from "hardhat";
import { Cagnotte } from "../../typechain-types";

describe("Test Cagnotte Contract", function () {
  let deployedContract;
  let owner, addr1, addr2;

  describe("Initialization", function () {
    beforeEach(async function () {
      [owner, addr1, addr2] = await hre.ethers.getSigners();
      const Cagnotte = await hre.ethers.deployContract("Cagnotte", [10]);
      deployedContract = Cagnotte;
    });

    it("should deploy the contract and get the owner", async function () {
      let theOwner = await deployedContract.owner();
      assert(owner.address == theOwner);
    });

    it("should have the goal to be set to more than 0", async function () {
      let goal = await deployedContract.goal();
      assert(goal > 0);
    });
  });

  describe("Test Deposit", function () {
    beforeEach(async function () {
      [owner, addr1, addr2] = await hre.ethers.getSigners();
      const Cagnotte = await hre.ethers.deployContract("Cagnotte", [10]);
      deployedContract = Cagnotte;
    });

    it("should not be able to deposit amount =< 0", async function () {
      await expect(deployedContract.deposit()).to.be.revertedWith(
        "Deposit must be greater than 0"
      );
    });

    it("should increase the balance by the ether value send", async function () {
      let ethAmount = hre.ethers.parseEther("5");
      await deployedContract.connect(addr1).deposit({ value: ethAmount });
      let balance = await deployedContract.given(addr1.address);
      assert(ethAmount == balance);
    });

    it("should emit a deposit event", async function () {
      let ethAmount = hre.ethers.parseEther("5");
      await expect(deployedContract.deposit({ value: ethAmount }))
        .to.emit(deployedContract, "Deposit")
        .withArgs(owner.address, ethAmount);
    });
  });

  describe("Test Withdraw", function () {
    beforeEach(async function () {
      [owner, addr1, addr2] = await hre.ethers.getSigners();
      const Cagnotte = await hre.ethers.deployContract("Cagnotte", [10]);
      deployedContract = Cagnotte;
    });

    // it("should have the balance of the contract greater than the goal", async function () {
    //     let balance = deployedContract.
    // })
  });
});
