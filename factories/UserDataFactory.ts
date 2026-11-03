import {PaymentCard, User} from "../types";
import usersData from "../test-data/users.json";
import card from "../test-data/card.json"
import {randomInt} from "node:crypto";
import dotenv from 'dotenv';
import {VerifiedUser} from "../types/VerifiedUser";

dotenv.config();

export class UserDataFactory {
    private validUsers: User[] = usersData.validUsers;
    private invalidUsers: User[] = usersData.invalidUsers;
    private paymentCard: PaymentCard = card
    private availableIndexes: number[] = this.validUsers.map((_, index) => index);

    createValidUser(): User {
        if (this.availableIndexes.length === 0) {
            throw new Error("All users were used");
        }

        const randomIndex = randomInt(0, this.availableIndexes.length);
        const userIndex = this.availableIndexes.splice(randomIndex, 1)[0];
        return this.validUsers[userIndex];
    }

    createInvalidUser(): User {
        return this.invalidUsers[0]
    }

    createVerifiedUser(): VerifiedUser {
        const email = process.env.LOGIN;
        const password = process.env.PASSWORD;
        const county = process.env.COUNTY;
        const street = process.env.STREET;
        const name = process.env.NAME;

        if (!email || !password ! || !county || !street || !name) {
            throw new Error('User credentials are not defined in .env');
        }
        return {
            email,
            password,
            county,
            street,
            name
        };
    }

    createPaymentCard(): PaymentCard {
        return this.paymentCard
    }
}