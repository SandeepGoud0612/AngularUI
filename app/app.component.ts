import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HTTP_PROVIDERS } from '@angular/http';
import { ContactService } from "./contact/contact.service";
import { ContactGroupService } from "./contactgroup/contactgroup.service";
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ContactService, ContactGroupService]
})
export class AppComponent {
  title: string = "Mass Mailing Application";
}
