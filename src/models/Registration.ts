import { Event } from "./Event.js";
import { User } from "./User.js";

export class Registration {
    constructor(
    public event: Event,
    public user: User
){}
}