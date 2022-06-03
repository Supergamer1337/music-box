# music-box

The Music Box is an application for GMs running their games on Discord. It works as a dashboard-style panel for music/sfx/audio selection for an accompanying Discord bot.

## Getting Started

The application is split into 2 main parts, the backend and frontend. The project uses pnpm instead of npm or yarn, and more can be read about it [here](https://pnpm.io/).

But if TLDR: install pnpm by using the following command (assuming you have npm installed)

```sh
npm install -g pnpm
```

Then, from the project root, use the following command:

```sh
docker compose up -d
```

To download and start the required docker for caching of sessions.

### Backend

For inital setup, execute the following commands (from the project root).

```sh
cd backend/
pnpm i
```

You should also copy the `.env.example` into `.env`, and fill it with the appropriate values.

Afterwards you can start developing by using the following commands in two different terminals (in the backend directory).

```sh
pnpm compile
pnpm watch
```

### Frontend

For initial setup, execute the following commands (from the project root).

```sh
cd frontend/
pnpm i
```

You should also copy the `.env.example` into `.env`, and fill it with the appropriate values.

Afterwards, start development by using

```sh
pnpm dev
```
