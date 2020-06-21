# CSRF Challenge

> The flag can be set in the environment of the backend: `packages/backend/.env`

> The backend needs to work with https, the certificates are stored in : `packages/backend/sslcert`

To run it use:
```bash
yarn docker-build
yarn docker-run
```

Game frontend available in: `https://localhost:5000`

Game backend available in: `https://localhost:3000`

In order to run the CSRF attack you need to build a website in My-Universe:

My-Universe frontend available in: `http://localhost:3001`


Scripts availables:

```bash
yarn dev  (Game + My-Universe + Backend + Common)
```