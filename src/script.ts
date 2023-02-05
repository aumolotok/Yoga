
import { DateHelper } from './utils/DateHelper/DateHelper.js';
import { Manager } from './utils/Manager.js';

console.log("Start finding")

run()

async function run() {console.log(`--------- Date: ${DateHelper.getDateStringForLogs()} ---------- `)
        
        const manager = new Manager();
        await manager.init()
        .catch(er => console.log("error"))
        

        setInterval(async () => {
                 
                await manager.init()
                .then(manager => manager.tryToSubscribe())
                .catch(error => console.log("error :("));
                console.log(`--------- Date: ${DateHelper.getDateStringForLogs()} ---------- `)
            
        }, 1000 * 30)
}





