"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const router = (0, express_1.Router)();
router.get('/stats', (_req, res) => res.json(store_1.db.stats));
router.get('/overview', (_req, res) => {
    res.json({
        stats: store_1.db.stats,
        recentRequests: store_1.db.requests.slice(0, 5),
        recentDonors: store_1.db.donors.slice(0, 5),
        activeCampaigns: store_1.db.campaigns.filter((c) => c.status === 'active'),
        notifications: store_1.db.notifications,
    });
});
exports.default = router;
