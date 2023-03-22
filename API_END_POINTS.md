

## API Endpoints

`base_url` => `http://172.104.251.26/api`
### Auth
- login [POST] => `/auth/login`
- register [POST] => `/auth/register`

#### Users
- all users [GET] >> '/users' 
- get one user [GET] >> '/users/:userId' 
- Create one user [POST] >> '/users'

---
### Example

#### Checking tha the server is runing
go to http://172.104.251.26/api
![enter image description here](https://res.cloudinary.com/dztskndab/image/upload/v1679475147/github_ecommerce_server/check_qrmyco.png)


#### Login
* An admin user is already stored in the DB.
* Please use the `admin` user to login.
* Afer login, the response will onclude:
	* `accessToken` to use to perform the rest of requests that required authentication.	

go to http://172.104.251.26/api
![enter image description here](https://res.cloudinary.com/dztskndab/image/upload/v1679475263/github_ecommerce_server/login_fwie6y.png)