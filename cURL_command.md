- Register new user:
  ```
  - curl -H "Content-Type: application/json" -X POST "localhost:8080/register" -d '{"user":{"username":"matheus","password":123}}'
  ```
- Login with a registered user:
  ```
    curl -H "Content-Type: application/json" -X POST "localhost:8080/customer/login" -d '{"user":{"username":"matheus","password":123}}'
  ```
  - This command will return a token, insert it in the access token field for executing the commands below.
- Add a review:
  ```
    curl -H "Authorization: access_token" "localhost:8080/customer/auth/review/2?review=Great%20book" -X PUT
  ```
- Delete a review:
  ```
  curl -H "Authorization: access_token" "localhost:8080/customer/auth/review/2" -X DELETE
  ```
