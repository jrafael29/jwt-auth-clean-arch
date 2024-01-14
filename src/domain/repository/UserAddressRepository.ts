import { UserAddress, UserAddressInput } from "../entity/UserAddress";

export interface UserAddressRepository {

    create(data: UserAddressInput): UserAddress| undefined;

}