# CSRF Challenge

The flag can be set in the environment of the backend: `packages/backend/.env`

To run it use:
```bash
yarn docker-build
yarn docker-run
```

Game frontend available in: `http://localhost:5500`

Game backend available in: `http://localhost:3000`

In order to run the CSRF attack you need to build a website in My-Universe:

My-Universe frontend available in: `http://localhost:3001`


Scripts availables:

```bash
yarn dev  (Game + My-Universe + Backend)
```