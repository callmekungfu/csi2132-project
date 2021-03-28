export enum ErrorTypes {
  NOT_FOUND = 404,
}

export interface CommonError {
  type: ErrorTypes;
  message?: string;
}

export class NotFoundError implements CommonError {
  type = ErrorTypes.NOT_FOUND;
  constructor(public message?: string) {}
}

export const isCommonError = (obj: any): obj is CommonError => {
  return obj && 'type' in obj;
};
