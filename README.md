# FOODCOURT API

An API for a FOOD COURT

## features
- [x] Users can login and register after which they receive a token
- [x] Users can create a new brand that they can manage.
- [x] Users can create a new meal addons for there brands.
- [x] Users can fetch all meals associated with their brand.
- [x] Users can fetch a specific meal associated with their brand.
- [x] Users can edit all meal associated to their brand .
- [x] Users can delete meals that are associated with their brand.
- [x] All routes apart from the login and register require an authorization header(bearer Token)


## Getting started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

* [**Nest JS**]
* [**Postgres**]


### Installation

* Clone this repository

```sh
git clone [https://github.com/https://github.com/vicorandy/FoodCourt-API]
```

* Navigate to the project directory

* Run `npm install` to instal the projects dependencies
* create a Postgres database in your local machine 
* enter you data base value in file config.js it's in the root folder 
* enter your data base value in src/config/keys please note you are entering your database information in two files 
* Run ` knex migrate:latest ` in your terminal
* Run `npm run start dev:` you app will be started.


## API Documentation

API documenntation: [https://documenter.getpostman.com/view/25251742/2s8Z76uTyj]
