import {UserData} from "./UserData";

export interface RegistrationUser extends UserData {
    title: string
    date_of_birth: string
    first_name: string
    last_name: string
    company: string
    apartment: string
    state: string
    city: string
    zipcode: string
    mobile_number: string
}