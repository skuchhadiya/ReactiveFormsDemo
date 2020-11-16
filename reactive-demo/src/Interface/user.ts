export interface User {
    id: string;
    name: string;
    age: number;
    address: Address;
 }

export interface UserB {
    id: string;
    name: string;
    age: number;
    addresses: Address[];
 }
export interface Address {
    houseNo: number;
    street: string;
    postCode: string;
}
