# Backend

## File structure
    .
    ├── algo                    # the class that handle the predictions
    ├── authentication          # the app for the authentication
    ├── house                   # the app for house model management
    ├── house_price_api         # the project settings
    ├ db.sqllite3               # the database                 
    └ App.tsx

## Run the project individually 

```sh
$ cd housing_price_api
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ source env/bin/activate
```

Then install the dependencies:

```sh
(env)$ pip install -r requirements.txt
```

```sh
(env)$ cd project
(env)$ python manage.py runserver
```
And navigate to `http://127.0.0.1:8000/`.

If you want to apply migrations or migrate the data just hit the commands:
```sh
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
```



