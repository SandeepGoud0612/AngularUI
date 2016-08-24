import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, SelectItem, MultiSelect, Panel} from 'primeng/primeng';
import { Message } from "../message";
import { ContactGroupService } from "../contactgroup/contactgroup.service";
import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";
import { GroupService } from "../group/group.service";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, MultiSelect, Panel]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    contacts: Contact[];
    contactSelected: Contact;
    contactNew: Contact;
    contactUpdate: Contact;
    groupItems: SelectItem[];
    moreGroupItems: SelectItem[];

    displayViewDialog: boolean;
    displayCreateDialog: boolean;
    updateContact: boolean;

    constructor(private contactService: ContactService, private groupService: GroupService) { }

    ngOnInit() {
        this.getAllContacts();
        this.getAllGroups();
    }

    getAllContacts() {
        this.contactService.getAllContacts()
            .subscribe(
            contacts => {
                this.contacts = contacts;
                for (let contact of this.contacts) {
                    for (let contactGroup of contact.contactGroups) {
                        if (contact.groupDetails === undefined) {
                            contact.groupDetails = contactGroup.group.name;
                        } else {
                            contact.groupDetails += ", " + contactGroup.group.name;
                        }
                    }
                }
            },

            error => {
                this.msgs.push({ severity: "error", summary: "", detail: error });
            }
            );
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
            error => this.msgs.push({ severity: "error", summary: "", detail: error })
            );
    }

    onRowSelect(event) {
        this.contactSelected = event.data;
        this.displayViewDialog = true;
        this.updateContact = false;
    }

    createContactClick() {
        this.contactNew = new Contact;
        this.displayCreateDialog = true;
    }

    createDialogCancelClick() {
        this.displayCreateDialog = false;
    }

    createContactSubmit() {
        this.msgs = [];
        let contactGroups: ContactGroup[] = [];
        if (this.contactNew.groups !== undefined) {
            for (let group of this.contactNew.groups) {
                let contactGroup = new ContactGroup();
                contactGroup.group = group;
                contactGroup.active = true;
                contactGroup.unSubscribed = false;
                contactGroups.push(contactGroup);
            }
            this.contactNew.contactGroups = contactGroups;
        }
        this.contactService.createContact(this.contactNew)
            .subscribe(() => {
                this.getAllContacts();
                this.displayCreateDialog = false;
                this.msgs.push({ severity: "info", summary: "Contact created successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact creation failed.", detail: error })
            });
    }

    updateContactClick() {
        this.updateContact = true;
        this.contactUpdate = this.contactSelected;
        this.contactSelected = this.cloneContact(this.contactUpdate);
        this.moreGroupItems = [];
        this.contactSelected.moreGroups = [];
        for (let contactGroup of this.contactSelected.contactGroups) {
            contactGroup = this.cloneContactGroup(contactGroup);
            contactGroup.group = this.cloneGroup(contactGroup.group);
        }
        for (let groupItem of this.groupItems) {
            let groupFound: boolean = false;
            for (let contactGroup of this.contactSelected.contactGroups) {
                if (contactGroup.group.name === groupItem.label) {
                    groupFound = true;
                }
            }
            if (!groupFound) {
                this.moreGroupItems.push(groupItem);
            }
        }
    }

    updateContactSubmit() {
        this.msgs = [];
        let deleteContactGroups: ContactGroup[] = [];
        for (let contactGroup of this.contactSelected.contactGroups) {
            if (!contactGroup.delete) {
                deleteContactGroups.push(contactGroup);
            }
        }
        this.contactSelected.contactGroups = deleteContactGroups;
        for (let group of this.contactSelected.moreGroups) {
            let contactGroup = new ContactGroup();
            contactGroup.group = group;
            contactGroup.active = true;
            contactGroup.unSubscribed = false;
            this.contactSelected.contactGroups.push(contactGroup);
        }
        this.contactService.updateContact(this.contactSelected)
            .subscribe(() => {
                this.getAllContacts();
                this.displayViewDialog = true;
                this.updateContact = false;
                this.msgs.push({ severity: "info", summary: "Contact updated successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact updation failed.", detail: error })
            });
    }

    dialogUpdateCancelClick() {
        this.updateContact = false;
        this.contactSelected = this.contactUpdate;
    }

    deleteSelectedContact() {
        this.msgs = [];
        this.contactService.deleteContact(this.contactSelected.id)
            .subscribe(() => {
                this.getAllContacts();
                this.msgs.push({ severity: "info", summary: "Contact deleted successfully.", detail: "" });
                this.displayViewDialog = false;
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact deletion failed.", detail: error });
            });
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