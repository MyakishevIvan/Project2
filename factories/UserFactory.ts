import {User} from "../types";
import usersData from "../test-data/users.json";
import {randomInt} from "node:crypto";
import dotenv from 'dotenv';
import {VerifiedUser} from "../types/VerifiedUser";

dotenv.config();

export class UserFactory {
    private validUsers: User[] = usersData.validUsers;
    private invalidUsers: User[] = usersData.invalidUsers;
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

    getVerifiedUser(): VerifiedUser {
        const email = process.env.LOGIN;
        const password = process.env.PASSWORD;
        const county = process.env.COUNTY;
        const street = process.env.STREET;

        if (!email || !password ! || !county || !street) {
            throw new Error('User credentials are not defined in .env');
        }
        return {
            email,
            password,
            county,
            street,
        };
    }
}