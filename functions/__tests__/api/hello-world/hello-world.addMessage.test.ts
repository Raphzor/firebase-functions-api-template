import { describe, expect, it } from "@jest/globals";
import * as express from "express";
import { https } from "firebase-functions";
import { helloWorld } from "../../../src/api/hello-world/hello-world.handler";
import { HelloWorldController } from "../../../src/domains/hello-world/hello-world.controller";

jest.mock("../../../src/domains/hello-world/hello-world.controller");

describe("Tests for addMessage endpoint from HelloWorld API", () => {
  it("should call HelloWorldController.writeMessage once", async () => {
    const helloWorldcontrollerSpy = jest.spyOn(
      HelloWorldController,
      "writeMessage"
    );

    const mockReq: Partial<https.Request> = {};
    const mockAnswer = {
      send: (response: express.Response) => {
        expect(response).toBe("Hello from Firebase!");
      },
    };

    const expectedPayload = "doc_1";

    helloWorldcontrollerSpy.mockImplementationOnce(() => {
      return Promise.resolve(expectedPayload);
    });
    helloWorld(mockReq as https.Request, mockAnswer as express.Response<any>);
  });
});
