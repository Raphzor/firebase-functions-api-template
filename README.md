### Firebase Functions API template repo

This repository contains a template for a firebase functions api, with a structure that maintain SO, it's testable, set with Github CI and have starting issue templates.

Feel free to fork it and/or recommend enhancements opening up a ticket 😉️

## Initialization

1. Clone/fork the repo
2. Run `yarn install` inside `functions` folder.
3. Run `firebase login` and login with your Google account.
4. Run `firebase init` on the root folder. Create a new project, or select one already created.
5. Run `npm run serve` inside `functions` folder.
6. Test your function locally, calling `http://localhost:5001/amazing-budget-app/us-central1/addMessage?text=HelloWorld` from your browser, Postman, or any other curl requester.
7. On your Firebase console, check out if a doc was created with a `HelloWorld` text property, and `HELLOWORLD` upperCase property.
8. ENJOY! 😎️

## File structure

The file structure is as follows:

```

├── functions # Firebase functions root
    ├── __tests__ # Automated tests
    ├── api # Endpoints definitions
        └── _endpoint_folder_ # Endpoints folders
    └── index.ts # Entrypoint for function calls
├── domains # Domain controllers
    └── _controllers_folder_ # Controller folders
        └── _interfaces_folder_ # Interfaces for the controller
└── utils # Utilities for the api

```

## Packages included

- firebase-admin
- firebase-functions
- jest
- yarn
- tslint
- prettier
- Github CI
