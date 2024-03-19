export interface ParamObj {
  [key: string]: string | number;
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
