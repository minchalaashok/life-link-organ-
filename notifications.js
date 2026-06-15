"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(store_1.db.notifications));
router.patch('/:id/read', (req, res) => {
    const n = store_1.db.notifications.find((x) => x.id === req.params.id);
    if (!n) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    n.read = true;
    res.json(n);
});
exports.default = router;
