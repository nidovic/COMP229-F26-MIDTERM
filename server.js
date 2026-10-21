/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

const app = express();
app.set('json spaces', 2);
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

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const idValidation = [
  param('id')
    .isInt({ min: 0 })
    .withMessage('ID must be a non-negative integer.')
    .bail()
    .custom(id => /^\d+$/.test(id) && Number.isSafeInteger(Number(id)))
    .withMessage('ID must be a safe integer.')
];

const equipmentValidation = [
  body('name')
    .isString()
    .withMessage('Name must be a string.')
    .bail()
    .custom(value => value.trim() !== '')
    .withMessage('Name cannot be empty.'),
  body('category')
    .isString()
    .withMessage('Category must be a string.')
    .bail()
    .custom(value => value.trim() !== '')
    .withMessage('Category cannot be empty.'),
  body('brand')
    .isString()
    .withMessage('Brand must be a string.')
    .bail()
    .custom(value => value.trim() !== '')
    .withMessage('Brand cannot be empty.'),
  body('year')
    .isInt()
    .withMessage('Year must be an integer.')
    .bail()
    .custom(value => typeof value === 'number')
    .withMessage('Year must be a number.'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer.')
    .bail()
    .custom(value => typeof value === 'number')
    .withMessage('Quantity must be a number.')
];

// Returns the complete equipment collection.
app.get('/api/equipment', (req, res) => {
  res.json(equipment);
});

// Keep the filter route before /:id.
// Returns only the equipment in the requested category.
app.get('/api/equipment/filter', [
  query('category')
    .isString()
    .withMessage('A category query parameter is required.')
    .bail()
    .custom(category => category.trim() !== '')
    .withMessage('Category cannot be empty.'),
  handleValidationErrors
], (req, res) => {
  const { category } = req.query;
  res.json(equipment.filter(item => item.category === category));
});

// Finds an equipment item by its array index.
app.get('/api/equipment/:id', idValidation, handleValidationErrors, (req, res) => {
  const index = Number(req.params.id);
  if (index >= equipment.length) return res.status(404).json({ error: 'Equipment item not found.' });
  res.json(equipment[index]);
});

// Validates and adds a new equipment item to the collection.
app.post('/api/equipment', equipmentValidation, handleValidationErrors, (req, res) => {
  equipment.push(req.body);
  res.status(201).json(req.body);
});

// Validates and replaces the equipment item at the requested index.
app.put('/api/equipment/:id', idValidation, equipmentValidation, handleValidationErrors, (req, res) => {
  const index = Number(req.params.id);
  if (index >= equipment.length) return res.status(404).json({ error: 'Equipment item not found.' });
  equipment[index] = req.body;
  res.json(req.body);
});

// Deletes the requested item; subsequent indexes shift down by one.
app.delete('/api/equipment/:id', idValidation, handleValidationErrors, (req, res) => {
  const index = Number(req.params.id);
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
