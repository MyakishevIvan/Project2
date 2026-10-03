import {User} from "../types/User";
import usersData from "../test-data/users.json";
import {randomInt} from "node:crypto";

export class UserFactory {
    private validUsers: User[] = usersData.validUsers;
    private availableIndexes: number[] = this.validUsers.map((_, index) => index);

    create(): User {
        if (this.availableIndexes.length === 0) {
            throw new Error("All users were used");
        }

        const randomIndex = randomInt(0, this.availableIndexes.length - 1);
        const userIndex = this.availableIndexes.splice(randomIndex, 1)[0];

        return this.validUsers[userIndex];
    }
}