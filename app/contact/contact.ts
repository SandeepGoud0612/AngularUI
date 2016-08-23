import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";

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
    groupDetails: string;
    groups: Group[];
    moreGroups: Group[];
}