#### NOTE
The API is deployed to a VPS server at: http://172.104.251.26/api

![enter image description here](https://res.cloudinary.com/dztskndab/image/upload/v1679475147/github_ecommerce_server/check_qrmyco.png)

---
## Authentication Design

#### 1) Login
* used JWT to create tokens.
![Screenshot](images/login_flowchart.png)

#### 2) Accessing Protected Resources - With Expired AccessToken
-  A legal JWT must be added to HTTP Header if Client accesses protected resources.
- With the help of Axios Interceptors, React App can check if the accessToken (JWT) is expired (401), sends /refreshToken request to receive new accessToken and use it for new resource request.

![screenshot](images/Access%20Protected%20Resources%20-%20with%20expired%20access%20token.png)


---

## API Endpoints

##### Admin Dashboard
https://mfathy.netlify.app/admin

`base_url` => `http://172.104.251.26/api`
### Auth
- login [POST] => `/auth/login`
- register [POST] => `/auth/register`

#### Users
- all users [GET] >> '/users' 
- get one user [GET] >> '/users/:userId' 
- Create one user [POST] >> '/users'

---
### Example - Login

* An admin user is already stored in the DB.
* Please use the `admin` user to login.
* Afer login, the response will onclude:
	* `accessToken` to use to perform the rest of requests that required authentication.	

go to http://172.104.251.26/api
![enter image description here](https://res.cloudinary.com/dztskndab/image/upload/v1679475263/github_ecommerce_server/login_fwie6y.png)


---
### A) Setup preparation
##### 1- package installation
run `npm install`

##### 2- ports the backend and database
* Backend port: 5000
* Database port: 5432



### B) Database Setup

##### 1- Create postgres User
```sh
CREATE USER postgres WITH PASSWORD 'postgres'
```


##### 2- Create databases
```sh
CREATE DATABASE ecommerce;
CREATE DATABASE ecommerce;
```

##### 3- Grant all database perviliges to postgres user
```sh
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO postgres;
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO postgres;
```

##### 4- Run migration
db-migrate up


### C) Starting the server (dev mode)

* go to: 'http://localhost:5000/api/'
