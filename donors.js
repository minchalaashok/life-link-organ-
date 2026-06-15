"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(store_1.db.donors));
router.get('/:id', (req, res) => {
    const donor = store_1.db.donors.find((d) => d.id === req.params.id);
    if (!donor) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(donor);
});
router.post('/', (req, res) => {
    const donor = { id: `d${Date.now()}`, ...req.body, rating: 5.0, isAvailable: true };
    store_1.db.donors.push(donor);
    res.status(201).json(donor);
});
router.patch('/:id', (req, res) => {
    const idx = store_1.db.donors.findIndex((d) => d.id === req.params.id);
    if (idx === -1) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    store_1.db.donors[idx] = { ...store_1.db.donors[idx], ...req.body };
    res.json(store_1.db.donors[idx]);
});
exports.default = router;
