import {Injectable} from "@angular/core";
import {Client} from "./client";
import {BanqueService} from "./banque.service";

@Injectable()
export class BanqueLocalAsyncService implements BanqueService {

  private _clients: Client[] = [];

  constructor() {
      console.log("Création du service Banque en mode localStorage.");
      this.load();
  }

  private load(): void {
    this.clients = JSON.parse(localStorage.getItem("banque_ng")).clients;
  }

  private save(): void {
      localStorage.setItem("banque_ng", JSON.stringify({clients: this.clients}));
  }

  private get clients(): Client[] {
    return this._clients;
  }

  private set clients(value: Client[]) {
    this._clients = value;
  }

    async getClients(): Promise<Client[]> {
        return await this._clients;
    }

    async getClient(id: number): Promise<Client> {
        return await this._clients.find(cli => cli.id === id);
    }

    async addClient(client: Client): Promise<void> {
      client.id = Math.max(...this._clients.map(cli => cli.id)) + 1;
      this._clients.push(client);
      this.save();
    }


}
