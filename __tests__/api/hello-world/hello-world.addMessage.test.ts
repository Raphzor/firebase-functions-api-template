import { describe, expect, it } from "@jest/globals";
import * as express from "express";
import { https } from "firebase-functions";
import {
  addMessage,
  helloWorld,
} from "../../../src/api/hello-world/hello-world.handler";
import * as HelloWorldController from "../../../src/domains/hello-world/hello-world.controller";

jest.mock("../../../src/domains/hello-world/hello-world.controller");

const mockReq = (reqData) => {
  return (reqData as unknown) as https.Request;
};
const mockRes = () => {
  const result: Partial<express.Response> = {};
  result.status = jest.fn().mockReturnValue(result);
  result.json = jest.fn().mockReturnValue(result);
  result.send = jest.fn().mockReturnValue(result);
  return result as express.Response;
};
const req = mockReq({ query: { text: "test" } });
const res = mockRes();

describe("Tests for addMessage endpoint from HelloWorld API", () => {
  it("should call HelloWorldController.writeMessage once", async () => {
    const mockDoc = "doc_1";

    const mockController = jest.spyOn(HelloWorldController, "writeMessage");
    mockController.mockImplementationOnce(async () => {
      return await Promise.resolve(mockDoc);
    });

    await addMessage(req, res);

    expect(mockController).toBeCalledWith("test");
    expect(mockController).toHaveBeenCalledTimes(1);
  });

  it("should return a message back as result", async () => {
    const mockDoc = "doc";
    const expectedPayload = { result: `Message with ID: ${mockDoc} added.` };

    const mockController = jest.spyOn(HelloWorldController, "writeMessage");
    mockController.mockImplementationOnce(async () => {
      return await Promise.resolve(mockDoc);
    });

    await addMessage(req, res);

    expect(res.json).toHaveBeenCalledWith(expectedPayload);
  });

  it("should return a 200 status", async () => {
    const mockController = jest.spyOn(HelloWorldController, "writeMessage");
    mockController.mockImplementationOnce(async () => {
      return await Promise.resolve(null);
    });

    await addMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Tests for helloWorld endpoint from Hello World API", () => {
  it("should return a standard message when helloWorld is called", async () => {
    const mockController = jest.spyOn(HelloWorldController, "writeMessage");
    mockController.mockImplementationOnce(async () => {
      return await Promise.resolve(null);
    });

    await helloWorld(req, res);

    expect(res.send).toHaveBeenCalledWith("Hello from Firebase!");
  });
});
