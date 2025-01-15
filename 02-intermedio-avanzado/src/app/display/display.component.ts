import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display', // Define el selector para usar este componente como <app-display> en HTML.
  templateUrl: 'display.component.html', // Ruta al archivo de plantilla HTML del componente.
  standalone: false, // Indica que el componente no es independiente y forma parte de un módulo.
  styleUrls: ['./display.component.css'] // Ruta al archivo de estilos CSS del componente.
})
export class DisplayComponent implements OnChanges {

  @Input() // Decorador que permite recibir un valor desde el componente padre.
  time: number | null = null; // Propiedad de entrada que almacena el tiempo en segundos.

  public minutes: string = "00"; // Propiedad para almacenar los minutos como una cadena formateada.
  public seconds: string = "00"; // Propiedad para almacenar los segundos como una cadena formateada.

  constructor() { }

  // Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
  ngOnChanges(changes: any) {
    if (changes.time) { // Verifica si hay cambios en la propiedad 'time'.
      // Calcula los minutos y segundos a partir del valor de 'time'.
      const minutes = Math.trunc(changes.time.currentValue / 60); // Obtiene la parte entera de los minutos.
      const seconds = changes.time.currentValue - minutes * 60; // Calcula los segundos restantes.

      // Formatea los minutos y segundos para que siempre tengan dos dígitos.
      this.minutes = ("0" + minutes).substr(-2);
      this.seconds = ("0" + seconds).substr(-2);
    }
  }
}
