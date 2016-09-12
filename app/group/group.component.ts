import { Component, OnInit, ApplicationRef } from "@angular/core";
import { DataTable, Column, Growl, Message } from 'primeng/primeng';
import { GroupService } from "./group.service";
import { Group } from "./group";
import { CommonService } from "../shared/common.service";

@Component({
    selector: "my-group",
    templateUrl: "app/group/group.component.html",
    directives: [DataTable, Column, Growl]
})
export class GroupComponent {

    msgs: Message[] = [];
    groupNew: Group;
    groupSelected: Group;
    groupUpdate: Group;

    updateGroup: boolean;
    displayCreateDialog: boolean;
    displayViewDialog: boolean;
    active: boolean = true;

    constructor(private groupService: GroupService, private commonService: CommonService) { }

    onRowSelect(event: any) {
        this.displayViewDialog = true;
        this.groupSelected = event.data;
        this.updateGroup = false;
    }

    viewDialogCancelClick() {
        this.displayViewDialog = false;
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
                //this.commonService.searchGroupsByCriteria();
                this.commonService.resetGroupsBySearchCriteria();
                this.displayCreateDialog = false;
                this.commonService.getAllGroups();
                this.commonService.contacts = [];
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
                //this.commonService.searchGroupsByCriteria();
                this.commonService.resetGroupsBySearchCriteria();
                this.msgs.push({ severity: "info", summary: "Group deleted successfully.", detail: "" });
                this.displayViewDialog = false;
                this.commonService.contacts = [];
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Group deletion failed.", detail: error });
            });
    }

    updateGroupSubmit() {
        this.msgs = [];
        this.groupService.updateGroup(this.groupSelected)
            .subscribe(groupUpdated => {
                this.groupSelected = groupUpdated;
                //this.commonService.searchGroupsByCriteria();
                this.commonService.resetGroupsBySearchCriteria();
                this.displayViewDialog = true;
                this.updateGroup = false;
                this.commonService.contacts = [];
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