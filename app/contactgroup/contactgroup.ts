import { Contact } from "../contact/contact";
import { Group } from "../group/group";

export class ContactGroup {
    contact: Contact;
    group: Group;
    active: boolean;
    unSubscribed: boolean;
    delete: boolean;
}