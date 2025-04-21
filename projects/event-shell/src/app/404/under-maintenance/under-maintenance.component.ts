import { Component } from '@angular/core';

@Component({
  selector: 'app-under-maintenance',
  standalone: false,
  templateUrl: './under-maintenance.component.html',
  styleUrl: './under-maintenance.component.css'
})
export class UnderMaintenanceComponent {
  contact(){
    alert("Administrator will contact you soon")
  }
}
