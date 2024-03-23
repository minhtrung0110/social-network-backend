import * as moment from 'moment';

export interface ParamObj {
  [key: string]: string | number | any;
}

export function convertNumbers(obj: ParamObj): ParamObj {
  const newObj: ParamObj = { ...obj };
  for (const key in newObj) {
    if (typeof newObj[key] === 'string' && !isNaN(parseInt(newObj[key] as string))) {
      newObj[key] = parseInt(newObj[key] as string);
    }
  }
  return newObj;
}

export const getExpiry = () => {
  const createdAt = new Date();
  const expiresAt = moment(createdAt).add(5, 'minutes').toDate();
  return expiresAt;
};

export function isTokenExpired(expiry: Date): boolean {
  const expirationDate = new Date(expiry);
  const currentDate = new Date();
  return expirationDate.getTime() <= currentDate.getTime();
}
