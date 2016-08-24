import { RouterConfig, provideRouter } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContactComponent } from "./contact/contact.component";

const routes: RouterConfig = [
    {
        path: "",
        redirectTo: "/dashboard"
    },
    {
        path: "dashboard",
        component: DashboardComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];