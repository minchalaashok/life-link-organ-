"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(store_1.db.articles));
router.get('/:id', (req, res) => {
    const a = store_1.db.articles.find((x) => x.id === req.params.id);
    if (!a) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(a);
});
exports.default = router;
