import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Content }         from '../content';
import { ContentService }  from '../../services/content.service';

@Component({
  selector: 'app-content-detail',
  templateUrl: './views/content.detail.component.html',
  styleUrls: [ './views/content.detail.component.css' ]
})
export class ContentDetail implements OnInit {
  @Input() movies: Content;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.contentService.getContent(id)
    //   .subscribe(contents => {
    //     console.log(contents);
    //     this.movies = contents;
    //   });
    this.contentService.getAllContent()
      .subscribe(content => {
        if(content) {
          for(let collection of content) {
            for(let item of collection['list']) {
              if (item.id === id) {
                  this.movies = item;
                  return;
              }
            }
          }
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.contentService.updateContent(this.movies)
      .subscribe(() => this.goBack());
  }
}
