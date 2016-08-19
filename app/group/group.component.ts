import { Component, OnInit } from "@angular/core";
import { GroupService } from "./group.service";
import { Group } from "./group";

@Component({
    templateUrl: "app/group/group.component.html"
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