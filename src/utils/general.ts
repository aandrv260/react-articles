type ObjectKey = string | number | symbol;

interface AnyObject {
  [key: ObjectKey]: any;
}

type ObjectEmptyCheck = (object: AnyObject) => boolean;

export const isObjectEmpty: ObjectEmptyCheck = object => Object.keys(object).length === 0;
