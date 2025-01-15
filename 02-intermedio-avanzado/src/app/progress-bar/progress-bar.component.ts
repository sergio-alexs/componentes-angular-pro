import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar', // Define el selector para usar este componente como <app-progress-bar> en HTML.
  templateUrl: './progress-bar.component.html', // Ruta al archivo de plantilla HTML del componente.
  standalone: false, // Indica que el componente es parte de un módulo y no es independiente.
  styleUrls: ['./progress-bar.component.css'] // Ruta al archivo de estilos CSS del componente.
})
export class ProgressBarComponent {

  @Input() // Decorador que permite que el valor de 'progress' sea proporcionado por un componente padre.
  progress: number = 0; // Propiedad de entrada que representa el progreso, expresado como un número.

  constructor() { }
}
