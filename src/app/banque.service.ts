import {Client} from "./client";
import "rxjs/add/operator/toPromise";

export interface BanqueService {

    getClients(): Promise<Client[]> ;
    getClient(id: number): Promise<Client> ;
    addClient(client: Client): Promise<void> ;

}
