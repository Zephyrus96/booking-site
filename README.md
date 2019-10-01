# How to run the app:

## Step 1:
This app uses the Ticketmaster Discovery API, so head on over to https://developer.ticketmaster.com.
Create an account if you don't already have one, and get your free API key.

## Step 2:
You need to have an account at https://cloud.mongodb.com, so create one or log in to your existing account.

## Step 3:
After creating both accounts, you'll need to edit the `nodemon.json` file found at the root of the project.

The file looks like this:

`{
  "env": {
    "MONGO_USER": "",
    "MONGO_PASSWORD": "",
    "MONGO_DB": "",
    "API_KEY": ""
  }
}`

In your MongoDB account, navigate to the `Security` tab and select `Database Access`.

This should show up:
![Image of Screenshot](https://github.com/Zephyrus96/booking-site/blob/master/images/Screenshot%202019-10-01%20153916.png)

* Click on `Add new user`.
* Enter a username and password.
* For User Privileges, select `Read and write to any database`.
* Finally, click on `Add user`.

Back to the `nodemon.json` file: 
* The `MONGO_USER` and `MONGO_PASSWORD` fields should be the username and password you just created respectively.
* `MONGO_DB` is the database name of your choice.
* `API_KEY` is the API key you registered in Ticketmaster.

#### Save the file!

## Step 4:
You need to have either `npm` or `yarn` package managers installed.

I personally used `yarn` in this project, and to download either follow the steps found in:
* https://www.npmjs.com/get-npm for `npm`
* https://yarnpkg.com/lang/en/docs/install for `yarn`

#### If you went for `yarn`, follow this:
* On the terminal, cd into the project directory and run this command `yarn install`. This should install all the package dependencies for the server found in `package.json`.
* Similarly, cd into the `frontend` folder and run the same command. It should install the client exclusive dependencies.
* Cd back into the root directory and run `yarn dev`.
* Both your client and server should be running!


#### If you went for `npm`, follow this:

* On the terminal, cd into the project directory, delete the `yarn.lock` file, and run this command `npm install`. This should install all the package dependencies for the server found in `package.json`.
* Similarly, cd into the `frontend` folder, delete the `yarn.lock` file, and run the same command. It should install the client exclusive dependencies.
* Cd back into the root directory and run `npm dev`.
* Both your client and server should be running!


