import { CloudFunction, https, HttpsFunction } from "firebase-functions";
import { writeMessage } from "../../domains/hello-world/hello-world.controller";
import { makeUppercase } from "../../utils/firestore.handler";

export const helloWorld: HttpsFunction = https.onRequest((_req, res) => {
  res.send("Hello from Firebase!");
});

export const addMessage: HttpsFunction = https.onRequest(
  async (req: https.Request, res) => {
    // Grab the text parameter.
    const text: string = req.query.text.toString();
    // Call the controller
    const docId = await writeMessage(text);
    // Send back a message to the user, that we've succesfully written the message
    res.status(200);
    res.json({ result: `Message with ID: ${docId} added.` });
  }
);

export const makeMessagesUppercase: CloudFunction<any> = makeUppercase(
  "/messages/{documentId}"
);
