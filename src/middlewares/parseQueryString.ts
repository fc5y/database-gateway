import { Request, Response, NextFunction } from 'express';

function parseQueryString(req: Request, res: Response, next: NextFunction) {
  req.body = req.query;
  return next();
}

export default parseQueryString;
