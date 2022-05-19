# music-box
The Music Box is an application for GMs running their games on Discord. It works as a dashboard-style panel for music/sfx/audio selection for an accompanying Discord bot.

## Getting Started
The application is split into 2 main parts, the backend and frontend. The project uses pnpm instead of npm or yarn, and more can be read about it [here](https://pnpm.io/).

But if TLDR: install pnpm using npm by using the following command
```sh
npm install -g pnpm
```

### Backend
For inital setup, execute the following commands (from the project root).
```sh
cd backend/
pnpm i
```
Afterwards you can start developing by using the following commands in two different terminals (in the backend directory).
```sh
pnpm compile
pnpm watch
```
