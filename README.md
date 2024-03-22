# Overview of the project

To run the app you can run the command:
```sh
docker-compose up --build
```
After running the command you can access 127.0.0.1/ and see the app running, or you can run each projects individually.

I've already created a default user with some data in it. The users credentials are:
```html
email: admin@admin.com 
password: adminadmin
```

## Explained

### FE [house-price-fe](https://github.com/galoscar07/HouseEvaluation/tree/main/housing-price-fe)

The application has multiple pages. It has the auth part and the dashboard. The dashboard has actually 3 different pages inside it,
adding a new house prediction, table to check all the existing predictions and graphics extracted from the data

### BE [house_price-api](https://github.com/galoscar07/HouseEvaluation/tree/main/housing_price_api)

The application has 2 apps one for managing authentication and one for managing the house. On the house model you can do all the CRUD operations in a rest format:
```shell
GET /houses - get a list of all the houses
POST /houses - predict the price on a house and save it for the authenticated user
GET /houses/<id> - get the price prediction for a house
PUT /houses/<id> - update the house and recalculate the prediction
DELETE /houses/<id> - delete the price prediction for a house
```

### Problem Statement [statement](https://github.com/galoscar07/HouseEvaluation/tree/main/statement)

Here are all the provided documents for this project


### Wrapper Docker [nginx](https://github.com/galoscar07/HouseEvaluation/tree/main/nginx)

This is a wrapper for docker in order to run the projects all at once
