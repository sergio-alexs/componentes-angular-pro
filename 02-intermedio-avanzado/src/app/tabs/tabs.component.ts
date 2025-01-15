import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { TabComponent } from "../tab/tab.component";  // Importa el componente TabComponent
import { Tab } from "../tab/tab.interface";  // Importa la interfaz Tab, que probablemente define las propiedades y métodos que cada tab debe implementar

@Component({
  selector: 'app-tabs',  // Define el selector para este componente, que es usado en el HTML
  templateUrl: './tabs.component.html',  // Archivo de plantilla HTML del componente
  standalone: false,  // Este componente no es autónomo, es decir, depende de otros módulos o componentes
  styleUrls: ['./tabs.component.css']  // Archivo CSS con los estilos del componente
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(TabComponent)  // Recupera todos los elementos <app-tab> dentro de este componente, gracias a ContentChildren
  public tabs!: QueryList<TabComponent>;  // Almacena las referencias de los tabs que se encuentren dentro de <app-tabs>

  private tabClickSubscriptions: any[] = [];  // Almacena las suscripciones a los clics de cada tab

  constructor() { }

  ngOnInit() {
    // Este método se llama cuando el componente es inicializado, pero en este caso no realiza ninguna acción.
  }

  ngOnDestroy() {
    // Este método se llama cuando el componente es destruido, y se usa para limpiar cualquier suscripción activa.
    if (this.tabClickSubscriptions) {
      // Desuscribe todas las suscripciones activas para evitar posibles pérdidas de memoria.
      this.tabClickSubscriptions.forEach(item => item.unsubscribe());
    }
  }

  ngAfterContentInit() {
    // Este método se ejecuta después de que el contenido hijo (tabs) haya sido completamente inicializado.
    console.log(this.tabs);  // Imprime el contenido de los tabs en la consola

    // Recorre todos los tabs y suscribe a su evento `onClick`
    this.tabs.forEach(tab => {
      let subscription = tab.onClick.subscribe(() => {
        console.log(`tab ${tab.title} content clicked`);  // Muestra un mensaje en consola cuando un tab es clickeado
      });

      this.tabClickSubscriptions.push(subscription);  // Almacena la suscripción para poder eliminarla en `ngOnDestroy`
    });

    // Selecciona el primer tab por defecto
    this.selectTab(this.tabs.first);
  }

  selectTab(tab: Tab) {
    // Desactiva todos los tabs
    this.tabs.forEach(tab => tab.isActive = false);
    // Activa el tab seleccionado
    tab.isActive = true;
  }
}
