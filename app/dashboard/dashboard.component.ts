import { Component } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { GroupComponent } from "../group/group.component";
import { DashboardContentComponent } from "../dashboard/dashboard_content.component";
import { TabView, TabPanel, Panel } from "primeng/primeng";

@Component({
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [TabView, TabPanel, Panel, ContactComponent, GroupComponent, DashboardContentComponent]
})
export class DashboardComponent {
    title: string = "Mass Mailing Application";
    sideMenuSeleted: string = "dashboard";

    sideMenuClick(index: number) {
        if (index == 1) {
            this.sideMenuSeleted = "dashboard";
        }
        else if (index == 2) {
            this.sideMenuSeleted = "contacts";
        } else if (index == 3) {
            this.sideMenuSeleted = "groups";
        }
    }

}