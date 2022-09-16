# fw9-backend

## About

A backend program for E-Wallet application.

## Built With

[nodejs](https://nodejs.org/en/) <br/>
[express](https://expressjs.com/) <br/>
[express-validator](https://express-validator.github.io/docs/) <br/>
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) <br/>
[bcrypt](https://www.npmjs.com/package/bcrypt) <br/>
[pg](https://www.npmjs.com/package/pg) <br/>
[cloudinary](https://www.npmjs.com/package/cloudinary) <br/>
[multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) <br/>
[multer](https://www.npmjs.com/package/multer) <br/>
[dotenv](https://www.npmjs.com/package/dotenv) <br/>
[cors](https://www.npmjs.com/package/cors) <br/>

## How to Use This Project

1. Install Postman and open it
2. click environment in the sidebar
3. create new environment
4. create url variabel
5. fill initial value and current value column with this link "https://fw9-backend-rewallet.vercel.app/"
6. create token variabel
7. fill current value column with token what you get when login (skip this step if you not have create end-point)
8. click colection in the sidebar
9. create new collection
10. creat end-point in the collection
11. start with url variabel on the path bar (e.g. {{url}})
    --FOR MAKE THIS SIMPLE THIS POSTMAN DATA [postman data](/BACKEND%20APP%20EWALLET.postman_collection.json)

## Endpoints

<table>
  <tr>
    <th>url</th>
    <th>method</th>
    <th>description</th>
  </tr>
  <tr>
    <td>/auth/login</td>
    <td>POST</td>
    <td>login</td>
  </tr>
  <tr>
    <td>/auth/register</td>
    <td>POST</td>
    <td>register</td>
  </tr>
  <tr>
    <td>/auth/createPin</td>
    <td>POST</td>
    <td>create pin</td>
  </tr>
  <tr>
    <td>/profile</td>
    <td>GET</td>
    <td>get profile user already login</td>
  </tr>
  <tr>
    <td>/historyTransaction</td>
    <td>GET</td>
    <td>get history transaction</td>
  </tr>
  <tr>
    <td>/allProfile</td>
    <td>GET</td>
    <td>get all profile</td>
  </tr>
  <tr>
    <td>/transfer</td>
    <td>POST</td>
    <td>transfer</td>
  </tr>
  <tr>
    <td>/phone</td>
    <td>POST</td>
    <td>add phone number</td>
  </tr>
  <tr>
    <td>/profile/</td>
    <td>PATCH</td>
    <td>edit profile</td>
  </tr>
  <tr>
    <td>/changePassword</td>
    <td>PATCH</td>
    <td>edit password</td>
  </tr>
  <tr>
    <td>/changePin</td>
    <td>PATCH</td>
    <td>edit pin </td>
  </tr>
  <tr>
    <td>/phone</td>
    <td>PATCH</td>
    <td>edit phone number</td>
  </tr>
  <tr>
    <td>/topup</td>
    <td>post</td>
    <td>topup amount</td>
  </tr>
</table>
