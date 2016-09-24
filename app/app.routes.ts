import { RouterConfig, provideRouter } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContactComponent } from "./contact/contact.component";
import { GroupComponent } from "./group/group.component";
import { EmailServerComponent } from  "./emailserver/emailserver.component";

const routes: RouterConfig = [
    {
        path: "",
        redirectTo: "/dashboard"
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "contacts",
        component: ContactComponent
    },
    {
        path: "groups",
        component: GroupComponent
    },
    {
        path: "servers",
        component: EmailServerComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];