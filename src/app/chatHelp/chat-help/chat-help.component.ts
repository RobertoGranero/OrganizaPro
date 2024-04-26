import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';

@Component({
    selector: 'chat-help',
    standalone: true,
    imports: [CommonModule, AvatarModule, FormsModule],
    templateUrl: './chat-help.component.html',
    styleUrl: './chat-help.component.css',
})
export class ChatHelpComponent {
    showChatBot: boolean = false;
    opcionSeleccionada: string = '';
    resultadoOpcionSeleccionada: string = '';
    respuestas: {[key: string]: string}= {
        default: 'Elige una opcion',
        espacio: 'El espacio de trabajo es el centro de navegación de su equipo, donde puede encontrar y compartir cualquier tablero y colaborar fácilmente.',
        tablero: 'El tablero OrganizaPro mantiene las tareas organizadas y ayuda a que el trabajo avance. Podrás verlo todo de un vistazo, desde lo pendiente hasta lo completado.',
        lista: 'Las diferentes fases de una tarea. Empieza con algo sencillo como Pendiente, En curso o Listo, o crea un flujo de trabajo a medida de las necesidades de tu equipo. No hay posibilidad de equivocarse con OrganizaPro.',
        tarjeta: 'Las tarjetas representan las tareas y las ideas e incluyen toda la información necesaria para hacer el trabajo. A medida que avances, mueve las tarjetas de una lista a otra para mostrar su estado.',
        fecha: `Hoy es ${new Date().toLocaleDateString()}, la hora actual es ${new Date().toLocaleTimeString()}`
    };
    mostrarRespuesta: boolean = false;
    enviarOpcion() {
        this.mostrarRespuesta = true;
        this.resultadoOpcionSeleccionada = this.respuestas[this.opcionSeleccionada];
    }
}
