import { describe, expect, it } from "@jest/globals";
import * as express from "express";
import { https } from "firebase-functions";
import { helloWorld } from "../../../src/api/hello-world/hello-world.handler";

describe("Tests for helloWorld endpoint from Hello World API", () => {
  it("should return a message when helloWorld is called", (done) => {
    const mockReq: Partial<https.Request> = {};
    const mockAnswer = {
      send: (response: express.Response) => {
        expect(response).toBe("Hello from Firebase!");
        done();
      },
    };
    helloWorld(mockReq as https.Request, mockAnswer as express.Response<any>);
  });
});
