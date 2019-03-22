# EmailSender

https://email-sender-applciation.herokuapp.com/

Email application built on TypeScript+React+Redux/Node+Express

Users need to provide credit card info to get ability to create surveys

Authenticated users can create new surveys to collect feedback from peoples via emails

User need to provide subject and body of survey, list of emails separated by comma

People will receive email with provided data and respond with YES or NO

Registration/Authorization done with Google OAuth 2.0 strategy

Project tested with Jest+Enzyme

## TEST DATA FOR CREDIT CARDS:

- card number: 4242 4242 4242 4242
- mm/yy: 10/20
- cvc: 1234

## Scripts:

    - ```npm run dev``` - to launch local dev-server (client+backend)
    - ```npm run server`` - to launch ONLY backend part
    - ```npm run client``` -  to launch ONLY client part

### Used tools:

1. [TypeScript](https://typescriptlang.org) + [React](https://reactjs.org/) + [Redux](https://redux.js.org/) on front
2. [TypeScript](https://typescriptlang.org) + [Node](https://nodejs.org/) + [Experss](https://expressjs.com/) on back
3. [MongoDB](https://www.mongodb.com/) for database
4. [Stripe](https://stripe.com/) for handling credit cards
