import axios from 'axios';
import { DateHelper } from './utils/DateHelper/DateHelper.js';
import { Manager } from './utils/Manager.js';
import Sceduler from './utils/Sceduler.js';
import { TokenManager } from './utils/TokenManager.js';


console.log("Start finding")

const manager = new Manager();

// Logger.writeToFile()

console.log(`--------- Date: ${DateHelper.getDateStringForLogs()} ---------- `)
manager.tryToSubscribe()
setInterval(() => {
    console.log(`--------- Date: ${DateHelper.getDateStringForLogs()} ---------- `)
    manager.tryToSubscribe()
}, 1000 * 60)


