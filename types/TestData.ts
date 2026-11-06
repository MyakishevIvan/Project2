import {UserData} from "./UserData";
import {RegistrationUser} from "./RegistrationUser";
import {PaymentCard} from "./PaymentCard";
import {ProductInfo} from "./ProductInfo";


export interface TestData {
    verifiedUser: UserData;
    invalidUser: RegistrationUser;
    validUser: RegistrationUser;
    paymentCard: PaymentCard;
    product: ProductInfo;
}