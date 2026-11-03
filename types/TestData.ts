import {VerifiedUser} from "./VerifiedUser";
import {User} from "./User";
import {PaymentCard} from "./PaymentCard";
import {Product} from "./Product";


export interface TestData {
    verifiedUser: VerifiedUser;
    invalidUser: User;
    validUser: User;
    paymentCard: PaymentCard;
    product: Product;
}