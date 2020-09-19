import { https } from "firebase-functions";
import { HelloWorldController } from "../../domains/hello-world/hello-world.controller";
import { FirestoreHandler } from "../../utils/firestore.handler";

export const helloWorld = https.onRequest((_req, res) => {
  res.send("Hello from Firebase!");
});

export const addMessage = https.onRequest((req, res) => {
  // Grab the text parameter.
  const text: string = req.query.text.toString();

  // Call the controller
  const docId = HelloWorldController.writeMessage(text);

  // Send back a message to the user, that we've succesfully written the message
  res.status(200).json({ result: `Message with ID: ${docId} added.` });
});

export const makeMessagesUppercase = FirestoreHandler.makeUppercase(
  "/messages/{documentId}"
);
