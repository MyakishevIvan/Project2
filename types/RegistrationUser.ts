import {UserData} from "./UserData";

export interface RegistrationUser extends UserData {
    title: string;
    date_of_birth: string
    firstname: string;
    lastname: string;
    company: string;
    address2: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
}