export enum ErrorTypes {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}

export interface CommonError {
  type: ErrorTypes;
  message?: string;
}

export class NotFoundError implements CommonError {
  type = ErrorTypes.NOT_FOUND;
  constructor(public message?: string) {}
}

export class BadRequestError implements CommonError {
  type = ErrorTypes.BAD_REQUEST;
  constructor(public message?: string) {}
}

export const isCommonError = (obj: any): obj is CommonError => {
  return obj && 'type' in obj;
};
