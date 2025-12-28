export class Event {
    public num_participants: number = 0;
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public date: Date,
        public location: string,
        public category: string,
        public maxCapacity: number
    ){}

    isFull(): boolean {
        return this.num_participants >= this.maxCapacity;
    }

    isPast(): boolean {
        return this.date < new Date();
    }
}