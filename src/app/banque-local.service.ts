import {Injectable} from "@angular/core";
import {Client} from "./client";
import {BanqueService} from "./banque.service";

@Injectable()
export class BanqueLocalService {

  private _clients: Client[] = [];

  constructor() {
      console.log("Création du service Banque en mode localStorage.");
      this.load();
  }

  private load(): void {
    this._clients = JSON.parse(localStorage.getItem("banque_ng")).clients;
  }

  private save(): void {
      localStorage.setItem("banque_ng", JSON.stringify({clients: this._clients}));
  }

  getClients(): Client[] {
    return this._clients;
  }

  getClient(id: number): Client {
      return this._clients.find(cli => cli.id === id);
  }

  addClient(client: Client): void {
    client.id = this._clients.reduce((cli1, cli2) =>  cli1.id > cli2.id ? cli1 : cli2).id + 1;
    this._clients.push(client);
    this.save();
  }

}
