const pool = require("../database");

//functions to interact and query with database

module.exports = {
  // connectAndQuery is used to load of database - imported in ToPg files
  connectAndQuery: async (query) => {
    try {
      const client = await pool.connect();
      await client.query(query);
      await client.release();
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    }
  },
  getProductsPage: async (params) => {
    console.log(params)
    var page = params.page || 1;
    var count = params.count || 5;
    var startId = page == 1 ? 1 : count * page + 1;

    const client = await pool.connect();
    try {

      const query = `
      SELECT *
      FROM products
      WHERE id > $1
      LIMIT $2`;

      const { rows } = await client.query(query, [startId, count]);
      return rows;
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    } finally {
      await client.release();
      console.log("closed");
    }
  },
  getProductById: async (id) => {
    const client = await pool.connect();
    try {

      const query = `
      SELECT p.id,
      p.name,
      p.slogan,
      p.description,
      p.category,
      p.default_price,
      ARRAY_AGG(f.feature) AS features,
      ARRAY_AGG(f.value) AS values
      FROM products p
      LEFT JOIN features f
      ON p.id = f.product_id
      WHERE p.id = $1
      GROUP BY 1, 2, 3, 4, 5, 6;`;

      const { rows } = await client.query(query, [id]);

      const response = {
        id: rows[0].id,
        name: rows[0].name,
        slogan: rows[0].slogan,
        description: rows[0].description,
        category: rows[0].category,
        default_price: rows[0].default_price,

        features: rows[0].features.map((ft, i) => {
          return {
            feature: ft,
            value: rows[0].values[i],
          };
        }),
      };

      console.log(response)
      return response;
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    } finally {
      await client.release();
      console.log("closed");
    }
  },
  getProductStyles: async (id) => {
    // const client = await pool.connect();
    // try {
    //   const query = "";
    //   const photos = "";
    //   const skus = "";
    //   const results = ({ rows } = await client.query(query, [id]));

    //   productInfo.rows[0].features = featureInfo.rows;
    //   return productInfo.rows[0];
    // } catch (err) {
    //   console.log(" query failed", err);
    //   throw new Error("query failed");
    // } finally {
    //   await client.release();
    //   console.log("closed");
    // }
  },
  getRelatedProductsIds: async (id) => {
    const client = await pool.connect();
    try {

      const query = `
      SELECT
      ARRAY_AGG(related_product_id)
      FROM related
      WHERE current_product_id = $1`;

      const { rows } = await client.query(query, [id]);
      var result = rows[0].array_agg
  
      return result;
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    } finally {
      await client.release();
      console.log("closed");
    };
  }
};



/*
// const query = 'SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price FROM products WHERE products.id = $1;'
      // const features = 'SELECT features.feature, features.value FROM features WHERE features.product_id = $1'
      // const productInfo = await client.query(query, [id])
      // const featureInfo = await client.query(features, [id])
      // productInfo.rows[0].features = featureInfo.rows
      // return productInfo.rows[0];
*/