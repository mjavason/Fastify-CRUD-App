import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { setupSwagger } from './swagger.config';

const app: FastifyInstance = fastify({ logger: true });

// Setup Swagger
setupSwagger(app);

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
      description: 'Get all items',
      tags: ['Items'],
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

// Get item by ID
app.get(
  '/items/:id',
  {
    schema: {
      description: 'Get an item by ID',
      tags: ['Items'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      response: {
        200: itemSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    const item = items.find(i => i.id === request.params.id);
    if (!item) {
      reply.status(404).send({ message: 'Item not found' });
    } else {
      return item;
    }
  }
);

// Create a new item
app.post(
  '/items',
  {
    schema: {
      description: 'Create a new item',
      tags: ['Items'],
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

// Update an item by ID
app.put(
  '/items/:id',
  {
    schema: {
      description: 'Update an item by ID',
      tags: ['Items'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      body: createUpdateItemSchema,
      response: {
        200: itemSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  async (
    request: FastifyRequest<{ Params: { id: number }; Body: CreateUpdateItemRequest }>,
    reply: FastifyReply
  ) => {
    const itemIndex = items.findIndex(i => i.id === request.params.id);
    if (itemIndex === -1) {
      reply.status(404).send({ message: 'Item not found' });
    } else {
      items[itemIndex].name = request.body.name;
      return items[itemIndex];
    }
  }
);

// Delete an item by ID
app.delete(
  '/items/:id',
  {
    schema: {
      description: 'Delete an item by ID',
      tags: ['Items'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    const itemIndex = items.findIndex(i => i.id === request.params.id);
    if (itemIndex === -1) {
      reply.status(404).send({ message: 'Item not found' });
    } else {
      items.splice(itemIndex, 1);
      reply.status(200).send({ message: 'Item deleted' });
    }
  }
);

// Start the server
const start = async () => {
  try {
    await app.listen(5000);
    console.log('Server is running at http://localhost:5000');
    console.log('Swagger docs available at http://localhost:5000/documentation');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
