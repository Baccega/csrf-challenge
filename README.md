# Csrf Challenge

This is a challenge about a Cross Site Request Forgery exploit.

You are presented with 2 websites:

## My Universe

A barebone site that allows the user to create his own website, visible by the server.
This application is needed because in order to use a CSRF exploit you need to have a malicius website.

## Items Mailbox

This is the vunerable website.

In this website users can interact and send items to each other. 


## Exploit

The goal of the exploit is to make the user: 'Gary' to send you an item (the flag).

In order to activate the exploit you need to create a malicious website in My Universe and send it's link to Gary, through the Items Mailbox chat.

The website should be able to send a POST request to `/send` with the following payload (in form-data or JSON): 
- `position`: 0    (Or any other number, it's not important which one) 
- `to`: username   (Where username is the one of the attacker)
- `encodedToken`: TOKEN 

Normally this token can be obtained only during the login, but in this case it can be forged.
As the name suggest, the token is ENCODED, not encrypted, in particular the encoding is Base64.
If you try to see what's inside a token you'll see something like: `YOUR_USERNAME;1592748359915`.
The number represents the timestamp of the login.

All of this mean is that if we forge a token to be something like: `Gary;CURRENT_TIMESTAMP`, this could be a valid token.


## How to fix the vunnerability

The fastest way is to use an anti-csrf token that cannot be generated by a user.
The best way is to avoid using cookie entirely, or at least using them the proper way (By setting SameSite=Strict). 

## Deploy

> The flag can be set in the environment of the backend: `packages/backend/.env`

> The backend needs to work with https, the certificates are stored in : `/sslcert`

To run it use:
```bash
yarn docker-build
yarn docker-run
```

If you don't want to use docker, you can use:
```bash
yarn build
yarn start
```

The challenge frontend available at: `https://localhost:3000`

In order to run the CSRF attack you need to build a website in My-Universe:

My-Universe frontend available in: `http://localhost:3001`


Scripts availables:

```bash
yarn dev  (Game + My-Universe + Backend + Common)
```