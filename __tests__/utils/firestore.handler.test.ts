import { describe, it } from "@jest/globals";
import { firestore, initializeApp } from "firebase-admin";
import { writeDocument } from "../../src/utils";

jest.mock("firebase-functions");
initializeApp();

describe("Tests for Firestore Handler utility", () => {
  describe("writeDocument", () => {
    it("should call firestore.collection.add once, with correct parameters", async (done) => {
      const collection = "collection_1";

      const firestoreMock: Partial<FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
      >> = {
        add: jest.fn().mockResolvedValueOnce(() => Promise.resolve({})),
      };
      const spyFirestore = jest.spyOn(firestore(), "collection");
      spyFirestore.mockImplementationOnce(
        () =>
          firestoreMock as FirebaseFirestore.CollectionReference<
            FirebaseFirestore.DocumentData
          >
      );
      await writeDocument(collection, { test: 123 });
      expect(spyFirestore).toBeCalledTimes(1);
      expect(spyFirestore).toBeCalledWith(collection);
      expect(firestoreMock.add).toBeCalledWith({ test: 123 });
      done();
    });
  });
});
