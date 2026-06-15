"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const donors_1 = __importDefault(require("./routes/donors"));
const hospitals_1 = __importDefault(require("./routes/hospitals"));
const bloodBanks_1 = __importDefault(require("./routes/bloodBanks"));
const requests_1 = __importDefault(require("./routes/requests"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const campaigns_1 = __importDefault(require("./routes/campaigns"));
const articles_1 = __importDefault(require("./routes/articles"));
const notifications_1 = __importDefault(require("./routes/notifications"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const corsOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim());
app.use((0, cors_1.default)({
    origin: corsOrigins.includes('*') ? true : corsOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        name: 'Organ Donation & Lifesaving Finder API',
        version: '1.0.0',
        status: 'live',
        docs: '/api/health',
        endpoints: {
            auth: '/api/auth',
            donors: '/api/donors',
            hospitals: '/api/hospitals',
            bloodBanks: '/api/blood-banks',
            requests: '/api/requests',
            dashboard: '/api/dashboard',
            campaigns: '/api/campaigns',
            articles: '/api/articles',
            notifications: '/api/notifications',
        },
    });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});
app.use('/api/auth', auth_1.default);
app.use('/api/donors', donors_1.default);
app.use('/api/hospitals', hospitals_1.default);
app.use('/api/blood-banks', bloodBanks_1.default);
app.use('/api/requests', requests_1.default);
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/campaigns', campaigns_1.default);
app.use('/api/articles', articles_1.default);
app.use('/api/notifications', notifications_1.default);
app.use((_req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
app.listen(PORT, () => {
    console.log(`LifeLink API running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
exports.default = app;
