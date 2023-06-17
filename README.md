# chatgpt mini-project
This is an express app that uses chatgpt api to generate courses.  

## How to use
1. first of all make sure that you have `npm` and `docker compose` installed on your machine.
2. navigate to `db` directory and run `docker compose up -d`
3. run `npm install` or `pnpm install`
4. before continuing make sure to copy `.env.example` file to `.env` and putting a correct OPENAI_API_KEY
5. run `(p)npm prisma generate`
6. after that you now can execute the server directly via `npm run dev`

## Structure

This project is structured into 3 main directories `prisma`, `routes` and `controllers`, the main code is in controllers directory.

- `controllers/chatgpt.js`: contains the prompt for our project.
- `controllers/courses.js`: contains the api methods to be invoked.
- `prisma/schema.prisma`: contains the model definitions, we only have one model which is the `Course` model.
- `routes/courses.js`: contains all the routes related to the courses api.
- `app.js`: is the entrypoint for our application




