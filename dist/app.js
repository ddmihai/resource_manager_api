"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const modules_1 = __importDefault(require("./modules"));
const errorHandler_1 = require("./middleware/errorHandler");
const resources_routes_1 = __importDefault(require("./modules/resource/routes/resources.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./modules/users/routes/user.routes"));
const index_routes_1 = __importDefault(require("./modules/company/routes/index.routes"));
const storage_routes_1 = __importDefault(require("./modules/storage/routes/storage.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5174", // exact frontend origin
    credentials: true, // allow cookies
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, { explorer: true }));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', modules_1.default);
app.use('/api/v1/resources', resources_routes_1.default);
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/company', index_routes_1.default);
app.use('/api/v1/storage', storage_routes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map