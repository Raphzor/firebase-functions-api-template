import { describe, expect, it } from "@jest/globals";
import * as express from "express";
import { https } from "firebase-functions";
import {
  addMessage,
  helloWorld,
} from "../../../src/api/hello-world/hello-world.handler";
import * as HelloWorldController from "../../../src/domains/hello-world/hello-world.controller";

jest.mock("../../../src/domains/hello-world/hello-world.controller");

describe("Tests for addMessage endpoint from HelloWorld API", () => {
  const mockReq = (reqData) => {
    return (reqData as unknown) as https.Request;
  };
  const mockRes = () => {
    const res: Partial<express.Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as express.Response;
  };
  const req = mockReq({ query: { text: "test" } });
  const res = mockRes();

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
  it("should return a message when helloWorld is called", (done) => {
    const mockReq: Partial<https.Request> = {};
    const mockRes = {
      send: (response: express.Response) => {
        expect(response).toBe("Hello from Firebase!");
        done();
      },
    };
    helloWorld(mockReq as https.Request, mockRes as express.Response<any>);
  });
});
