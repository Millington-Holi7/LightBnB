// const properties = require("../../seeds/02_seeds.sql");
// const users = require("../../seeds/02_seeds.sql");
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  return pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`, [email]
  )
  .then((result) => {
    if (result.rows.length){
      return result.rows[0];
    }else{
      return null
    }
  })
  .catch((error) => {
    console.error(error)
  })
}

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query (
    `SELECT *
    FROM users
    WHERE id = $1; `, [id]
  )
  .then((result) => {
    if (result.rows.length){
      return result.rows[0];
    }else{
      return null
    }
  })
  .catch((error) => {
    console.error(error)
  })
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  console.log(user);
  const {name, email, password} = user;
  return pool.query(
   `INSERT INTO users (name, email, password)
   VALUES ($1, $2, $3)
   RETURNING *;`,
   [name, email, password] 
  )
  .then((result) => {
      return result.rows;
  })

  .catch((error) => {
    console.error(error)
  })
  
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query (
    `SELECT properties.thumbnail_photo_url, properties.title, number_of_bedrooms, number_of_bathrooms, parking_spaces, reservations.start_date, reservations.end_date, AVG(rating), properties.cost_per_night
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`,
   
    [guest_id,limit]
  )
  .then((result) => {
      return result.rows;
  })

  .catch((error) => {
    console.error(error.message)
  })
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} city LIKE $${queryParams.length} `;
}

if (options.owner_id) {
  queryParams.push(options.owner_id);
  queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} owner_id = $${queryParams.length} `;
}

console.log(typeof options.minimum_price_per_night)
const minCost = Number(options.minimum_price_per_night)
const maxCost = Number(options.maximum_price_per_night)

if (minCost && maxCost) {
  queryParams.push(minCost * 100);
  queryParams.push(maxCost * 100);

  queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
}

queryString += `
GROUP BY properties.id
`;

if (options.minimum_rating) {
  queryParams.push(options.minimum_rating);
  queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
}

queryParams.push(limit);
queryString += `
ORDER BY cost_per_night
LIMIT $${queryParams.length};
`;

console.log(queryString, queryParams);

return pool.query(queryString, queryParams).then((res) => res.rows);
 
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
