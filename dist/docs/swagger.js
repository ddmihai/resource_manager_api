"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("../config/env");
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Energy Manager API',
        version: '1.0.0',
        description: 'REST API for managing resources, companies, storage assets, and authentication for the Energy Manager platform.',
        contact: {
            name: 'Energy Manager Team',
        },
    },
    servers: [
        {
            url: `http://localhost:${env_1.env.PORT}`,
            description: 'Local development server',
        },
    ],
    tags: [
        { name: 'Health', description: 'Service health and uptime probes' },
        { name: 'Resources', description: 'Commodity catalog management' },
        { name: 'Users', description: 'Authentication and user lifecycle' },
        { name: 'Companies', description: 'Player company management' },
        { name: 'Storage', description: 'Storage ownership and provisioning' },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token',
                description: 'JWT issued by the login endpoint and stored in the `token` cookie.',
            },
        },
        schemas: {
            ApiError: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    details: { description: 'Optional validation or error metadata' },
                },
            },
            HealthResponse: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            Resource: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string', example: 'iron' },
                    description: { type: 'string' },
                    basePricePerUnit: { type: 'number' },
                    pricePerUnit: { type: 'number' },
                    unitOfMeasurement: {
                        type: 'string',
                        enum: ['kwh', 'liter', 'cubic_meter', 'kg', 'ton', 'unit'],
                    },
                    image: { type: 'string', nullable: true },
                    isRaw: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
                required: ['name', 'description', 'basePricePerUnit', 'pricePerUnit', 'unitOfMeasurement', 'isRaw'],
            },
            CreateResourceRequest: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'lithium' },
                    description: { type: 'string' },
                    basePricePerUnit: { type: 'number' },
                    pricePerUnit: { type: 'number' },
                    unitOfMeasurement: {
                        type: 'string',
                        enum: ['kwh', 'liter', 'cubic_meter', 'kg', 'ton', 'unit'],
                    },
                    isRaw: { type: 'boolean' },
                    image: { type: 'string', nullable: true },
                },
                required: ['name', 'description', 'basePricePerUnit', 'pricePerUnit', 'unitOfMeasurement', 'isRaw'],
            },
            UpdateResourceRequest: {
                allOf: [
                    {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Resource id to update' },
                        },
                        required: ['id'],
                    },
                    {
                        $ref: '#/components/schemas/CreateResourceRequest',
                    },
                ],
            },
            SignupRequest: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    fullName: { type: 'string' },
                    role: { type: 'string', enum: ['user'], description: 'Only `user` roles are accepted through this endpoint.' },
                },
                required: ['email', 'password', 'fullName', 'role'],
            },
            LoginRequest: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
                required: ['email', 'password'],
            },
            Company: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    ownerId: { type: 'string' },
                    locationId: { type: 'string' },
                    industryId: { type: 'string' },
                    tax: { type: 'number' },
                    capital: { type: 'number' },
                    companyShareValue: { type: 'number' },
                    totalShares: { type: 'number' },
                    availableShares: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
                required: ['name', 'ownerId', 'locationId', 'industryId'],
            },
            CreateCompanyRequest: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'NovaGrid Industries' },
                    description: { type: 'string' },
                    locationId: { type: 'string' },
                    industryId: { type: 'string' },
                },
                required: ['name', 'locationId', 'industryId'],
            },
            StorageOwnership: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    companyId: { type: 'string' },
                    locationId: { type: 'string' },
                    bluePrintId: { type: 'string' },
                    capacity: { type: 'number' },
                    storedAmount: { type: 'number' },
                    connectedProducers: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    condition: { type: 'number' },
                    lastMaintenanceAt: { type: 'string', format: 'date-time' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            CreateStorageOwnershipRequest: {
                type: 'object',
                properties: {
                    companyId: { type: 'string' },
                    locationId: { type: 'string' },
                    bluePrintId: { type: 'string' },
                },
                required: ['companyId', 'locationId', 'bluePrintId'],
            },
        },
    },
    paths: {
        '/health': {
            get: {
                tags: ['Health'],
                summary: 'Load-balancer health check',
                responses: {
                    200: {
                        description: 'Service is alive',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/HealthResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/api/health': {
            get: {
                tags: ['Health'],
                summary: 'API health probe',
                responses: {
                    200: {
                        description: 'Service is alive',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/HealthResponse' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/resources/get-ressources': {
            get: {
                tags: ['Resources'],
                summary: 'List every resource definition',
                responses: {
                    200: {
                        description: 'Collection returned',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Resource' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/resources/create-ressource': {
            post: {
                tags: ['Resources'],
                summary: 'Create a new resource entry',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CreateResourceRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Resource created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string', example: 'Resource created successfully' },
                                        data: { $ref: '#/components/schemas/Resource' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/resources/get-resource/{id}': {
            get: {
                tags: ['Resources'],
                summary: 'Fetch a resource by id',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'MongoDB ObjectId of the resource',
                    },
                ],
                responses: {
                    200: {
                        description: 'Resource found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        data: { $ref: '#/components/schemas/Resource' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Resource not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/resources/edit-resource': {
            put: {
                tags: ['Resources'],
                summary: 'Update an existing resource',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateResourceRequest' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Resource updated',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        data: { $ref: '#/components/schemas/Resource' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Resource not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/users/signup': {
            post: {
                tags: ['Users'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/SignupRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                user: {
                                                    type: 'object',
                                                    description: 'Persisted user data without password',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Validation failure',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/users/login': {
            post: {
                tags: ['Users'],
                summary: 'Authenticate a user and issue a session cookie',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LoginRequest' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful and cookie set',
                        headers: {
                            'Set-Cookie': {
                                schema: { type: 'string' },
                                description: 'Contains the HttpOnly JWT cookie',
                            },
                        },
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        message: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    403: {
                        description: 'Invalid credentials',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/company/create': {
            post: {
                tags: ['Companies'],
                summary: 'Create a company for the authenticated user',
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CreateCompanyRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Company created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        company: { $ref: '#/components/schemas/Company' },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/company/all': {
            get: {
                tags: ['Companies'],
                summary: 'List companies owned by the authenticated user',
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: 'Company list returned',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        companies: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Company' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
        '/api/v1/storage/create-ownership': {
            post: {
                tags: ['Storage'],
                summary: 'Provision a storage ownership record',
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CreateStorageOwnershipRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Storage ownership created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean' },
                                        data: { $ref: '#/components/schemas/StorageOwnership' },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiError' },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: swaggerDefinition,
    apis: [],
});
//# sourceMappingURL=swagger.js.map