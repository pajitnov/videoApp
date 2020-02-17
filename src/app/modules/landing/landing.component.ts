import { Component, OnInit, HostListener  } from '@angular/core';
// import { Component, OnInit, OnDestroy, HostListener, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
// import { UniqueId } from '../../services/util.service';
// import { AppService } from '../../services/app.service';
// import { StateService } from '../../services/state.service';
// import { Events } from '../../enums';
// import { SwimlaneMeta } from '../../class';

// import { Content } from '../content';
import { Product } from '../product';
import { Collection } from '../collection';
import { ContentService } from '../../services/content.service';
import { Router } from "@angular/router";

// keyPress Observable => temporary : put in a common file
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

class Positions {
  firstPos: number;
  lastPos: number;
  arrSize: number;
}
class SelectedProduct {
  id: number;
  name: string;
  year: string;
  genre: string;
  director: string;
  // type: string;
  // id: string;
  // title: string;
  // subTitle: string;
  // description: string;
  // coverImage: string;
  // headerImage: string;
  // pageImage: string;
  // videoUrl: string;
  isSelected: boolean;
  collection: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './views/landing.component.html',
  styleUrls: [ './views/landing.component.css' ]
  // ,
  // host: {
  //   '(document:keydown)': 'handleKeyboardEvents($event)'
  // }
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
// export class LandingComponent implements OnInit, OnChanges, OnDestroy {
  items: Collection[] = [];
  selectedCollection: string;
  selectedProduct: SelectedProduct = new SelectedProduct;
  selectedId: number = 0;
  selectedPos: {posX: number, posY: number};
  //key = null;

  // keyPress Observable => temporary : put in a common file
  subscription: Subscription;
  subscription_keydown: Subscription;

  backgroundUrl: string;
  hasBackground: boolean = false;

  keytest = {
    ArrowDown: () => this.gridGoToDown(),
    ArrowUp: () => this.gridGoToUp()
  };


  // @Input() meta: SwimlaneMeta;
  // @Input() hasFocus: boolean;
  // @Input() opaque: boolean = false;
  // @Input() column: number;
  // keyListener: any;
  // unique: string;


  constructor(
    private contentService: ContentService,
    private router: Router//,
    // private app: AppService,
    // private state: StateService,
    // private detector: ChangeDetectorRef
  ) {
    this.selectedProduct.isSelected = false;
    this.selectedPos = {posX: -1, posY: -1};
  }



