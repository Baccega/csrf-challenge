

To run it use:
```bash
yarn docker-build
yarn docker-run
```

Game frontend available in: `http://localhost:5500`
Chat frontend available in: `http://localhost:5501`

In order to run the CSRF attack you need to build a website in `http://localhost:5000`

Scripts availables:

```bash
yarn start  (Chat + Game + Backend)
yarn start-chat  (Chat)
yarn start-game  (Game)
yarn start-backend  (Backend)
```