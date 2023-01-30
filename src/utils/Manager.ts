import { TokenManager } from "./TokenManager";
import axios from "axios";
import Sceduler from "./Sceduler";
import { Training } from "../SceduleResponse/Training";
import { DateHelper } from "./DateHelper/DateHelper";

export class Manager {

    tokenManager: TokenManager = new TokenManager(axios)
    sceduler: Sceduler = new Sceduler(axios);


    constructor() {
        
        axios.interceptors.request.use(request => {
            console.log(` `)
            console.log(`Request to ${JSON.stringify(request.url)}}`)
            console.log(`---------------------${DateHelper.getDateStringForLogs()}------------------------`)
            console.log(` `)
            return request
        });

        axios.interceptors.response.use(responce => {
            console.log(` `)
            console.log(`Response status ${responce.status} ${responce.statusText} from  ${responce.config.url}`)
            return responce
        });        
    }

    async tryToSubscribe() {
       let targetWeeks = [ 
        // DateHelper.getStartOfWeek(),
        DateHelper.getStartDayOfFutureWeek(),
        DateHelper.getStartDayOfFutureWeek(2)
    ]

        targetWeeks.forEach(date => this.tryToSubcribeOnWeek(date))
    }

    async tryToSubcribeOnWeek(startWeekDate: Date) {

        const allTrainings = await(this.sceduler.getWeekTrainings(startWeekDate, await this.tokenManager.getContactId()));

        const allWantedTrainings = this.filterTrainings( allTrainings)

        const currentBookedTrainings = await this.sceduler.getBookedTrainings(await this.tokenManager.getToken(), await  this.tokenManager.getContactId())

        const currentQueuedTrainings = await this.sceduler.getQueuedTrainings(await this.tokenManager.getToken(), await  this.tokenManager.getContactId())

        await allWantedTrainings.forEach( async wanted => {

            if( currentBookedTrainings.map(b => b.eventId).includes(wanted.eventId) ) {
                return;
            }

            if( currentQueuedTrainings.map(b => b.eventId).includes(wanted.eventId) ) {
                return;
            }

            try {
                this.sceduler.addBooking(await this.tokenManager.getToken(), wanted.eventId, await this.tokenManager.getContactId())
            } 
            catch(e) {
                console.log(currentBookedTrainings)
            }


        })

    }

    private filterTrainings(allWeekTrainingg: Training[]) {
       return( allWeekTrainingg
            .filter(training => training.teacherName?.includes("Жихарь"))
            .filter(training => training.gptName?.includes("Баланс"))
            .filter(training => training.roomName?.includes("Пять Звезд"))
            .filter(
                training => training.weekDayName == 'Четверг' || 
                training.weekDayName == 'Понедельник'
                )
       )
    }
}