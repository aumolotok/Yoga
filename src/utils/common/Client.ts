import { AxiosStatic } from "axios"

export default class ClientClass {
    protected client : AxiosStatic; 

    public static restoreFunction: () => void;

    constructor( client: AxiosStatic) {
        this.client = client;
    }

    hanleError(e:Error) {
        throw new Error(e.name)
    }
}