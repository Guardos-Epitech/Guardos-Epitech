import * as express from 'express';
import { Response, Request } from 'express';

const router = express.Router();

router.post('/', async function (req: Request, res: Response) {
  try {
    const data = req.body;

    return res.send(data);
  } catch (error) {
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

export default router;
