const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a new record
app.post('/api/addRecord', async (req, res) => {
  const { name, age } = req.body;

  try {
    const newRecord = await prisma.testTable.create({
      data: {
        name,
        age,
      },
    });
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error adding record' });
  }
});

// Update a record
app.put('/api/updateRecord/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const updatedRecord = await prisma.testTable.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        age,
      },
    });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error updating record' });
  }
});

// Delete a record
app.delete('/api/deleteRecord/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.testTable.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting record' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
