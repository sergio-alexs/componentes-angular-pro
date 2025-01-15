import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  standalone: false,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() progress:number = 0;

  constructor() { }

}
