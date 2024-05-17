const express = require('express');
const router = express.Router();
const sql = require('mssql');


router.get('/habitacion', async (req, res) => {
    try {
        console.log('Received request for /habitaciones');
        const result = await sql.query`SELECT * FROM Habitacion`;
        console.log('Query result:', result);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo ítem
router.post('/items', async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await sql.query`INSERT INTO Items (name, description) VALUES (${name}, ${description})`;
        res.status(201).json({ message: 'Item created' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener un ítem por ID
router.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Items WHERE id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un ítem
router.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await sql.query`UPDATE Items SET name = ${name}, description = ${description} WHERE id = ${id}`;
        res.json({ message: 'Item updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un ítem
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Items WHERE id = ${id}`;
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
