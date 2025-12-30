import {Event} from "./models/Event.js";
import { User } from "./models/User.js";
import { Registration } from "./models/Registration.js";


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


const eventForm = document.getElementById("eventForm") as HTMLFormElement;
const eventListDiv = document.getElementById("eventList") as HTMLDivElement;
const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement;

const eventDetailsSection = document.getElementById("eventDetails")as HTMLElement;
const detailsContent = document.getElementById("detailsContent") as HTMLDivElement;
const registrationForm = document.getElementById("registrationForm") as HTMLFormElement;
const registrationMessage = document.getElementById("registrationMessage") as HTMLParagraphElement;

function goToPage(pageId: string): void {
  const pages = document.querySelectorAll<HTMLElement>('.page');

  pages.forEach((page) => {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.add('active');
  }
}

document.querySelectorAll<HTMLButtonElement>('[data-page]')
  .forEach(button => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      if (page) goToPage(page);
    });
  });

 
let selectedEvent: Event | null = null;

function showEventDetails(event: Event){
    selectedEvent = event;
    eventDetailsSection.style.display = 'block';

    detailsContent.innerHTML = `
    <p><strong>Title:</strong> ${event.title}</p>
    <p><strong>Description:</strong> ${event.description}</p>
    <p><strong>Date:</strong> ${event.date.toDateString()}</p>
    <p><strong>Location:</strong> ${event.location}</p>
    <p><strong>Category:</strong> ${event.category}</p>
    <p><strong>Capacity:</strong> ${event.num_participants}/${event.maxCapacity}</p>
  `;

  const isDisabled = event.isFull() || event.isPast();
  (registrationForm.querySelector("button") as HTMLButtonElement).disabled = isDisabled;


}

//show all the events list 
function renderEvents(eventArray: Event[]) {
    eventListDiv.innerHTML = "";

    eventArray.forEach(event => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Date:</strong> ${event.date.toDateString()}</p>
        <p><strong>Capacity:</strong> ${event.num_participants}/${event.maxCapacity}</p>
        <button data-id="${event.id}" ">View Details</button>
        `;

        div.querySelector("button")!.addEventListener("click", () => showEventDetails(event));
        eventListDiv.appendChild(div);
    });
}

filterCategory.addEventListener('change', () => {
    const value = filterCategory.value;
    if(value === "all"){
        renderEvents(events);
    }
    else{
        renderEvents(events.filter(e => e.category === value));
    }
})




eventForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const date = new Date((document.getElementById("date") as HTMLInputElement).value);
    const location = (document.getElementById("location") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLSelectElement).value;
    const capacity = Number((document.getElementById("capacity") as HTMLInputElement).value);

    const newEvent = new Event(
        events.length + 1,
        title,
        description,
        date,
        location,
        category,
        capacity
    );
    addEvent(newEvent);

    console.log("EVENT CREATED:", newEvent);
    console.log("EVENTS ARRAY:", events);

    const filterValue = filterCategory.value;
    if(filterValue === "all"){
        renderEvents(events);
    } else {
        renderEvents(events.filter(e => e.category === filterValue));
    }
    eventForm.reset();

});

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!selectedEvent) return;

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;

    const user = new User(fullName, email);
    const result = registerUserToEvent(user, selectedEvent);

    registrationMessage.textContent = result;

    if (result === "Registration successful") {
        registrationMessage.className = "success";
    } 
    else {
        registrationMessage.className = "error";
    }

    renderEvents(events);
    showEventDetails(selectedEvent);
    registrationForm.reset();

});