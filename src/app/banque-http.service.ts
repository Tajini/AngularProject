import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {BanqueService} from "./banque.service";
import {Client} from "./client";

@Injectable()
export class BanqueHttpService implements BanqueService {

  private API_URL = "http://wildfly.westeurope.cloudapp.azure.com";

    private _clients: Client[];
    private http: Http;

    constructor(_http: Http) {
      this.http = _http;
      console.log("Création du service Http Banque.");
    }

  getClients(): Promise<Client[]> {
    return new Promise((resolve, reject) => {
      this.http.get("http://wildfly.westeurope.cloudapp.azure.com/clients")
        .subscribe(data => {
          console.log("données bien reçues.");
          console.dir(data);
          this._clients = data.json();
          resolve(data.json());
        })
      ;

    });
  }

  getClient(id: number): Promise<Client> {
        return new Promise<Client>((resolve, reject) => {
          this.http.get(`${this.API_URL}/clients/${id}`).subscribe(
            data => resolve(data.json())
          );
        });
    }

  async addClient(client: Client): Promise<void> {

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    await this.http.post(
      "http://wildfly.westeurope.cloudapp.azure.com/clients/0",
      `nom=${client.nom}&prenom=${client.prenom}`,
      {
        "headers": headers
      }
    ).toPromise();

  }


}
