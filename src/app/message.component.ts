import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-message",
  template: `
    <h2 (click)="clickMessage($event)">Message</h2>
    <p>{{message}}</p>
  `
})
export class MessageComponent {

  @Input()
  public message = "un message à afficher...";

  @Output()
  public changement: EventEmitter<object> = new EventEmitter<object>();

  clickMessage() {
    this.message += " + click !";
    this.changement.emit({
      target: this,
      texte: this.message
    });
  }
}
