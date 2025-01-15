import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TimerService {
  // Referencia al temporizador para poder detenerlo o reiniciarlo.
  private countdownTimerRef: any = null;

  // Indica si el temporizador está pausado o en ejecución.
  public paused: boolean = true;

  // Valor inicial del temporizador.
  private init: number = 0;

  // Fuente de emisión para notificar cuando el temporizador ha terminado.
  private countdownEndSource = new Subject<void>();

  // Fuente de emisión para el valor actual del temporizador.
  private countdownSource = new BehaviorSubject<number>(0);

  // Observable para que los componentes puedan suscribirse y escuchar cuando el temporizador termina.
  public countdownEnd$ = this.countdownEndSource.asObservable();

  // Observable para que los componentes puedan suscribirse y obtener el valor actual del temporizador.
  public countdown$ = this.countdownSource.asObservable();

  constructor() { }

  // Limpia el temporizador para evitar fugas de memoria.
  destroy(): void {
    this.clearTimeout();
  }

  // Reinicia el temporizador con un valor inicial opcional.
  restartCountdown(init?: number) {
    if (init) {
      this.init = init; // Establece el valor inicial si se proporciona.
    }

    if (this.init && this.init > 0) {
      this.paused = true; // Pausa el temporizador.
      this.clearTimeout(); // Limpia cualquier temporizador existente.
      this.countdownSource.next(this.init); // Emite el valor inicial.
    }
  }

  // Alterna entre pausar y reanudar el temporizador.
  toogleCountdown() {
    this.paused = !this.paused; // Cambia el estado de pausa.

    if (!this.paused) {
      this.doCountdown(); // Inicia el conteo si no está pausado.
    } else {
      this.clearTimeout(); // Limpia el temporizador si se pausa.
    }
  }

  // Método privado para ejecutar el conteo regresivo.
  private doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      // Decrementa el valor del temporizador.
      this.countdownSource.next(this.countdownSource.getValue() - 1);
      this.processCountdown(); // Procesa el conteo para verificar si ha terminado.
    }, 1000); // Intervalo de 1 segundo.
  }

  // Procesa el valor actual del temporizador para determinar si ha llegado a 0.
  private processCountdown() {
    if (this.countdownSource.getValue() <= 0) {
      this.countdownEndSource.next(); // Notifica que el conteo ha terminado.
    } else {
      this.doCountdown(); // Continúa el conteo si no ha terminado.
    }
  }

  // Limpia el temporizador configurado.
  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef); // Limpia el temporizador.
      this.countdownTimerRef = null; // Resetea la referencia.
    }
  }
}
