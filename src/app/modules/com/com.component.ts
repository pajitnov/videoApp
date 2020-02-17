import { Component, OnInit } from '@angular/core';
import { ComService } from '../../services/com.service';

@Component({
  selector: 'app-messages',
  templateUrl: './views/messages.component.html',
  styleUrls: ['./views/messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: ComService) {}

  ngOnInit() {
  }

}
