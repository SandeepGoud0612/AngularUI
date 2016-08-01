import { RouterConfig, provideRouter } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

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