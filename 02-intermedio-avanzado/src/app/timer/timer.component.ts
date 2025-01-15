import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TimerService } from "./timer.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer', // Define el selector para usar este componente en la plantilla HTML como <app-timer>.
  templateUrl: './timer.component.html', // Ruta al archivo de plantilla HTML del componente.
  standalone: false, // Indica que el componente no es independiente y es parte de un módulo.
  styleUrls: ['./timer.component.css'], // Ruta al archivo de estilos CSS del componente.
  providers: [TimerService], // Proporciona el servicio TimerService específicamente para este componente.
  changeDetection: ChangeDetectionStrategy.OnPush // Usa la estrategia de detección de cambios OnPush para optimizar el rendimiento.
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>(); // Evento que emite cuando el temporizador llega a cero.
  @Input() init: number = 20; // Valor de entrada que especifica el tiempo inicial del temporizador.
  private countdownEndSubscription: Subscription | null = null; // Suscripción al evento de fin de conteo regresivo.
  private countdownSubscription: Subscription | null = null; // Suscripción al valor actual del conteo regresivo.
  public countdown: number = 0; // Almacena el valor actual del temporizador.

  // Calcula el progreso del conteo regresivo como un porcentaje.
  get progress() {
    console.log("getting progress"); // Muestra un mensaje en la consola para rastrear cuándo se llama.
    return (this.init - this.countdown) / this.init * 100; // Devuelve el porcentaje de tiempo restante.
  }

  constructor(public timer: TimerService, private cdRef: ChangeDetectorRef) {
    // Inyecta el TimerService y ChangeDetectorRef. TimerService gestiona la lógica del temporizador.
    // ChangeDetectorRef se utiliza para marcar manualmente el componente para la detección de cambios.
  }

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta cuando el componente se inicializa.

    this.timer.restartCountdown(this.init); // Reinicia el temporizador con el valor inicial proporcionado.

    // Se suscribe al observable countdownEnd$ para emitir el evento onComplete cuando el temporizador termina.
    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(() => {
      this.onComplete.emit(); // Emite el evento de finalización.
    });

    // Se suscribe al observable countdown$ para actualizar el valor del temporizador y marcar cambios en la vista.
    this.countdownSubscription = this.timer.countdown$
      .subscribe((data: any) => {
        this.countdown = data; // Actualiza el valor actual del temporizador.
        this.cdRef.markForCheck(); // Marca el componente para verificar cambios, ya que usa OnPush.
      });
  }

  ngOnDestroy() {
    // Método del ciclo de vida que se ejecuta cuando el componente se destruye.

    this.timer.destroy(); // Llama al método destroy del TimerService para limpiar el temporizador.
    if (this.countdownEndSubscription) {
      this.countdownEndSubscription.unsubscribe(); // Cancela la suscripción al evento de fin de conteo.
    }
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Cancela la suscripción al valor del conteo.
    }
  }
}
