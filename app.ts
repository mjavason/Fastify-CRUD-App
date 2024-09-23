import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

const app: FastifyInstance = fastify({ logger: true });

interface Item {
  id: number;
  name: string;
}

interface CreateUpdateItemRequest {
  name: string;
}

let items: Item[] = [];
let currentId = 1;

// Schema definitions
const itemSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
  },
};

const createUpdateItemSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
};

// Get all items
app.get(
  '/items',
  {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemSchema,
        },
      },
    },
  },
  async (request: FastifyRequest, reply: FastifyReply) => {
    return items;
  }
);

// Create a new item
app.post(
  '/items',
  {
    schema: {
      body: createUpdateItemSchema,
      response: {
        201: itemSchema,
      },
    },
  },
  async (
    request: FastifyRequest<{ Body: CreateUpdateItemRequest }>,
    reply: FastifyReply
  ) => {
    const newItem: Item = { id: currentId++, name: request.body.name };
    items.push(newItem);
    reply.status(201).send(newItem);
  }
);

// Start the server
const start = async () => {
  try {
    await app.listen({ port: 5000 });
    console.log('Server is running at http://localhost:5000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
