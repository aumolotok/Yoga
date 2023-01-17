import { ListItem, SceduleResponse, Week } from "../SceduleResponse/SceduleResponse";
import { Training } from "../SceduleResponse/Training";
import ClientClass from "./common/Client";
import { DateHelper } from "./DateHelper/DateHelper";

export default class Sceduler extends ClientClass {
    
    async getScedule(token : string, contactId: string) {

        let scedule : SceduleResponse;

        await this.client.post('https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi/getScheduleData', 
        {
            _token: `${token}`,
            currentContactId: `${contactId}`,
            vk_url: "https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi?v=1670507518568&url=https%3A%2F%2Fyogamint.ru%2Fraspisanie&utms=",
            viewer_id: "",
            roomId: 0,
            week: "",
            onlyOffice: false,
            weekday: "",
            officeId: "1"
        })
        .then( res => {
            scedule = res.data as SceduleResponse
        })
        .catch( error => console.log(" Error via get Scedule" + error))
        
        return scedule;
    }

    async getWeekTrainings(startOfWeek: Date, contactId: string) {

        let allWeekTrainings : Training[] = [];

        await this.client.post(`https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi/week/${DateHelper.getDDMMYYYYWithDelimiter(startOfWeek)}`, {
            officeId: "1",
            currentContactId: `${contactId}`
        }).then(res => {

            let week = res.data as Week;

            for(const timeSlot in week.events) {
                for (const date in week.events[timeSlot]) {
                    for (const training in week.events[timeSlot][date]) {
                        allWeekTrainings.push(week.events[timeSlot][date][training])
                    }
                }
            }
        })

        return allWeekTrainings;
    }

    async getBookedTrainings(token: string, contactId: string) : Promise<ListItem[]>{
        let sceduleData = await this.getScedule(token, contactId);

        return sceduleData.models.listing.fullData
    }

    async getQueuedTrainings(token: string, contactId: string) : Promise<ListItem[]>{
        let sceduleData = await this.getScedule(token, contactId);

        return sceduleData.models.queue.fullData
    }

    async addBooking(token: string, eventId: string, contactId: string) {
        await this.client.post('https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi/addListing', {
            _token: `${token}`,
            vk_url: "https://intgr08423c3d798245c39d6744de37dd5ee1.listokcrm.ru/wapi?v=1670507518568&url=https%3A%2F%2Fyogamint.ru%2Fraspisanie&utms=",
            currentContactId: `${contactId}`,
            viewer_id: "",
            eventId: `${eventId}`
        }).then

        console.log(`event with id ${eventId} was booked`)
    }
}