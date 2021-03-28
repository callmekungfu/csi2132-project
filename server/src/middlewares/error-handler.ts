import Logger from '../lib/logger';
import express, { NextFunction } from 'express';
import { CommonError, isCommonError } from '../lib/errors';

export const logErrors = (
  err: Error | CommonError | undefined,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  if (err) {
    Logger.error(err.message);
    if (err instanceof Error) {
      Logger.error(err.stack);
    }
  }

  next(err);
};

export const defaultErrorResponse = (
  err: Error | CommonError | undefined,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  if (err) {
    if (isCommonError(err)) {
      res.status(err.type).json({
        error: err.message ?? 'N/A',
      });
    } else {
      res.status(500).json({
        error: 'Something went wrong on our side, please try again later.',
      });
    }
  }
};
