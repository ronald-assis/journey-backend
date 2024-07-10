import fastify from 'fastify'
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import {createTrip} from "./routes/create-trip";
import {confirmTrip} from "./routes/confirm-trip";

const app = fastify()
const PORT = 3333

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip, {prefix: '/api'})
app.register(confirmTrip, {prefix: '/api'})

app.listen({ port: PORT }).then(() => {
    console.log(`Server running in port: ${PORT}`)
})
