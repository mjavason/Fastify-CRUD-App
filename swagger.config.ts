import fastifySwagger from '@fastify/swagger';
import { FastifyInstance } from 'fastify';

// Swagger options

export async function setupSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    exposeRoute: true, // Exposes Swagger at /documentation
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Items API',
        description: 'API for managing items',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Items',
          description: 'Operations related to items',
        },
      ],
    },
  });
}
