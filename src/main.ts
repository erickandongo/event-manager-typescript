import {Event} from "./models/Event";
import { User } from "./models/User";
import { Registration } from "./models/Registration";


//Data Storage 
export const events: Event [] = [];
export const users: User [] = [];
export const registrations: Registration [] = [];

//helper functions 

//add event to the array events
export function addEvent(event: Event): void{
    events.push(event);
}

// add user to the array users 
export function addUser(user: User): void{
    const exits = users.some(u => u.email === user.email);
    if(!exits){
        users.push(user);
    }
}

export function registerUserToEvent(user: User, event: Event): string{
    if(event.isFull()){ 
        return "Event is full" ;
    }

    if(event.isPast()){
        return "Event date has passed";
    }

    //check if user is already registered for the event 
    const alreadyRegistered = registrations.some(r => r.user.email === user.email && r.event.id === event.id);
    if(alreadyRegistered){
        return "User is already registered for this event";
    }

    addUser(user);
    registrations.push(new Registration(event, user));
    event.num_participants++;
    return "Registration successful";
}

// Test event
const e1 = new Event(1, "TS Workshop", "Learn TypeScript", new Date("2026-05-01"), "Room 101", "workshop", 2);

// Test users
const u1 = new User("Alice Smith", "alice@school.edu");
const u2 = new User("Bob Brown", "bob@school.edu");

// Add event
addEvent(e1);

// Register users
console.log(registerUserToEvent(u1, e1)); // Registration successful
console.log(registerUserToEvent(u2, e1)); // Registration successful
console.log(registerUserToEvent(u1, e1)); // User already registered
console.log(registerUserToEvent(new User("Charlie", "charlie@school.edu"), e1)); // Event is full

console.log(events, users, registrations);

