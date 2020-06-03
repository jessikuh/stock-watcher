# Stock Watcher

## Requirements

You will need [Docker](https://www.docker.com/) installed on your machine.

## Instructions

1. To run the application, open your terminal, clone the code into a location of your choice and then cd into the created directory.
2. While in your terminal, run the following command `cp ./client/.env.example ./client/.env` to create your .env file.
3. Run `vim ./client/.env` and add your API key after 'VUE_APP_API_KEY'. (Provided key is `HY0JP87WH3PG17X6`.) Save and exit VIM.
4. Run ```docker-compose up --build``` from the root directory.
5. Once the dev server has compiled successfully, you can visit ```http://localhost:8080``` to explore the dashboard.
