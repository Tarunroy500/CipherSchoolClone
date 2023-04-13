
# Cipher Schools Clone


This project is a web application that allows users to authenticate using Passport.js. It uses MongoDB to store user information and Express to create a server that handles authentication requests.


## Getting Started
To get started with this project, follow the steps below:
## Tech Stack

**Client:** Expressjs, HTML , CSS

**Server:** Node, Express


## Prerequisites


- Node.js
- npm
- MongoDB
- MongoDB Compass


## Run Locally

1) Clone the project

```bash
https://github.com/Tarunroy500/CipherSchoolClone.git
```

1) Go to the project directory

```bash
cd CipherSchoolClone
```

2) Install dependencies

```bash
  npm install
```



3) Start MongoDB server.

4) Connect to MongoDB server using MongoDB Compass.

5) In MongoDB Compass, create a new database with name "mydatabase".

6) Create a new collection with name "mycollection" in the "mydatabase". 
7) In the project folder, create a .env file and add the following:
```bash
MONGODB_URI=mongodb://localhost:27017/mydatabase
```
Replace mydatabase with the name of the database you created in MongoDB Compass.

8) Run the project:

```bash
  npx nodemon
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`




## License

[MIT](https://choosealicense.com/licenses/mit/)


## Usage

The project provides a web application that can be accessed through a browser at http://localhost:3000
