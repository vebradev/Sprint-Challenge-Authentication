const db = require("./../database/dbConfig");

module.exports = {
  add,
  findBy
};

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(username) {
  return db("users")
    .where(username)
    .first();
}