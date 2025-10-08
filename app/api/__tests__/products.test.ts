
import { NextApiRequest } from 'next';
import request from 'supertest';
import { createServer } from 'http';
import { NextApiHandler } from 'next';
import { GET } from '@/app/api/products/route';

const testHandler: NextApiHandler = async (req, res) => {
  const response = await GET(req as NextApiRequest);
  const json = await response.json();
  res.status(response.status).json(json);
};

const server = createServer(testHandler);

describe('GET /api/products', () => {
  it('should return 200 OK', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
  });
});
