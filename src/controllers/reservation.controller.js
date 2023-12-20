const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reservationService } = require('../services');
const { tokenService } = require('../services');
const { google } = require('googleapis');
const config = require('../config/config');


// Create an OAuth2 client instance
const oauth2Client = new google.auth.OAuth2(
  config.calendar.clientId,
  config.calendar.clientSecret,
  config.calendar.redirectUrl
);

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

const calendar = google.calendar({
  version: 'v3',
  auth: config.calendar.apiKey
});

const createReservation = catchAsync(async (req, res) => {

  // const { date, startTime, endTime, consultantId, userId } = req.body;
  // const startDateTime = new Date(date);
  // const endDateTime = new Date(date);

  // const [startHour, startMinute] = startTime.split('.').map(Number);
  // const [endHour, endMinute] = endTime.split('.').map(Number);

  // startDateTime.setHours(startHour, startMinute, 0, 0);
  // endDateTime.setHours(endHour, endMinute, 0, 0);
  // const timezone = 'Asia/Jakarta';
  // const requestId = Math.random().toString(36).substring(7);

  // const event = {
  //   'summary': 'Konsultasi dengan ' + consultantId,
  //   'location': '800 Howard St., San Francisco, CA 94103',
  //   'description': 'A chance to hear more about Google\'s developer products.',
  //   'start': {
  //     'dateTime': startDateTime,
  //     'timeZone': timezone,
  //   },
  //   'end': {
  //     'dateTime': endDateTime,
  //     'timeZone': timezone,
  //   },
  //   'attendees': [
  //     {'email': 'gilangpramdya84@gmail.com'},
  //   ],
  //   'reminders': {
  //     'useDefault': false,
  //     'overrides': [
  //       {'method': 'email', 'minutes': 24 * 60},
  //       {'method': 'popup', 'minutes': 10},
  //     ],
  //   },
  //   'conferenceData': {
  //     'createRequest': {
  //       'requestId': requestId, // Use a random requestId
  //     },
  //   },
  // };
  try {
    // const { data: createdEvent } = await calendar.events.insert({
    //   calendarId: 'primary',
    //   auth: oauth2Client,
    //   resource: event,
    //   conferenceDataVersion: 1,
    // });
    const reservation = await reservationService.createReservation(req.body);

    res.send({
      msg: "Event created successfully",
      // createdEvent,
      reservation
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send({ error: "An error occurred while creating the event" });
  }
});

const updateReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.updateReservation(req.params.reservationId, req.body);
  res.send(reservation);
});

const getReservations = catchAsync(async (req, res) => {

  // get user logon
  let token = req.headers.authorization
  let userId = null;

  if (token) {
    token = token.replace('Bearer ', '');
    userId = await tokenService.getUserByToken(token);
  }

  console.log('userId', userId)
  let filter = pick(req.query, ["status"]);
  if (userId) {
    if (userId.role === 'consultant') {
      filter = { ...filter, consultantId: userId.id };
    } else {
      filter = { ...filter, userId: userId.id };
    }
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await reservationService.getReservations(filter, options);
  res.send(result);
});

const getReservationById = catchAsync(async (req, res) => {
  const reservation = await reservationService.getReservationById(
    req.params.reservationId
  );
  if (!reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reservation not found");
  }
  res.send(reservation);
});

const getGoogleCalendar = catchAsync(async (req, res) => {
 
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

const getGoogleCalendarCallback = catchAsync(async (req, res) => {
  const code = req.query.code;
  console.log('query', code)

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  res.send({
    msg: "you have successfully authenticated with google calendar"
  });
});

module.exports = {
  createReservation,
  updateReservation,
  getReservations,
  getReservationById,
  getGoogleCalendar,
  getGoogleCalendarCallback,

};
