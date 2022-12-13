To start this web-app you will need Node.js and npm to be installed. The latest version,  `node: 19.2.9` `npm: 9.2.0`, works. It requires two terminals to be open, one to run the frontend and one for the backend.

#### Frontend
Open a terminal in the frontend directory and run `npm install` and then `npm start`

#### Backend
First, the `.env` file must be modified. The DB_PASS needs to be given the password used for MySQL. By default it uses root user. Then, open a terminal in the backend directory and run `npm install` and then `npm run server`