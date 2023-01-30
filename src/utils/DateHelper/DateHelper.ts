export class DateHelper {


    // monday is start, but in javaScript week starts from Sunday
    static getStartOfWeek() {
        const now  = new Date();
        // 0,1,2,3,4,5,6
        // 0  is sunday
        let startOfWeek : Date = new Date();

        if(now.getDay() == 0) {
            startOfWeek.setDate(now.getDate() - 6)
        } else {
            startOfWeek.setDate(now.getDate() - (now.getDay() - 1))
        }

        return startOfWeek
    }

    // 1 will give next week
    static getStartDayOfFutureWeek(howManyWeekPlus: number = 1) {
        const result = this.getStartOfWeek()
        result.setDate(result.getDate() + 7 * howManyWeekPlus ) 
        return result;
    }

    static getYYYYMMDDWithDelimiter(date: Date, delimiter: string = "-") {
        return [date.getFullYear(), DateHelper.d(date.getMonth() + 1), DateHelper.d(date.getDate())].join(delimiter)
    }

    static getDDMMYYYYWithDelimiter(date: Date, delimiter: string = "-") {
        return [DateHelper.d(date.getDate()), DateHelper.d(date.getMonth() + 1), date.getFullYear()].join(delimiter)
    }

    static getDateStringForLogs() {
        var now = new Date();
        return `${this.getDDMMYYYYWithDelimiter(now)} ${DateHelper.d(DateHelper.h(now.getUTCHours() + 3))}:${DateHelper.d(now.getMinutes())}:${now.getSeconds()}`
    }

    static d(i: number) {
        if (i < 9) {
            return "0" + i.toString();
        }

        else return i;
    }

    static h(i: number) {
        return i % 24;
    }
}