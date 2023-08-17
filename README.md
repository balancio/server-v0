# Balancio API Server

REST API server application for Balancio. It's built with Node and Express. For communication with MongoDB database official `mongodb` driver is used.

Server is currently in `prototype` phase.

## How to run
### Prerequisites
- In root server directory file `.env` with values for server environment variables
    ```sh
    DB_CONN_CERT="<path-to-mongodb-certificate-file>"
    DB_CONN_URL="<mongodb-connection-url>"
    DB_NAME="<database-name>"

    SRV_HOST="<server-host>"
    SRV_PORT="<server-port>"

    AUTH_TOKEN_SECRET="<secret-for-signing-auth-token>"
    ```
### Running server
```sh
npm run start
```

## API

### User
- [X] `[POST] /users/login`
    ```ts
    // Request Body | Login Credentials
    {
        username: string,
        password: string
    }
    ```
    ```ts
    // Response Header | Bearer Token
    {
        Authorization: "Bearer <token>",
        ...
    }
    ```
- [X] `[POST] /users`
    ```ts
    // Request Body | Registration Data
    {
        username: string,
        password: string,
        password_confirm: string,
    }
    ```

### Wallet
- [X] `[POST] /wallets`
    ```ts
    // Request Body | New Wallet object data
    {
        "name": string,
        "currency": string
    }
    ```
- [X] `[GET] /wallets/:id`
    ```ts
    // Response Body | Wallet object data
    {
        "_id": string,
        "name": string,
        "currency": string,
        "total": number,
        "user_ids": string[] // ref[] -> users
    }
    ```
- [X] `[GET] /users/:username/wallets`
    ```ts
    // Response Body | Array of Wallet objects
    [
        {
            "_id": string,
            "name": string,
            "currency": string,
            "total": number,
            "user_ids": string[] // ref[] -> users
        },
        ...
    ]
    ```

### Transaction
- [X] `[POST] /wallets/:id/transactions`
    ```ts
    // Request Body | New Transaction object data
    [
        {
            "title": string,
            "date": number, // Unix Time (ms)
            "amount": number
        },
        ...
    ]
    ```
- [X] `[GET] /wallets/:id/transactions`
    ```ts
    // Response Body | Array of Transaction objects (Sorted by date, descending)
    [
        {
            "_id": string,
            "title": string,
            "date": number, // Unix Time (ms)
            "amount": number,
            "wallet_id": string // ref -> wallets
        },
        ...
    ]
    ```
