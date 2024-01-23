const { PORT = 5001 } = process.env;
import app from "./app.js";
import knex from "./db/connection.js";
knex.migrate
    .latest()
    .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
})
    .catch((error) => {
    console.error(error);
    knex.destroy();
});
function listener() {
    console.log(`Listening on Port here: ${PORT}!`);
}
