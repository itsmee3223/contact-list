const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new contact
app.post('/contacts', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
      },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single contact by ID
app.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, address } = req.body;
    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
      },
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
