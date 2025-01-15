import { AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root', // Define el selector para este componente. Se usará en el HTML como <app-root>.
  templateUrl: './app.component.html', // Archivo HTML asociado al componente.
  standalone: false, // Especifica si el componente es independiente. Aquí está configurado como parte de un módulo.
  styleUrl: './app.component.css' // Archivo CSS asociado al componente para estilos específicos.
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  title = '02-intermedio-avanzado'; // Título del componente, usado posiblemente en la plantilla.
  public isAddTimerVisible: boolean = false; // Controla la visibilidad del formulario para agregar temporizadores.
  public time: number = 10; // Tiempo por defecto para el nuevo temporizador.
  public timers: Array<number> = []; // Array que almacena los tiempos de los temporizadores.
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> | null = null; // Referencia al componente de alerta.

  @ViewChild("timerInput") timeInput!: ElementRef; // Referencia al input de tiempo en el DOM.
  @ViewChild("alert", { read: ViewContainerRef }) alertContainer!: ViewContainerRef; // Contenedor donde se insertará el componente de alerta dinámicamente.

  constructor(private renderer: Renderer2) {
    // Inicializa los temporizadores con algunos valores predefinidos.
    this.timers = [3, 20, 185];
  }

  ngAfterViewInit() {
    // Método del ciclo de vida que se ejecuta después de que la vista del componente ha sido completamente inicializada.
    console.log(this.timeInput); // Imprime la referencia al input en la consola.
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter seconds"); // Añade un placeholder al input.
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in'); // Añade una clase CSS al input.
  }

  ngAfterContentInit() {
    // Método del ciclo de vida que se ejecuta después de que el contenido proyectado dentro del componente ha sido inicializado.
    // Aquí está vacío, pero podría ser usado para inicializar contenido proyectado.
  }

  logCountdownEnd() {
    // Método para registrar en la consola cuando un temporizador termina.
    console.log("the countdown has finished");
  }

  public showAddTimer() {
    // Muestra el formulario para agregar un nuevo temporizador.
    this.isAddTimerVisible = true;
    setTimeout(() => {
      // Enfoca el input de tiempo después de un pequeño retraso.
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  public hideAddTimer() {
    // Oculta el formulario para agregar un nuevo temporizador.
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    // Crea y muestra un componente de alerta cuando termina un temporizador.
    this.simpleAlert = this.alertContainer.createComponent(SimpleAlertViewComponent); // Crea dinámicamente el componente de alerta.
    this.simpleAlert.instance.title = "timer ended"; // Establece el título de la alerta.
    this.simpleAlert.instance.message = "your countdown has finished"; // Establece el mensaje de la alerta.
    this.simpleAlert.instance.onDismiss.subscribe(() => {
      // Se suscribe al evento de cierre de la alerta.
      if (this.simpleAlert) {
        this.simpleAlert.destroy(); // Destruye el componente de alerta cuando se cierra.
      }
    });

    this.simpleAlert.instance.show(); // Muestra la alerta.
  }

  public submitAddTimer() {
    // Añade un nuevo temporizador al array y oculta el formulario.
    this.timers.push(this.time); // Añade el tiempo actual al array de temporizadores.
    this.hideAddTimer(); // Oculta el formulario.
  }
}
