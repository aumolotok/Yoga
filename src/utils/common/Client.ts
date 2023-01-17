import { AxiosStatic } from "axios"

export default class ClientClass {
    protected client : AxiosStatic; 

    constructor( client: AxiosStatic) {
        this.client = client;
    }


}