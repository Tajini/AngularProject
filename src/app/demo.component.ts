import {Component} from "@angular/core";
import {Client} from "./client";

@Component({
  selector: "app-demo",
  template: `
    <h2 (click)="clickMessage()">Angular 4</h2>
    <p title="{{message}}">{{message}}</p>
    <p [title]="message">{{pers1.prenom}} {{pers1.nom}}</p>
    <input [(ngModel)]="pers1.nom" />
    <ul *ngIf="test">
      <li *ngFor="let val of tab1">{{val}}</li>
    </ul>
    
    <app-message (changement)="afficherChangement($event)"></app-message>
    <app-message message="un autre message"></app-message>
    <app-message [message]="pers1.nom"></app-message>
    
  `
})
export class DemoComponent {
  pers1: Client = new Client("Leblanc", "Marc");
  test = true;
  nb2 = 123.45;
  message  = "un message à afficher...";

  tab1: Array<number> = [5, 6, 4, 9, 3, 2, 1, 8, 7];
  tab2: number[] = [5, 6, 4, 9, 3, 2, 1, 8, 7];

  clickMessage() {
    let [a, b, c] = this.tab1;
    let {nom, prenom} = this.pers1;

    this.message += " + click !";
    this.test = !this.test;
  }

  afficherChangement(event) {
    console.log(event.target.message);
    console.log(event.texte);
  }


}
