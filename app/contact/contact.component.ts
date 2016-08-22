import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, SelectItem, MultiSelect} from 'primeng/primeng';
import { Message } from "../message";
import { ContactGroupService } from "../contactgroup/contactgroup.service";
import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";
import { GroupService } from "../group/group.service";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, MultiSelect]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    errorMessage: string;
    contactGroups: ContactGroup[];
    contactGroupSelected: ContactGroup;
    contactGroupOriginal: ContactGroup;
    contactSelected: Contact;
    contactNew: Contact;
    groupItems: SelectItem[];

    displayDialog: boolean;
    readonlyDialog: boolean;
    updateContact: boolean;
    createContact: boolean;


    constructor(private contactService: ContactService, private contactGroupService: ContactGroupService, private groupService: GroupService) { }

    ngOnInit() {
        this.getAllContactGroups();
    }

    getAllContactGroups() {
        this.contactGroupService.getAllContactGroups()
            .subscribe(
            contactGroups => {
                this.contactGroups = contactGroups;
            },
            error => this.errorMessage = <any>error
            );
    }

    onRowSelect(event) {
        this.displayDialog = true;
        this.readonlyDialog = true;
        this.updateContact = false;
        this.createContact = false;

        this.contactGroupOriginal = event.data;
        this.contactGroupSelected = this.cloneContactGroup(this.contactGroupOriginal);
        this.contactGroupSelected.contact = this.cloneContact(this.contactGroupOriginal.contact);
        this.contactGroupSelected.group = this.cloneGroup(this.contactGroupOriginal.group);
    }

    updateContactClick() {
        this.readonlyDialog = false;
        this.updateContact = true;
    }

    updateDialogCancelClick() {
        this.contactGroupSelected = this.contactGroupOriginal;
        this.readonlyDialog = true;
        this.updateContact = false;
    }

    updateContactSubmit() {
        this.msgs = [];
        this.contactGroupService.updateContactGroup(this.contactGroupSelected)
            .subscribe(() => {
                this.getAllContactGroups();
                this.displayDialog = false;
                this.readonlyDialog = true;
                this.updateContact = false;
                this.msgs.push({ severity: "info", summary: "Contact updated successfully.", detail: "" });
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact updation failed.", detail: "" })
            });
    }

    createContactClick() {
        this.contactNew = new Contact();
        this.displayDialog = true;
        this.readonlyDialog = false;
        this.createContact = true;
        this.getAllGroups();
    }

    getAllGroups() {
        this.groupService.getAllGroups()
            .subscribe(
            groups => {
                this.groupItems = [];
                for (let group of groups) {
                    this.groupItems.push({ label: group.name, value: group });
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    createContactSubmit() {
        this.msgs = [];       
        this.contactService.createContact(this.contactNew)
            .subscribe(() => {
                this.getAllContactGroups();
                this.displayDialog = false;
                this.readonlyDialog = true;
                this.createContact = false;
                this.msgs.push({ severity: "info", summary: "Contact created successfully.", detail: "" });
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact creation failed.", detail: "" })
            });
    }

    deleteSelectedContact() {
        this.msgs = [];
        this.contactGroupService.deleteContactGroup(this.contactGroupSelected)
            .subscribe(() => {
                this.getAllContactGroups();
                this.msgs.push({ severity: "info", summary: "Contact deleted successfully.", detail: "" });
                this.displayDialog = false;
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact deletion failed.", detail: "" })
            });
    }

    createDialogCancelClick() {
        this.displayDialog = false;
        this.readonlyDialog = true;
        this.createContact = false;
    }

    cloneContact(cont: Contact): Contact {
        let contact = new Contact();
        for (let prop in cont) {
            contact[prop] = cont[prop];
        }
        return contact;
    }

    cloneGroup(gro: Group): Group {
        let group = new Group();
        for (let prop in gro) {
            group[prop] = gro[prop];
        }
        return group;
    }

    cloneContactGroup(contGrou: ContactGroup): ContactGroup {
        let contactGroup = new ContactGroup();
        for (let prop in contGrou) {
            contactGroup[prop] = contGrou[prop];
        }
        return contactGroup;
    }

}