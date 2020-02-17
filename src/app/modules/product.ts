export class Product {
  // temporary
  id: number;
  name: string;
  year: string;
  genre: string;
  director: string;

  // structure get from stash
  // type: string;
  // id: string;
  // title: string;
  // subTitle: string;
  // description: string;
  // videoUrl: string;
  coverImage: string;
  headerImage: string;
  pageImage: string;
// need to add a backgroundImage
  backgroundImage: string;

  // internal control
  hasFocus: boolean;

  constructor() {
    this.hasFocus = false;
  }
}
