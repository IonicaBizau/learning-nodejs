// At the beginning of the file
const Daty = require("daty");
const gen = require("generate-google-calendar-url");

const ev = {
    date: new Date()
  , title: "hey"
  , description: "foo"
};

const ev_date = new Daty(ev.date);
const dateFormat = "YYYYMMDDTHHmmss";

ev_date.setHours(19);
const start_date = ev_date.utc().format(dateFormat) + "Z";
const end_date = ev_date.utc().add(2, "hours").format(dateFormat) + "Z";

const link = "http://www.google.com/calendar/event?"
    + "action=TEMPLATE"
    + "&text=" + ev.title
    + "&dates=" + start_date + '/' + end_date
    + "&details=" + ev.description;

console.log(link);
console.log(gen({
    start: new Date(ev_date),
    end: new Date(ev_date.clone().add(2, "hours")),
    title: 'Hey',
    location: 'Paris',
    details: 'http://event.description.example.com/11234'
}));