  ngOnInit() {
    this.getContent();
    // this.unique = UniqueId.newUniqueId();
    // this.setVisible();

    // keyPress Observable
    this.subscription = Observable.fromEvent(document, 'keypress').subscribe(e => {
      console.log('keypress: %o', e);
    });
    this.subscription_keydown = Observable.fromEvent(document, 'keydown').subscribe(e => {


      let keyDownList = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
      let checkArrowKeyPressed = (keyDown) => {
        for (let keyDownItem of keyDownList) {
          if(keyDownItem === keyDown) {
            return true;
          }
        }
        return false;
      };

      let currentEvent: any = e;
      if(checkArrowKeyPressed(currentEvent.key)) {
        this.handleArrowKeys(currentEvent.key);
      }
    });
  }
  ngOnDestroy() {
    // keyPress Observable
    this.subscription.unsubscribe();
    this.subscription_keydown.unsubscribe();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['hasFocus'] && changes['hasFocus'].currentValue) {
  //     this.meta.cIndex = Math.min(this.column, 3);
  //     this.meta.index = this.meta.mIndex + this.meta.cIndex;
  //     this.focus();
  //     // Listen to the key event.
  //     this.keyListener = this.app.key.subscribe(key => {
  //       if (this.state.show && !this.state.notify && this.hasFocus) {
  //         switch (key) {
  //           case 'LEFT': this.onLeft(); break;
  //           case 'RIGHT': this.onRight(); break;
  //           case 'ENTER': this.onEnter(); break;
  //         }
  //       }
  //     });
  //   } else if (changes['hasFocus'] && this.keyListener) {
  //     this.keyListener.unsubscribe();
  //   }
  // }

  /* Auxiliary methods */
  // typify is necessary to attrib the correct type of Product - when use TypeScript
  // usually, inside a for-loop, the item is not yet loaded, then the content cannot be identified
  // as a type of <Product> (for example), and it generates a compilation error.
  typifyProduct(contentToTypify) {
    return JSON.parse(JSON.stringify(contentToTypify));
  }
  // uggly: Need to improve
  clearFocus = () => {
    // for(let item of this.items) {
    //   let prod: Product;
    //   let list: {Product}[] = this.typifyProduct(item.list);
    //   for(let product of list) {
    //     product.hasFocus = false;
    //     console.log(product);
    //   }
    // }
    for(let i = 0 ; i < this.items.length ; i++) {
      let list: {Product}[] = this.typifyProduct(this.items[i].list);
      for(let j = 0 ; j < list.length ; j++) {
        let prod: any = this.items[i].list[j];
        // this.items[i].list[j].hasFocus = false;
        prod.hasFocus = false;
      }
    }
  };

  /* Common methods */
  getContent(): void {
    // this.contentService.getAllContent()
    this.contentService.getAllCollections()
      // .subscribe(content => this.movies = content.slice(1, 5));
      .subscribe(content => {
        if(content) {
          this.items = content;
          for(let collection of this.items) {
            collection.first = 0;
            collection.last = 4;
          }
          console.log('this.items: %o', this.items);
          //let product: Product = JSON.parse(JSON.stringify(this.items[0].list[0]));
          this.selectedId = this.typifyProduct(this.items[0].list[0]).id;
          this.onFocus(this.selectedId);
        }
      });
  }
  onFocus(id: number) {
    let productOnFocus;
    let collectionTitle: string;
    let getProductOnFocus = (productId: number) => {
      // for(let item of this.items) {
      //   for(let product of item.list) {
      //     if(product.id == productId) {
      //       product.hasFocus = true;
      //       productOnFocus = product;
      //       collectionTitle = item.title;
      //       return true;
      //     }
      //   }
      // }
      for(let i = 0 ; i < this.items.length ; i++) {
        let list: {Product}[] = this.typifyProduct(this.items[i].list);
        for(let j = 0 ; j < list.length ; j++) {
          let prod: any = this.items[i].list[j];
          if(prod.id == productId) {
            prod.hasFocus = true;
            productOnFocus = prod;
            collectionTitle = this.items[i].title;
            return true;
          }
        }
      }
      return false;
    };

    this.clearFocus();

    if(getProductOnFocus(id)){

      // define background
      this.hasBackground = false;
      if(productOnFocus.backgroundImage) {
        this.hasBackground = true;
        this.backgroundUrl = '../../../assets/images/' + productOnFocus.backgroundImage;
      }
      console.log(this.items);
      console.log(productOnFocus);
      console.log(this.backgroundUrl);

      // update information to header
      this.selectedProduct = productOnFocus;
      this.selectedProduct.isSelected = true;
      this.selectedProduct.collection = collectionTitle;

      // update information to navigation - Need to improve: duplcation with navigation??
      let currObj = this.getPosFromId(id);
      this.selectedPos.posX = currObj.x;
      this.selectedPos.posY = currObj.y;
    }
  }






  // mouseEnter(product): void {
  //   this.selectedProduct = product;
  //   this.isSelected = true;
  //   console.log('enter => product: %o; selected? %o', this.selectedProduct.id, this.isSelected);
  // }
  // mouseOut(): void {
  //   // this.selectedProduct = {};
  //   this.isSelected = false;
  //   console.log('leave => product: %o; selected? %o', this.selectedProduct.id, this.isSelected);
  // }




  /* ItemControl (Header Control) -> INI */
  goToDetailedProduct(productId: number) {
    console.log('goToDetailedProduct() :: productId: %o', productId);
    this.router.navigate(['/movie/' + productId]);
  }
  showHeader(isSelected: boolean) {
    return isSelected;
  }
  /* END <- ItemControl (Header Control) */

  /* StackListControl (Panel Control) -> INI */
  coverClick(productId: number) {
    this.selectedId = productId;
    this.onFocus(this.selectedId);
  }
  /* END <- StackListControl (Panel Control) */





  /* Carousel -> INI */
  next(index: number): void {
    let positions: Positions = this.getCollectionPositions(index);

    let newFirst = positions.firstPos < positions.arrSize - 4 ? positions.firstPos + 1 : 0;
    let newLast = positions.lastPos < positions.arrSize ? positions.lastPos + 1 : 4;

    this.assignCarouselPositions(index, newFirst, newLast);
  }
  previous(index: number): void {
    let positions: Positions = this.getCollectionPositions(index);

    let newFirst: number = positions.firstPos > 0 ? positions.firstPos - 1 : positions.arrSize - 4;
    let newLast: number = positions.lastPos > 4 ? positions.lastPos - 1 : positions.arrSize;

    this.assignCarouselPositions(index, newFirst, newLast);
  }
  assignCarouselPositions(index: number, firstPosition: number, lastPosition: number) {
    this.items[index].first = firstPosition;
    this.items[index].last = lastPosition;
  }
  getCollectionPositions(index: number) {
    let positions: Positions = {
      firstPos: this.items[index].first,
      lastPos: this.items[index].last,
      arrSize: this.items[index].list.length
    };
    return positions;
  }
  /* END <- Carousel */


  /* Grid test 1 -> INI */
  getPosFromId(id) {
    let cX = 0, cY = 0;
    // for(let currY of this.items) {
    //   cX = 0;
    //   for(let currX of currY.list) {
    //     if(currX.id == id) {
    //       let newX = cX - this.items[cY].first;
    //       return {x: newX, y: cY};
    //     }
    //     cX++;
    //   }
    //   cY++;
    // }
    for(let i = 0 ; i < this.items.length ; i++) {
      let list: {Product}[] = this.typifyProduct(this.items[i].list);
      cX = 0;
      for(let j = 0 ; j < list.length ; j++) {
        let prod: any = this.items[i].list[j];
        if(prod.id == id) {
          let newX = cX - this.items[cY].first;
          return {x: newX, y: cY};
        }
        cX++;
      }
      cY++;
    }


  }
  getIdFromPos(posX, posY) {
    let refX = posX + this.items[posY].first;
    return this.typifyProduct(this.items[posY].list[refX]).id;
  }
  updateUIGrid(posX: number, posY: number) {
    this.selectedId = this.getIdFromPos(posX, posY);
    this.selectedPos.posX = posX;
    this.selectedPos.posY = posY;

    // to improve
    // Collection[]
    // for(let i=0 ; i < this.items.length ; i++ ){
    //   let currY: Collection = this.items[i];
    //   console.log('currY: %o', currY);
    //   for(let j=0 ; j < currY.list.length ; j++ ){
    //     let currX: Product[] = currY.list[j];
    //     console.log('currX: %o', currX);
    //     // if(currX.id == this.selectedId) {
    //   }
    // }

    this.onFocus(this.selectedId);
    // for(let currY of this.items) {
    //   for(let currX of currY.list) {
    //     if(currX.id == this.selectedId) {
    //       this.selectedProduct = currX;
    //       this.selectedProduct.isSelected = true;
    //       this.selectedProduct.collection = currY.title;
    //       return;
    //     }
    //   }
    // }
  }

  gridGoToUp() {
    let currObj = this.getPosFromId(this.selectedId);
    if(currObj.y > 0) {
      currObj.y--;
      this.updateUIGrid(currObj.x, currObj.y);
    }
  }
  gridGoToDown() {
    let currObj = this.getPosFromId(this.selectedId);
    if(currObj.y < 2) {
      currObj.y++;
      this.updateUIGrid(currObj.x, currObj.y);
    }
  }
  gridGoToRight() {
    let currObj = this.getPosFromId(this.selectedId);
    // check if the grid is in the last position
    // this.isGridLimitX(currObj.y, currObj.x, 'last');
    //   this.next(currObj.y);
    // }
    let positions: Positions = this.getCollectionPositions(currObj.y);
    if(positions.lastPos < positions.arrSize || currObj.x < 3) {
      if(currObj.x === this.items[currObj.y].last-this.items[currObj.y].first-1) {
        this.next(currObj.y);
      } else {
        currObj.x++;
      }
      this.updateUIGrid(currObj.x, currObj.y);
    }
  }
  gridGoToLeft() {
    let currObj = this.getPosFromId(this.selectedId);
    // this.isGridLimitX(currObj.y, currObj.x, 'first');
    let positions: Positions = this.getCollectionPositions(currObj.y);
    if(positions.firstPos > 0 || currObj.x > 0) {
      if (currObj.x === 0) {

        this.previous(currObj.y);
      } else {
        currObj.x--;
      }
      this.updateUIGrid(currObj.x, currObj.y);
    }
  }
  // isGridLimitX(itemIndex: number, currGridPosX: number, limitToCheck: string) {
  //   let positions: Positions = this.getCollectionPositions(itemIndex);
  //   if(limitToCheck === 'first') {
  //     console.log('isGridLimitX() :: first :: firstPos: %o; currGridX: %o; isMinLimit? %o', positions.firstPos, currGridPosX, positions.firstPos <= currGridPosX)
  //     return positions.firstPos <= currGridPosX;
  //   }
  //   if(limitToCheck === 'last') {
  //     console.log('isGridLimitX() :: last :: lastPos: %o; currGridX: %o; isMaxLimit? %o', positions.lastPos, currGridPosX, positions.lastPos >= currGridPosX)
  //     return positions.lastPos >= currGridPosX;
  //   }
  //   return false;
  // }
  /* END <- Grid test 1 */


  /* Grid test 2 -> INI */
  // onLeft(): void {
  //   if (this.meta.index > 0) {
  //     this.meta.index--;
  //     if (this.meta.cIndex > 0) {
  //       this.meta.cIndex--;
  //     } else {
  //       this.meta.mIndex--;
  //     }
  //   }
  //   this.focus();
  // }
  //
  // onRight(): void {
  //   let max = this.meta.items.length - 1;
  //   if (this.meta.index < max) {
  //     this.meta.index++;
  //     if (this.meta.cIndex < 3) {
  //       this.meta.cIndex++;
  //     } else {
  //       this.meta.mIndex++;
  //     }
  //   }
  //   this.focus();
  // }
  //
  // onEnter(): void {
  //   let item = this.meta.items[this.meta.index];
  //   if (item.is_locked) {
  //     this.app.setEvent(Events.NOTIFY_LOGOUT);
  //   } else {
  //     this.app.setEvent(Events.SWIMLANE_ENTER, {item: item});
  //   }
  // }
  //
  // focus(): void {
  //   if (this.meta && this.meta.items) {
  //     this.setVisible();
  //     this.meta.index = this.meta.index || 0;
  //     this.app.focus = this.unique + this.meta.items[this.meta.index]['id'].toString();
  //     this.app.setEvent(Events.SWIMLANE_FOCUS, { item: this.meta.items[this.meta.index], meta: this.meta });
  //     this.detector.markForCheck();
  //   }
  // }
  //
  // /**
  //  * Set visible property of the tiles.
  //  */
  // setVisible(): void {
  //   // Delay slightly, allowing the current focus/scroll to complete before the extra work of showing/hiding elements.
  //   setTimeout(() => {
  //     for (let i = 0; i < this.meta.items.length; i++) {
  //       this.meta.items[i].visible = i >= this.meta.index - this.meta.cIndex - 2 && i <= this.meta.index + 5 - this.meta.cIndex;
  //     }
  //   }, 10);
  // }
  //
  // ngOnDestroy () {
  //   if (this.keyListener) {this.keyListener.unsubscribe(); }
  // }
  /* END <- Grid test 2 */


  /* Grid key handle 1 -> INI */
  // handleKeyboardEvents(event: KeyboardEvent) {
  //   let key = event.which || event.keyCode;
  //   if(key === 38) {
  //     this.gridGoToUp();
  //   }
  //   if(key === 40) {
  //     this.gridGoToDown();
  //   }
  //   if(key === 37) {
  //     this.gridGoToLeft();
  //   }
  //   if(key === 39) {
  //     this.gridGoToRight();
  //   }
  // }
  /* END <- Grid key handle 1 */

  /* Grid key handle 2 - Observable -> INI */
  handleArrowKeys(arrowKeyPressed: string) {
    if(arrowKeyPressed === 'ArrowUp') {
      this.gridGoToUp();
    }
    if(arrowKeyPressed === 'ArrowDown') {
      this.gridGoToDown();
    }
    if(arrowKeyPressed === 'ArrowLeft') {
      this.gridGoToLeft();
    }
    if(arrowKeyPressed === 'ArrowRight') {
      this.gridGoToRight();
    }
  }
  /* END <- Grid key handle 2 - Observable */
}
