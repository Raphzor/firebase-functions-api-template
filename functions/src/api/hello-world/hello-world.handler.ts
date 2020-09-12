import { https } from "firebase-functions";
import { HelloWorldController } from "../../domains/hello-world/hello-world.controller";
import { FirestoreHandler } from "../../utils/firestore.handler";

export const helloWorld = https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const addMessage = https.onRequest((req, res) =>
  HelloWorldController.writeMessage(req, res)
);

export const makeMessagesUppercase = FirestoreHandler.makeUppercase(
  "/messages/{documentId}"
);
