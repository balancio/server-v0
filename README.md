# Balancio API Server

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
- [ ] `[GET] /wallets/:id/users`
    ```ts
    // Response Body | Array of usernames
    string[]
    ```
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
- [X] `[POST] /users/register`
    ```ts
    // Request Body | Registration Data
    {
        username: string,
        password: string,
        password_confirm: string,
    }
    ```

### Wallet
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
            "transaction_ids": string[] // ref[] -> transactions
        },
        ...
    ]
    ```
- [ ] `[POST] /wallets`
    ```ts
    // Request Body | New Wallet object data
    {
        "name": string,
        "currency": string
    }
    ```

### Transaction
- [ ] `[POST] /wallets/:id/transactions`
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
    // Response Body | Array of Transaction objects
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