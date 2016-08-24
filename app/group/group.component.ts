import { Component, OnInit } from "@angular/core";
import { DataTable, Column, Growl, Message } from 'primeng/primeng';
import { GroupService } from "./group.service";
import { Group } from "./group";

@Component({
    selector: "my-group",
    templateUrl: "app/group/group.component.html",
    directives: [DataTable, Column, Growl]
})
export class GroupComponent implements OnInit {

    msgs: Message[] = [];
    groups: Group[];
    groupNew: Group;
    groupSelected: Group;
    groupUpdate: Group;

    updateGroup: boolean;
    displayCreateDialog: boolean;
    displayViewDialog: boolean;
    active: boolean = true;

    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.getAllGroups();
    }

    getAllGroups() {
        this.groupService.getAllGroups()
            .subscribe(
            groups => this.groups = groups,
            error => this.msgs.push({ severity: "error", summary: "", detail: error })
            );
    }

    onRowSelect(event: any) {
        this.displayViewDialog = true;
        this.groupSelected = event.data;
        this.updateGroup = false;
    }

    createGroupClick() {
        this.groupNew = new Group();
        this.displayCreateDialog = true;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    createDialogCancelClick() {
        this.displayCreateDialog = false;
    }

    createGroupSubmit() {
        this.msgs = [];
        this.groupService.createGroup(this.groupNew)
            .subscribe(() => {
                this.getAllGroups();
                this.displayCreateDialog = false;
                this.msgs.push({ severity: "info", summary: "Group created successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Group creation failed.", detail: error })
            });
    }

    updateGroupClick() {
        this.updateGroup = true;
        this.groupUpdate = this.groupSelected;
        this.groupSelected = this.cloneGroup(this.groupUpdate);
    }

    deleteSelectedGroup() {
        this.msgs = [];
        this.groupService.deleteGroup(this.groupSelected.id)
            .subscribe(() => {
                this.getAllGroups();
                this.msgs.push({ severity: "info", summary: "Group deleted successfully.", detail: "" });
                this.displayViewDialog = false;
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Group deletion failed.", detail: error });
            });
    }

    updateGroupSubmit() {
        this.msgs = [];
        this.groupService.updateGroup(this.groupSelected)
            .subscribe(() => {
                this.getAllGroups();
                this.displayViewDialog = true;
                this.updateGroup = false;
                this.msgs.push({ severity: "info", summary: "Group updated successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Group updation failed.", detail: error })
            });
    }

    dialogUpdateCancelClick() {
        this.updateGroup = false;
        this.groupSelected = this.groupUpdate;
    }

    cloneGroup(gro: Group): Group {
        let group = new Group();
        for (let prop in gro) {
            group[prop] = gro[prop];
        }
        return group;
    }

}