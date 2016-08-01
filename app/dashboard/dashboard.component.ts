import { Component } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { TabView, TabPanel, Panel, Button } from "primeng/primeng";

@Component({
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [TabView, TabPanel, Panel, ContactComponent]
})
export class DashboardComponent {
    title: string = "Mass Mailing Application";  
}