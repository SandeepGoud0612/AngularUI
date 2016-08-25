import { Injectable } from "@angular/core";
import { ContactService } from "../contact/contact.service";
import { GroupService } from "../group/group.service";
import { SelectItem } from 'primeng/primeng';
import { Contact } from "../contact/contact";
import { ContactSearchCriteria } from "../contact/contact_search_criteria";
import { GroupSearchCriteria } from "../group/group_search_criteria";
import { Group } from "../group/group";

@Injectable()
export class CommonService {

    groupItems: SelectItem[];
    groupNamesForSearch: SelectItem[];
    contacts: Contact[];
    contactSearchCriteria = new ContactSearchCriteria();
    groups: Group[];
    groupSearchCriteria = new GroupSearchCriteria();

    constructor(private contactService: ContactService, private groupService: GroupService) { }
   
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
            }
            );
    }

    getAllContactsBySearchCriteria() {
        this.contactService.getAllContactsByCriteria(this.contactSearchCriteria)
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
            }
            );
    }

    getAllGroups() {
        this.groupService.getAllGroups()
            .subscribe(
            groups => {
                this.groupItems = [];
                this.groupNamesForSearch = [];
                for (let group of groups) {
                    this.groupItems.push({ label: group.name, value: group });
                    this.groupNamesForSearch.push({ label: group.name, value: group.name });
                }
            }
            );
    }

    searchGroupsByCriteria() {
        this.groupService.getAllGroupsBySearchCriteria(this.groupSearchCriteria)
            .subscribe(
            groups => this.groups = groups
            );
    }

}