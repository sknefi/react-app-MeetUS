const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const pathToDao = path.join(__dirname); // .../Dao

// HELPERS

// used in addGroupToEvent(...)
function update(event) {
  try {
    const readEventData = get(event.id);

    if (!readEventData) return null;

    const updatedEvent = { ...readEventData, ...event };

    const pathToEvent = path.join(
      pathToDao,
      "storage",
      "events",
      `${event.id}.json`
    );
    const dataToFile = JSON.stringify(updatedEvent);
    fs.writeFileSync(pathToEvent, dataToFile, "utf-8");

    return updatedEvent;
  } catch (error) {
    throw { code: "failedToUpdateEvent", message: error.message };
  }
}

// used in Creating group in event
// used in group-dao.js as helper function
// function addGroupToEvent(eventID, groupID) {
//     try {
//         console.log('first')
//         const event = get(eventID)
//         if (!event) {
//             throw { code: 'eventNotFound', message: 'Event not found.' };
//         }

//         event.listOfGroups.push(groupID)

//         update(event)

//         return event
//     }
//     catch (error) {
//         throw { code: "failedToAddGroupToEvent", message: error.message }
//     }
// }

// MAIN FUNCTIONS

// used - Event website
function get(eventID) {
  try {
    //console.log('sme na gete v evente')
    const pathToEvent = path.join(
      pathToDao,
      "storage",
      "events",
      `${eventID}.json`
    );
    const fileData = fs.readFileSync(pathToEvent, "utf8");
    //console.log(fileData)

    // returns parsed data, (not in string)
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null; // file or directory doesnt exists
    throw { code: "failedToReadEvent", message: error.message }; // this is just our object we have created
  }
}

// used - Admin (event creator)
function create(event) {
  try {
    event.id = crypto.randomBytes(16).toString("hex");
    event.listOfGroups = [];

    const pathToNewEvent = path.join(
      pathToDao,
      "storage",
      "events",
      `${event.id}.json`
    );
    const dataInNewEvent = JSON.stringify(event);

    fs.writeFileSync(pathToNewEvent, dataInNewEvent, "utf-8");

    return event;
  } catch (error) {
    throw { code: "failedToCreateEvent", message: error.message };
  }
}

// used
function list() {
  try {
    const pathToEvents = path.join(pathToDao, "storage", "events");
    const allFiles = fs.readdirSync(pathToEvents);

    const allEvents = allFiles.map((eventName) => {
      const pathToEvent = path.join(pathToDao, "storage", "events", eventName);
      const eventData = fs.readFileSync(pathToEvent, "utf-8");

      return JSON.parse(eventData);
    });

    const currentEvents = [];
    const passedEvents = [];
    const now = new Date();
    allEvents.forEach((event) => {
      if (new Date(event.dateTime) > now) {
        currentEvents.push(event);
      } else {
        passedEvents.push(event);
      }
    });

    currentEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    passedEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    const sortedEvents = [...currentEvents, ...passedEvents];

    return sortedEvents;
  } catch (error) {
    throw { code: "failedToListEvent", message: error.message };
  }
}

// used - Event website
function getEventGroups(listGroupIDs) {
  const groupDao = require("./group-dao");

  // event.listOfGroups
  // vráti všetky skupiny, ktoré sú v evente

  const allGroups = groupDao.list();
  const filteredGroups = allGroups.filter((group) =>
    listGroupIDs.includes(group.id)
  );

  //console.log(filteredGroups)

  return filteredGroups;
}

// create({
//     name: 'Summer Festival',
//     date: '2024-08-20',
//     time: '18:00',
//     location: 'Central Park, New York',
//     expectedCountOfMembers: 500,
//     price: 15,
//     info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde odit harum ea in praesentium nulla labore voluptates doloremque ullam beatae placeat amet, quod, voluptatum, non necessitatibus ab aperiam voluptatibus iure!',
//     photo: '-'
// })
// create({
//     name: 'Music Concert',
//     date: '2024-09-10',
//     time: '20:00',
//     location: 'Madison Square Garden, New York',
//     expectedCountOfMembers: 1000,
//     price: 25,
//     info: 'Join us for a spectacular music concert featuring top artists from around the world. Experience the magic of live music in the heart of New York City!',
//     photo: 'concert.jpg'
// })

// create({
//     name: 'Art Exhibition',
//     date: '2024-07-25',
//     time: '12:00',
//     location: 'Metropolitan Museum of Art, New York',
//     expectedCountOfMembers: 300,
//     price: 10,
//     info: 'Explore a stunning collection of contemporary art at our exclusive exhibition. Immerse yourself in creativity and inspiration.',
//     photo: 'art_exhibition.jpg'
// }
// )

module.exports = {
  get,
  create,
  list,
  // addGroupToEvent,
  getEventGroups,
  update,
};
