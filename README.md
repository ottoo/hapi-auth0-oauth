# hapi-auth0-oauth

An example repository demonstrating how to do oauth authorization code grant authentication with
refresh tokens with the [https://auth0.com](https://auth0.com) service.

Requires creating an [https://auth0.com](https://auth0.com) account and a custom api ([https://manage.auth0.com/#/apis](https://manage.auth0.com/#/apis)) once logged in. The created api can then be used for the backend. file. Copy `/backend/server/.env.example` to `/backend/server/.env` and fill in the details.

```
AUTH0_CALLBACK_URL=auth0 callback url
AUTH0_DOMAIN=api domain
AUTH0_JWKS_URI=jwks uri
AUTH0_CLIENT_ID=client id
AUTH0_CLIENT_SECRET=client secret
```

On the frontend side copy the contents of the `/frontend/.env.example` file to `/frontend/.env` file.

Run `npm install` in both the frontend and the backend folders then `npm start` both. Frontend runs at
`http://localhost:3000` and the backend at `http://localhost:3001`.

---

In this version, the refresh token is stored in a http-only session cookie and the access token is
returned as a query param to the frontend from which it is taken and stored in the local storage.
In real life, a better solution would probably be to store a session id in either local storage or
in a cookie and hold the actual session in a database like Postgres or an in-memory database such as
Redis. There are tradeoffs in using local storage (XSS) and cookies (CSRF) for storing these details.

### Example

An example is available at [https://ottokivikarki.co/auth-example](https://ottokivikarki.co/auth-example).
