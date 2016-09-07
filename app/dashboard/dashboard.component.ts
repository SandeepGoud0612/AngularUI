import { Component } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { GroupComponent } from "../group/group.component";
import { DashboardContentComponent } from "../dashboard/dashboard_content.component";
import { EmailComponent } from "../email/email.component";
import { TabView, TabPanel, Panel } from "primeng/primeng";

@Component({
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [TabView, TabPanel, Panel, ContactComponent, GroupComponent, DashboardContentComponent, EmailComponent]
})
export class DashboardComponent {
    title: string = "Mass Mailing Application";
    sideMenuSeleted: string = "dashboard";

    sideMenuClick(index: number) {
        if (index == 1) {
            this.sideMenuSeleted = "dashboard";
        } else if (index == 2) {
            this.sideMenuSeleted = "emails";
        }
        else if (index == 3) {
            this.sideMenuSeleted = "contacts";
        } else if (index == 4) {
            this.sideMenuSeleted = "groups";
        } else if (index == 5) {
            this.sideMenuSeleted = "reports";
        }
    }

}