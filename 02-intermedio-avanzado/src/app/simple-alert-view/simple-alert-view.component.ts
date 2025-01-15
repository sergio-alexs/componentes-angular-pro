import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-alert-view', // Define el selector para usar este componente como <app-simple-alert-view> en HTML.
  templateUrl: './simple-alert-view.component.html', // Ruta al archivo de plantilla HTML del componente.
  standalone: false, // Indica que el componente forma parte de un módulo y no es independiente.
  styleUrls: ['./simple-alert-view.component.css'] // Ruta al archivo de estilos CSS del componente.
})
export class SimpleAlertViewComponent implements OnInit {

  @Output() onDismiss: EventEmitter<void> = new EventEmitter<void>();
  // Evento que se emite cuando se cierra o descarta la alerta.

  @Input() message!: string; // Propiedad de entrada que recibe el mensaje de la alerta.

  @Input() title!: string; // Propiedad de entrada que recibe el título de la alerta.

  public visible: boolean = false; // Propiedad que controla la visibilidad de la alerta.

  constructor() { }

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta al inicializar el componente.
    // Útil para configurar lógica inicial si es necesario.
  }

  public dismiss() {
    // Método que oculta la alerta y emite el evento 'onDismiss'.
    this.visible = false;
    this.onDismiss.emit(); // Emite el evento para notificar al componente padre que la alerta ha sido descartada.
  }

  public show() {
    // Método que muestra la alerta.
    this.visible = true;
  }
}
