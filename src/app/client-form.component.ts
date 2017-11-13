import {Component, OnInit} from "@angular/core";
import {Client} from "./client";
import {BanqueLocalService} from "./banque-local.service";
import {Router} from "@angular/router";
import {BanqueService} from "./banque.service";
import {BanqueHttpService} from "./banque-http.service";
import {CapitalizePipe} from "./capitalize.pipe";
@Component({
    selector: "app-client-form",
    template: `
      <h2>Créer un nouveau client</h2>
      <form (ngSubmit)="onSubmit()" #clientForm="ngForm"
            action="ajouter-client.php"
      ><!-- #clientForm="ngForm"  #prenom="ngModel" -->
  
        <mat-form-field>
          <input matInput placeholder="Nom" name="nom" autofocus
                 [(ngModel)]="client.nom" #nom="ngModel" required
                 (input)="nomToUpperCase()" [ngClass]="{'test':nom.invalid && nom}" >
          <mat-error *ngIf="nom.invalid">Votre nom est obligatoire.</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Prénom" name="prenom" 
                 [(ngModel)]="client.prenom" #prenom="ngModel"
                 (input)="prenomToCapital()" >
          <!-- [formControl]="prenom" -->
        </mat-form-field>
        
        <button type="submit" mat-icon-button [disabled]="clientForm.invalid" ><mat-icon>done</mat-icon></button>
      </form>
      <h1>{{nom.valid}}</h1> 
      <pre>{{client|json}}</pre>
      
    `
})
export class ClientFormComponent implements OnInit {
  private data: BanqueService;
  private router: Router;
  private capital: CapitalizePipe;

  public client: Client = new Client("");
  // public client: object = {};


  constructor (banqueService: BanqueHttpService, _router: Router, _capitalPipe: CapitalizePipe) {
    this.data = banqueService;
    this.router = _router;
    this.capital = _capitalPipe;
  }
  nomToUpperCase() {
    this.client.nom = this.client.nom.toUpperCase();
  }

  prenomToCapital() {
    this.client.prenom = this.capital.transform(this.client.prenom);
  }



  onSubmit() {

    this.data.addClient(this.client)
     .then(() => this.router.navigate(["/"]));     // Retour à la liste des clients
    // this.router.navigate(["/"]);
    // this.client.nom = "";
    // this.client.prenom = "";
  }

  ngOnInit() {
    this.client = new Client("");
  }

}
