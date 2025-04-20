import { Component } from '@angular/core';

@Component({
  selector: 'app-event-child',
  standalone: false,
  templateUrl: './event-child.component.html',
  styleUrl: './event-child.component.css'
})
export class EventChildComponent {
  Info: any;

  async ngOnInit() {
    const Devinfo = await import('event_shell/DevInfo');
    this.Info = Devinfo.DeveloperInfo();
  }
}
