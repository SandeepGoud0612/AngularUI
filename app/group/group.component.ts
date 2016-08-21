import { Component, OnInit } from "@angular/core";
import { DataTable, Column } from 'primeng/primeng';
import { GroupService } from "./group.service";
import { Group } from "./group";

@Component({
    selector: "my-group",
    templateUrl: "app/group/group.component.html",
    directives: [DataTable, Column]
})
export class GroupComponent implements OnInit {

    groups: Group[];
    errorMessage: string;

    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.getAllGroups();
    }

    getAllGroups() {
        this.groupService.getAllGroups()
            .subscribe(
            groups => this.groups = groups,
            error => this.errorMessage = <any>error
            );
    }

}