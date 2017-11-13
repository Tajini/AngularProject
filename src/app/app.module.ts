import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./clients.component";
import {MaterialModule} from "./material.module";
import {BanqueLocalService} from "./banque-local.service";
import {ClientFormComponent} from "./client-form.component";
import {RoutesModule} from "./routes.module";
import {DemoComponent} from "./demo.component";
import {ClientComponent} from "./client.component";
import {HttpModule} from "@angular/http";
import {BanqueHttpService} from "./banque-http.service";
import {CapitalizePipe} from "./capitalize.pipe";
import {MessageComponent} from "./message.component";

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientFormComponent,
    ClientsComponent,
    DemoComponent,
    MessageComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule, // material components
    RoutesModule
  ],
  providers: [
    BanqueLocalService,
    BanqueHttpService,
    CapitalizePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
