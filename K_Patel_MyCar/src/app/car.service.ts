import { Injectable } from '@angular/core';
import {Content } from './helper-files/content-interface';
import { CONTENT } from './helper-files/contentDb'; 
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private messageService: MessageService) { }
  getContentObs():Observable<Content[]>{
    const contents = of(CONTENT);
    this.messageService.add('Content Array Loaded!!');
    return contents;
  }
  getContentById(id:number):Observable<any>{
    return of(CONTENT.find(item => item.id === id));
  }
}