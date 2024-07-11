"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var cors_1 = require("@fastify/cors");
var fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
var routes_1 = require("./routes");
var app = (0, fastify_1.default)();
var PORT = 3333;
app.register(cors_1.default, {
    origin: true
});
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(routes_1.routes, { prefix: '/api' });
app.listen({ port: PORT }).then(function () {
    console.log("Server running in port: ".concat(PORT));
});
