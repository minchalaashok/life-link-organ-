"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = store_1.db.users.find((u) => u.email === email && u.password === password);
    if (!user) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser, token: `demo-token-${user.id}` });
});
router.post('/register', (req, res) => {
    const { email, password, fullName, phone, role } = req.body;
    if (store_1.db.users.some((u) => u.email === email)) {
        res.status(400).json({ success: false, message: 'Email already registered' });
        return;
    }
    const user = {
        id: `u${Date.now()}`,
        email,
        password,
        fullName,
        phone,
        role: role || 'donor',
        isVerified: false,
    };
    store_1.db.users.push(user);
    const { password: _, ...safeUser } = user;
    res.status(201).json({ success: true, user: safeUser, token: `demo-token-${user.id}` });
});
router.get('/users', (_req, res) => {
    res.json(store_1.db.users.map(({ password, ...u }) => u));
});
router.get('/users/:id', (req, res) => {
    const user = store_1.db.users.find((u) => u.id === req.params.id);
    if (!user) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const { password, ...safeUser } = user;
    res.json(safeUser);
});
exports.default = router;
