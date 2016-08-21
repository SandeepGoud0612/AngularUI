import { Group } from "../group/group";
import { ContactGroup } from "../contactgroup/contactgroup";

export class Contact {
    id: number;
    version: number;
    lastUpdatedDate: any;
    lastUpdatedUser: any;
    creationDate: any;
    createdUser: any;
    firstName: string;
    lastName: string;
    email: string; 
    contactGroups: ContactGroup[];
}