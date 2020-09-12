import { firestore, logger } from "firebase-functions";

export class FirestoreHandler {
  // Listens for new messages added to /messages/:documentId/original and creates an
  // uppercase version of the message to /messages/:documentId/uppercase
  static async makeUppercase(doc: string) {
    firestore.document(doc).onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({ uppercase }, { merge: true });
    });
  }
}
