import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '01-basico'; // Título de la aplicación

  counterProgress: number = 0; // Progreso de la barra de cuenta atrás (en porcentaje)
  totalCountdown: number = 15; // Tiempo total de la cuenta atrás en segundos

  constructor() { }

  // Método que se llama cuando el contador disminuye
  updateProgress($event: any) {
    // Calcula el progreso en porcentaje en función del tiempo restante
    this.counterProgress = (this.totalCountdown - $event) / this.totalCountdown * 100;
  }

  // Método que se llama cuando la cuenta atrás llega a cero
  countdownFinished() {
    console.log("countdown has finished"); // Muestra un mensaje en la consola cuando la cuenta atrás termina
  }
}
