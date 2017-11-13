import {Compte} from "./compte";

export class Client {
  // private static num = 10;
  public id = 0; // ++Client.num;
  public nom: string;
  public prenom: string;
  public comptes: Compte[] = [];

  constructor(_nom: string, _prenom?: string) {
    this.prenom = _prenom;
    this.nom = _nom;
  }

  // public get nom(): string {
  //   return this._nom;
  // }
  // public set nom(value: string) {
  //   this._nom = value.toUpperCase();
  // }
}
