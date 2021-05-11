import { Request, Response, NextFunction } from 'express';

function parseQueryString(req: Request, res: Response, next: NextFunction): void {
  req.body = req.query;
  return next();
}

export default parseQueryString;
