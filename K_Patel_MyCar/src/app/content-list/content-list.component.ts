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
import { ModifyContentComponent } from '../modify-content/modify-content.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, TypedeciderPipe, FormsModule, HoverAffectDirective, ModifyContentComponent],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit {
  DisplayContentInformation(contentItem: Content) {
    console.log(`ID: ${contentItem.id} and Title: ${contentItem.title}`);
    }

  @Input() contentItems: Content[] = [];
  @Input() items:Content[] = [];
  searchTitle: string = '';
  contentExists: boolean = false;
  message: string = '';  
  selectedTitle: string | null = null;


  id:any;
  selectedContent?: Content;
  checkContentExists() {
    const foundItem = this.contentItems.find(item => item.title.toLowerCase() === this.searchTitle.toLowerCase());
    this.contentExists = !!foundItem;
    this.message = foundItem ? 'Content item exists.' : 'Content item does not exist.';
    this.selectedTitle = foundItem ? foundItem.title : null;
  }

      }
  onSelect(content: Content):void{
    this.selectedContent = content;
    this.MessageService.add(`Content itme at ${content.id}`);
    console.log("clicked");
  }

  onContentAdded(newContent: Content): void {
    this.contentItems = [...this.contentItems, newContent];
    this.MessageService.add('Content added successfully');
  }
 
}

onContentCreated(newContent: any) {
  this.contentItems.push({ ...newContent });
}
}
