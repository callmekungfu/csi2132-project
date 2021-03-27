import Logger from '../lib/logger';
import express, { NextFunction } from 'express';

export const logErrors = (
  err: Error | undefined,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  if (err) {
    Logger.error(err.message);
    Logger.error(err.stack);
  }

  next(err);
};

export const defaultErrorResponse = (
  err: Error | undefined,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  if (err) {
    res.status(500).json({
      error: err?.message ?? 'Something went wrong, please try again later',
    });
  }
};
