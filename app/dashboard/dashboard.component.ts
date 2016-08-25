import { Component } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { GroupComponent } from "../group/group.component";
import { TabView, TabPanel, Panel } from "primeng/primeng";

@Component({
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [TabView, TabPanel, Panel, ContactComponent, GroupComponent]
})
export class DashboardComponent {

    title: string = "Mass Mailing Application";

    handleTabChange(e: any) {
        var index = e.index;
        if (index === 0) {
           
        } else if (index === 1) {

        } else if (index === 2) {

        }
    }

}