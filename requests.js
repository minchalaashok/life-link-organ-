"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(store_1.db.requests));
router.get('/:id', (req, res) => {
    const r = store_1.db.requests.find((x) => x.id === req.params.id);
    if (!r) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(r);
});
router.post('/', (req, res) => {
    const request = {
        id: `r${Date.now()}`,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
    store_1.db.requests.push(request);
    res.status(201).json(request);
});
router.patch('/:id', (req, res) => {
    const idx = store_1.db.requests.findIndex((r) => r.id === req.params.id);
    if (idx === -1) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    store_1.db.requests[idx] = { ...store_1.db.requests[idx], ...req.body };
    res.json(store_1.db.requests[idx]);
});
exports.default = router;
