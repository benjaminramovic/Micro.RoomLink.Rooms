const http = require('http');
const express = require('express');
const { session, driver } = require('./config/neo4j'); // Pretpostavka: konekcija se nalazi u 'config/neo4j'

const app = express();
app.use(express.json());

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

app.get('/', (req, res) => {
  res.send('Hello Benjamin!!!');
});

// Test ruta za proveru povezivanja sa Neo4j
app.get('/test-connection', async (req, res) => {
  try {
    // Pokreni upit da dobiješ čvorove iz baze
    const result = await session.run('MATCH (n) RETURN n LIMIT 1');
    
    // Ako postoje čvorovi, vraća ih, inače poruku da baza nema čvorove
    if (result.records.length > 0) {
      const nodes = result.records.map(record => record.get('n').properties);
      res.json({ success: true, message: 'Connected to Neo4j!', nodes });
    } else {
      res.json({ success: true, message: 'Connected to Neo4j, but no nodes found!' });
    }
  } catch (error) {
    console.error('Error connecting to Neo4j:', error);
    res.status(500).json({ success: false, message: 'Failed to connect to Neo4j', error: error.message });
  }
});

// Zatvori konekciju prilikom izlaza
process.on('exit', () => {
  session.close();
  driver.close();
});
