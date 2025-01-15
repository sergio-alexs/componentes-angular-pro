import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from "./tab.interface";  // Importa la interfaz Tab

@Component({
  selector: 'app-tab',  // Define el selector para usar este componente en la plantilla
  templateUrl: './tab.component.html',  // Archivo de la plantilla HTML
  standalone: false,  // Define si este componente está relacionado con módulos específicos o no
  styleUrls: ['./tab.component.css']  // Estilos CSS para este componente
})
export class TabComponent implements OnInit, Tab {  // Clase que implementa la interfaz Tab

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();  // Crea un EventEmitter que emitirá eventos cuando el tab sea clickeado
  @Input() title!: string;  // Recibe un valor `title` de un componente padre, el cual define el título del tab
  public isActive: boolean = false;  // Define si el tab está activo o no, por defecto es falso

  constructor() { }

  ngOnInit() {
    // Este método se ejecuta cuando el componente es inicializado
  }

  clickTabContent() {
    // Este método emite el evento onClick cuando se hace clic en el contenido del tab
    this.onClick.emit();  // Emite el evento a los componentes padres
  }
}
