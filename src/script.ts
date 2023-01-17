import axios from 'axios';
import { Manager } from './utils/Manager.js';
import Sceduler from './utils/Sceduler.js';
import { TokenManager } from './utils/TokenManager.js';


console.log("Start finding")

const manager = new Manager();

console.log(`--------- Date: ${new Date()} ---------- `)
manager.tryToSubscribe()
setInterval(() => {
    console.log(`--------- Date: ${new Date()} ---------- `)
    manager.tryToSubscribe()
}, 1000 * 60)


