// import fastifySwagger from '@fastify/swagger';
// import fastifySwaggerUi from '@fastify/swagger-ui';
// import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// // Define types for the Item
// interface Item {
//   id: number;
//   name: string;
// }

// // Define types for the request and response
// interface CreateItemRequest {
//   name: string;
// }

// interface GetItemResponse {
//   id: number;
//   name: string;
// }

// interface NotFoundResponse {
//   message: string;
// }

// // Swagger options
// export async function setupSwagger(app: FastifyInstance) {
//   const swaggerOptions = {
//     swagger: {
//       info: {
//         title: 'My API',
//         description: 'API documentation for my application.',
//         version: '1.0.0',
//       },
//       host: 'localhost:3000',
//       schemes: ['http', 'https'],
//       consumes: ['application/json'],
//       produces: ['application/json'],
//       tags: [{ name: 'Default', description: 'Default endpoints' }],
//     },
//   };

//   const swaggerUiOptions = {
//     routePrefix: '/docs',
//     exposeRoute: true,
//   };

//   // Register Swagger
//   await app.register(fastifySwagger, swaggerOptions);

//   // Register Swagger UI
//   await app.register(fastifySwaggerUi, swaggerUiOptions);

//   // Example route 1: Get all items
//   app.get<any>('/items', {
//     schema: {
//       tags: ['Default'],
//       response: {
//         200: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               id: { type: 'number' },
//               name: { type: 'string' },
//             },
//           },
//         },
//       },
//     },
//     handler: (req: FastifyRequest, res: FastifyReply) => {
//       // Sample data
//       const items: Item[] = [
//         { id: 1, name: 'Item One' },
//         { id: 2, name: 'Item Two' },
//       ];
//       res.send(items);
//     },
//   });

//   // Example route 2: Get an item by ID
//   app.get<{
//     Params: { id: string };
//     Reply: GetItemResponse | NotFoundResponse;
//   }>('/items/:id', {
//     schema: {
//       tags: ['Default'],
//       params: {
//         type: 'object',
//         properties: {
//           id: { type: 'string' },
//         },
//       },
//       response: {
//         200: {
//           type: 'object',
//           properties: { id: { type: 'number' }, name: { type: 'string' } },
//         },
//         404: { type: 'object', properties: { message: { type: 'string' } } },
//       },
//     },
//     handler: (
//       req: FastifyRequest<{ Params: { id: string } }>,
//       res: FastifyReply
//     ) => {
//       const itemId = parseInt(req.params.id);
//       const item: Item | undefined = { id: itemId, name: `Item ${itemId}` }; // Sample data
//       if (item) {
//         res.send(item);
//       } else {
//         res.status(404).send({ message: 'Item not found' });
//       }
//     },
//   });

//   // Example route 3: Create a new item
//   app.post<{ Body: CreateItemRequest; Reply: GetItemResponse }>('/items', {
//     schema: {
//       tags: ['Default'],
//       body: {
//         type: 'object',
//         properties: {
//           name: { type: 'string' },
//         },
//         required: ['name'],
//       },
//       response: {
//         201: {
//           type: 'object',
//           properties: { id: { type: 'number' }, name: { type: 'string' } },
//         },
//       },
//     },
//     handler: (
//       req: FastifyRequest<{ Body: CreateItemRequest }>,
//       res: FastifyReply
//     ) => {
//       const newItem: Item = { id: Date.now(), name: req.body.name }; // Sample data
//       res.status(201).send(newItem);
//     },
//   });

//   // Additional routes can be added here following the same pattern.
// }
