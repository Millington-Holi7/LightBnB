# LightBnB
A multi-page Airbnb clone that uses a server-side Javascript to display the inforrmation from the queries to web page via SQL queries.
This assignment allowed me to practice building tables, inserting data into the tables and queries to pull that info. The site was already setup. I add the queries. 

## Project Structure

```
.LightBnB
|
├── 1_queries
│   ├── 1_user_login.sql
│   └── 2_average_length_of_reservation.sql
│   ├── 3_property_listings_by_city.sql
│   └── 4_most_visited_cities.sql
│   └── 5_all_my_reservations.sql
├── LightBnB_WebApp-master
|   ├── db
|   │   ├── json
|   │   └── database.js
|   ├── public
|   │   ├── javascript
|   │   │   ├── components 
|   │   │   │   ├── header.js
|   │   │   │   ├── login_form.js
|   │   │   │   ├── new_property_form.js
|   │   │   │   ├── property_listing.js
|   │   │   │   ├── property_listings.js
|   │   │   │   ├── search_form.js
|   │   │   │   └── signup_form.js
|   │   │   ├── libraries
|   │   │   ├── index.js
|   │   │   ├── network.js
|   │   │   └── views_manager.js
|   │   ├── styles
|   │   │   ├── main.css
|   │   │   └── main.css.map
|   │   └── index.html
|   ├── routes
|   │   ├── apiRoutes.js
|   │   └── userRoutes.js
|   ├── styles  
|   │   ├── _forms.scss
|   │   ├── _header.scss
|   │   ├── _property-listings.scss
|   │   └── main.scss
|   ├── .gitignore
|   ├── package-lock.json
|   ├── package.json
|   ├── README.md
|   └── server.js
├── migrations
|   ├── 01_schema.sql
├── seeds
|   ├── 01_seeds.sql
|   └── 02_seeds.sql
```
* `1_queries` contains all of the practice data queries. 
  * `db` contains all the database interaction code.
     * `json` is a directory that contains a bunch of dummy data in `.json` files.
     * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
  * `public` contains all of the HTML, CSS, and client side JavaScript. 
   * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
   * `javascript` contains all of the client side javascript files.
     * `index.js` starts up the application by rendering the listings.
     * `network.js` manages all ajax requests to the server.
     * `views_manager.js` manages which components appear on screen.
     * `components` contains all of the individual html components. They are all created using jQuery.
  * `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `styles` contains all of the sass files. 
  * `server.js` is the entry point to the application. This connects the routes to the database.
* `migrations` contains the schema file. 
* `01_schema.sql` This file can be run to build the database tables.
* `seeds` contains the files that hold all the data for the tables. 
* `02_seeds.sql` contains all the data for the tables.