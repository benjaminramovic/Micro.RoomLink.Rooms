const neo4j = require('neo4j-driver')
require('dotenv').config()


//const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'Benjamin2002#'))
const driver = neo4j.driver(process.env.url,neo4j.auth.basic(process.env.db_username, process.env.db_password))
const session = driver.session()

module.exports = { session, driver }