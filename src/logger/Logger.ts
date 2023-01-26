import * as fs from 'fs';

export class Logger {

    public writeToFile() {
        fs.writeFileSync('logfile.txt', "test")
    }

}

export interface InfoForFile<T> {
    succesTry: String[];
    last20Calls: T[];
}

export interface allCalls<T> {
    today : {
        date: Date,
        calls: T[]
    },
    tommorow : {
        date: Date,
        calls: T[]
    }
}