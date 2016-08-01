import { ContactGroup } from "../contactGroup/contactGroup";

export class Contact {
    objectId: number;
    version: number;
    lastUpdatedDate: any;
    lastUpdatedUser: any;
    creationDate: any;
    createdUser: any;
    firstName: string;
    lastName: string;
    email: string;
    contactGroup: ContactGroup;
}