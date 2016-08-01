import { Component } from "@angular/core";
import { MdSidenav } from '@angular2-material/sidenav';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdButton } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';
import {InputText, DataTable, Column, Button} from 'primeng/primeng';

@Component({
    selector: "my-sidebar",
    templateUrl: "app/sidebar.component.html",
    directives: [MdCheckbox, MdSidenav, MdButton, MdToolbar, InputText, DataTable, Column, Button]
})
export class SidebarComponent {

}