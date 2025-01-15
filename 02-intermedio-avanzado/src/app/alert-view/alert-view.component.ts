import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-alert-view', // Selector para utilizar este componente como <app-alert-view> en la plantilla HTML.
  templateUrl: './alert-view.component.html', // Ruta al archivo de plantilla HTML del componente.
  standalone: false, // Indica que el componente es parte de un módulo y no es independiente.
  styleUrls: ['./alert-view.component.css'], // Ruta al archivo de estilos CSS del componente.
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos para que el CSS afecte elementos globalmente.
})
export class AlertViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta después de que el componente ha sido inicializado.
    // Este es un buen lugar para inicializar lógica específica del componente.
  }

}
