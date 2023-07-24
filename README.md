# Balancio API Server

## How to run
```sh
cd path/to/server/directory
BALANCIO_DB_CERT="<path_to_mongo_cert>" node .
```

## Endpoints
- `/users`
    - `/login [GET]` - _Get new Auth Token_
    - `/:uid/profile [GET]` - _Get user profile info_
    - `/:uid/profile [PUT]` - _Change user profile info_
    - `/:uid/wallets [GET]` - _Get list of wallets that user has access to_
- `/wallets`
    - `/:wid` `[GET]`