/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },
  { name: 'Digital Audio Recorder', category: 'audio', brand: 'Zoom', year: 2016, quantity: 2 },
  { name: 'HD Video Camera', category: 'video', brand: 'Canon', year: 2018, quantity: 3 }
];

// Converts the URL ID to a valid index, or returns null if it is invalid.
function parseIndex(id) {
  if (!/^\d+$/.test(id)) return null;
  const index = Number(id);
  return Number.isSafeInteger(index) ? index : null;
}

// Checks that the item has all required fields with valid values.
function isEquipmentItem(item) {
  return item !== null
    && typeof item === 'object'
    && !Array.isArray(item)
    && ['name', 'category', 'brand'].every(key => typeof item[key] === 'string' && item[key].trim() !== '')
    && Number.isInteger(item.year)
    && Number.isInteger(item.quantity)
    && item.quantity >= 0;
}

// Returns the complete equipment collection.
app.get('/api/equipment', (req, res) => {
  res.json(equipment);
});

// Keep the filter route before /:id.
// Returns only the equipment in the requested category.
app.get('/api/equipment/filter', (req, res) => {
  const { category } = req.query;
  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'A category query parameter is required.' });
  }
  res.json(equipment.filter(item => item.category === category));
});

// Finds an equipment item by its array index.
app.get('/api/equipment/:id', (req, res) => {
  const index = parseIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: 'ID must be a non-negative integer.' });
  if (index >= equipment.length) return res.status(404).json({ error: 'Equipment item not found.' });
  res.json(equipment[index]);
});

// Validates and adds a new equipment item to the collection.
app.post('/api/equipment', (req, res) => {
  if (!isEquipmentItem(req.body)) {
    return res.status(400).json({
      error: 'Equipment must include non-empty name, category, and brand strings, and integer year and non-negative quantity values.'
    });
  }
  equipment.push(req.body);
  res.status(201).json(req.body);
});

// Validates and replaces the equipment item at the requested index.
app.put('/api/equipment/:id', (req, res) => {
  const index = parseIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: 'ID must be a non-negative integer.' });
  if (index >= equipment.length) return res.status(404).json({ error: 'Equipment item not found.' });
  if (!isEquipmentItem(req.body)) {
    return res.status(400).json({
      error: 'Equipment must include non-empty name, category, and brand strings, and integer year and non-negative quantity values.'
    });
  }
  equipment[index] = req.body;
  res.json(req.body);
});

// Deletes the requested item; subsequent indexes shift down by one.
app.delete('/api/equipment/:id', (req, res) => {
  const index = parseIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: 'ID must be a non-negative integer.' });
  if (index >= equipment.length) return res.status(404).json({ error: 'Equipment item not found.' });
  res.json(equipment.splice(index, 1)[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
