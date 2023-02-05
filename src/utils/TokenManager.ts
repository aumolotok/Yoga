import { AxiosStatic } from "axios";
import authRsponse from './AuthResponce'
import ClientClass from "./common/Client";
import { credentials } from "../resourses/credentials"

class TokenManager extends ClientClass {

    private token : string = "";
    private contactId: string = "";
    private isTokenDenanding = false;

    constructor(client : AxiosStatic) {
        super(client)
    }

    async init() {
        this.refresh()
        if( this.isTokenDenanding == false){
            console.log("here")
            setInterval((() => {this.refresh()}).bind(this), 1000 * 60 * 15)
            this.refresh()
            .then(()=> this.isTokenDenanding = true)
        }
    }

    async refresh() {
        this.getTokenFromRest()
        .then(() => this.getContactIdFromRest())
        .catch(error => console.log("Error in getting token :("));
    }

    async getToken() {
        if (this.token === "") {
            await this.getTokenFromRest()
        }

        return this.token;
    }

    async getContactId() {
        if (this.contactId === "") {
            await this.getContactIdFromRest()
        }

        return this.contactId;
    }

    private async getTokenFromRest() {
        await this.client.post('https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi/credentials', 
        {
            client_id : credentials.client_id,
            client_secret:credentials.client_secret,
            grant_type:"client_credentials",
            scope:"userinfo cloud file node",
            response:"",
            vk_url:"https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi?v=1670506378124&url=https%3A%2F%2Fyogamint.ru%2Fraspisanie&utms=",
            viewer_id:""
        }).then( res => {
            this.token = (res.data as authRsponse).data.access_token
            console.log("New token is gotten")
        }).catch(error => this.hanleError(error))
    }

    private async getContactIdFromRest() {
    
        await this.client.post('https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi/getClientInfo', 
        {
            _token : (await this.getToken()),
            currentContactId:"0",
            vk_url:"https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi?v=1670605414207&url=https%3A%2F%2Fyogamint.ru%2Fraspisanie&utms=",
            viewer_id:"",
            roomId: "0",
            week: "",
            onlyOffice: false,
            weekday: "",            
        })
        .then( res => this.contactId = res.data["client"]["currentContactId"])
        .catch(error => this.hanleError(error))
    }
}

export { TokenManager }