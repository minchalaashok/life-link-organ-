"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(store_1.db.bloodBanks));
router.get('/:id', (req, res) => {
    const b = store_1.db.bloodBanks.find((x) => x.id === req.params.id);
    if (!b) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(b);
});
exports.default = router;
