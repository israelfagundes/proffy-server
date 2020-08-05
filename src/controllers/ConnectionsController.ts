import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionsController {
  async index(req: Request, res: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return res.json({ total });
  }

  async store(req: Request, res: Response) {
    const { user_id } = req.body;

    const userExists = await db('users').where('users.id', '=', user_id);

    if (userExists.length === 0) {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    await db('connections').insert({ user_id });

    return res.status(201).send();
  }
}

export default new ConnectionsController();
