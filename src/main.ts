import {Event} from "./models/Event";
import { User } from "./models/User";
import { Registration } from "./models/Registration";

const testEvent = new Event(
  1,
  "Test Event",
  "This is a test event",
  new Date("2026-01-01"),
  "Main Hall",
  "conference",
  50
);

const testUser = new User("John Doe", "john@school.edu");

const testRegistration = new Registration(testEvent, testUser);

console.log(testEvent, testUser, testRegistration);