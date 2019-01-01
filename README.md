# hapi-auth0-oauth

An example repository displaying how to do oauth authorization code grant authentication with
refresh tokens with the [https://auth0.com](https://auth0.com) service.

Requires creating an [https://auth0.com](https://auth0.com) account and a custom api ([https://manage.auth0.com/#/apis](https://manage.auth0.com/#/apis)) once logged in. The created api can then be used for the backend. file. Copy `/backend/server/.env.example` to `/backend/server/.env` and fill in the details.

```
AUTH0_DOMAIN=api domain
AUTH0_JWKS_URI=jwks uri
AUTH0_CLIENT_ID=client id
AUTH0_CLIENT_SECRET=client secret
```

On the frontend side copy the contents of the `/frontend/.env.example` file to `/frontend/.env` file.

Run `npm install` in both the frontend and the backend folders then `npm start` both. Frontend runs at
`http://localhost:3000` and the backend at `http://localhost:3001`.
