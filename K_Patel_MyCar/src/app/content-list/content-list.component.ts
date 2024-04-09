import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { ContentCardComponent } from '../content-card/content-card.component';
import { FilterContentPipe } from '../filter-content.pipe';
import { FormsModule } from '@angular/forms';
import { HoverAffectDirective } from '../hover-affect.directive';
import { CarService } from '../car.service';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, FilterContentPipe, FormsModule, HoverAffectDirective],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit {
  DisplayContentInformation(contentItem: Content) {
    console.log(`ID: ${contentItem.id} and Title: ${contentItem.title}`);
    }

  searchTitle: string = '';
  contentExists: boolean = false;
  message: string = '';  
  selectedTitle: string | null = null;

  checkContentExists() {
    const foundItem = this.contentItems.find(item => item.title.toLowerCase() === this.searchTitle.toLowerCase());
    this.contentExists = !!foundItem;
    this.message = foundItem ? 'Content item exists.' : 'Content item does not exist.';
    this.selectedTitle = foundItem ? foundItem.title : null;
  }
  selectedContent?: Content;
  @Input () contentItems: Content[] = [];
  @Input() items:Content[] = [];


  constructor(private Car:CarService , private messageService: MessageService){}
  ngOnInit(): void {
    this.Car.getContentObs().subscribe(content => this.contentItems = content);
    this.Car.getContentById(4).subscribe(content=> this.items = content);
    console.log(this.items);   
  }

  onSelect(content: Content):void{
    this.selectedContent = content;
    this.messageService.add(`Content itme at ${content.id}`);
    console.log("clicked");
  }
 
}