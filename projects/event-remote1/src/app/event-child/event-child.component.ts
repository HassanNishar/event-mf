import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-child',
  standalone: false,
  templateUrl: './event-child.component.html',
  styleUrl: './event-child.component.css'
})
export class EventChildComponent implements OnInit {
  formattedDate: string = '';

  async ngOnInit() {
    try {
      const date: Date = new Date('Thu Apr 16 2025 13:44:33 GMT+0530 (India Standard Time)');
      const utils = await import('event_shell/Utils');
      this.formattedDate = utils.formatDate(date);
    } catch (error) {
      console.error('Error loading Utils module:', error);
    }
  }
  
}
