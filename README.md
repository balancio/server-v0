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
- [ ] `[GET] /users/:username/wallets`
    ```ts
    // Array of Wallet objects
    [
        {
            "_id": ObjectId,
            "name": string,
            "currency": string,
            "total": number,
            "owner_ids": ObjectId[] // [ref] -> users
            "transaction_ids": ObjectId[] // [ref] -> transactions
        },
        ...
    ]
    ```
- [ ] `[POST] /wallets`
    ```ts
    // New Wallet object data
    {
        "name": string,
        "currency": string
    }
    ```

### Transaction
- [ ] `[GET] /wallets/:id/transactions/:perPage/:pageNum`
    ```ts
    // Response Body: Array of Transaction objects
    [
        {
            "_id": ObjectId,
            "name": string,
            "date": number, // Unix Time (ms)
            "name": string,
            "amount": number
        },
        ...
    ]
    ```