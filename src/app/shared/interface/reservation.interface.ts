export interface Reservation {
    reservationStartDate: string;
    reservationEndDate: string;
    staysArray: Stay[];
}

export interface Stay {
    startDate: string;
    endDate: string;
    guests: Guest[];
}

export interface Guest {
    id: number;
    passport: string;
    firstname: string;
    lastname: string;
    anonymous: boolean;
}