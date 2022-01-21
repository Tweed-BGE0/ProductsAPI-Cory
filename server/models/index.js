const pool = require("../database");
const parse = require("../database/csvLineParse.js")
//functions to interact and query with database

module.exports = {
  // connectAndQuery is used to load of database - imported in ToPg files
  connectAndQuery: async (query) => {
    const client = await pool.connect();
    console.log(':::::::CONNECTED:::::::')
    try {
      console.log(query.slice(0, 130), '...')
      await client.query(query);
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    } finally {
      await client.release();
      console.log(":::::::RELEASED:::::::");
    }
  },
  getProductsPage: async (params) => {

    var page = params.page || 1;
    var count = params.count || 5;
    var startId = page == 1 ? 1 : (count * page ) - count + 1 ;

    const client = await pool.connect();
    try {

      const query = `
      SELECT *
      FROM products
      WHERE id > $1
      ORDER BY id ASC
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
    const client = await pool.connect();
    try {
      const query = `SELECT st.id, st.name, st.original_price, st.sale_price, st.default_style,
      ARRAY_AGG(distinct (p.thumbnail_url, p.url)) AS photos,
      ARRAY_AGG(distinct (sk.id, sk.size, sk.quantity)) AS skus
      FROM styles st
      LEFT JOIN photos p
      ON st.id = p.style_id
      LEFT JOIN skus sk
      ON st.id = sk.style_id
      WHERE st.product_id = $1
      GROUP BY 1, 2, 3, 4, 5;`;

      const { rows } = await client.query(query, [id]);

      var result = {
        "product_id": id,
        "results": rows.map((row, i) => {
          var finalSku = {}
          var parsed = parse(row.skus).map(sku => {
            var split = sku.replace(/([()])/g, '').split(',');
            return split;
          }).forEach(arr => {
            finalSku[arr[0]] = {
              quantity: arr[2],
              size: arr[1]
          }
          })

          return {
          "style_id": row.id,
          "name": row.name,
          "original_price": row.original_price,
          "sale_price": row.sale_price,
          "default?": row.default_style,
          "photos": parse(row.photos).map((link, i) => {
            var link2 = link.replace(/[()]/g, '')
            var split = link2.split(',')

            return {thumbnail_url: split[0], url: split[1]}
          }),
          "skus" : finalSku
          }
      })
    }
      return result;
    } catch (err) {
      console.log(" query failed", err);
      throw new Error("query failed");
    } finally {
      await client.release();
      console.log("closed");
    }
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
