import { Product } from './product';

export class Collection {
  title: string;
  list: { Product }[];

  // internal control
  first: number;
  last: number;
  size: number;
}
