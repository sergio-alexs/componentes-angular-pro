import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  standalone: false,
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  // Se ejecuta cuando el componente es inicializado
  ngOnInit(): void {
    this.startCountdown(); // Inicia el temporizador
  }

  // Se ejecuta cuando el componente es destruido
  ngOnDestroy(): void {
    this.clearTimeout(); // Limpia cualquier timeout pendiente
  }

  // Se ejecuta cuando algún input cambia
  ngOnChanges(changes: any): void {
    console.log("init value updated to: ", changes.init.currentValue);
    this.startCountdown(); // Reinicia el temporizador cuando cambia el valor inicial
  }

  // Evento que se emite cuando el contador disminuye
  @Output() onDecrease = new EventEmitter<number>();

  // Evento que se emite cuando el contador llega a cero
  @Output() onComplete = new EventEmitter<void>();

  // Propiedad que define el valor inicial del contador
  @Input() init: number | null = null;

  // Propiedad que guarda el valor actual del contador
  public counter: number = 0;

  // Referencia para almacenar el identificador del temporizador
  private countdownTimerRef: any = null;

  constructor() { }

  // Función para iniciar la cuenta atrás
  startCountdown() {
    if (this.init && this.init > 0) { // Si hay un valor inicial válido
      this.clearTimeout(); // Elimina cualquier temporizador pendiente
      this.counter = this.init; // Establece el contador al valor inicial
      this.doCountdown(); // Llama al método para comenzar el conteo
    }
  }

  // Función que realiza el conteo hacia atrás cada segundo
  doCountdown() {
    this.countdownTimerRef = setTimeout(() => { // Establece un temporizador con un retardo de 1 segundo
      this.counter = this.counter - 1; // Disminuye el valor del contador
      this.processCountdown(); // Llama al método para procesar el conteo
    }, 1000);
  }

  // Limpia el temporizador pendiente
  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef); // Cancela el temporizador
      this.countdownTimerRef = null; // Restablece la referencia
    }
  }

  // Función que procesa la disminución del contador y emite eventos
  processCountdown() {
    this.onDecrease.emit(this.counter); // Emite el valor actual del contador
    console.log("count is ", this.counter);

    if (this.counter == 0) { // Si el contador llega a cero
      this.onComplete.emit(); // Emite el evento de finalización
      console.log("--counter end--");
    } else { // Si el contador aún no ha llegado a cero
      this.doCountdown(); // Llama a la función recursiva para seguir contando
    }
  }
}
