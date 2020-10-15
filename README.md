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

## Setup Github Actions

Github CI is set on this repo. To run it properly, do the following:

1. Run `firebase login:ci`. This will retrieve you with a Token
2. On Github, go to the repo Settings -> Secrets, and add a new secret called `FIREBASE_TOKEN`. Paste the Token from step 1.
3. Every new pull request will run Github CI. Link your dev environment to the `develop` branch, and your production env to the `master` branch.

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
