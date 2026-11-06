import {UserData} from "./UserData";
import {RegistrationUser} from "./RegistrationUser";
import {PaymentCard} from "./PaymentCard";
import {Product} from "./Product";


export interface TestData {
    verifiedUser: UserData;
    invalidUser: RegistrationUser;
    validUser: RegistrationUser;
    paymentCard: PaymentCard;
    product: Product;
}