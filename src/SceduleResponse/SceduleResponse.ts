export interface SceduleResponse {
    models : {
        //Our bookings
        listing : {
            fullData: ListItem[]
        },

        // You Are in queue
        queue:  {
            fullData: ListItem[]
        }
    }

    week: Week
}

export interface ListItem {
    listingId: string,
    startTime: string,
    date: string,
    employee: string,
    groupName: string,
    teacherName: string,
    eventId: string
}

export interface Week {
    events: object
}