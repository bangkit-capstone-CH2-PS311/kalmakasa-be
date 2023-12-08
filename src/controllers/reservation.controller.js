const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reservationService } = require('../services');
const {google} = require('googleapis');
const config = require('../config/config');

const calendar = google.calendar({
  version: 'v3',
  auth: config.calendar.apiKey
});

const createReservation = catchAsync(async (req, res) => {
	const reservation = await reservationService.createReservation(req.body);
	res.status(httpStatus.CREATED).send(reservation);
});

const getReservations = catchAsync(async (req, res) => {
	const filter = pick(req.query, ["userId", "consultantId", "status"]);
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
  const oAuth2Client = new google.auth.OAuth2(
    config.calendar.clientId,
    config.calendar.clientSecret,
    config.calendar.redirectUrl
  );
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

const getGoogleCalendarCallback = catchAsync(async (req, res) => {
  const code = req.query.code;

  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);

  res.send({
    msg: "you have successfully authenticated with google calendar"
  })
})

const createEvent = catchAsync(async (req, res) => {

  const eventStartTime = new Date();
  eventStartTime.setDate(now.getDate() + 2);
  eventStartTime.setHours(now.getHours() + 2);

  const eventEndTime = new Date();
  eventEndTime.setDate(now.getDate() + 2);
  eventEndTime.setHours(now.getHours() + 3);

  const timezone = 'Asia/Jakarta';

  const event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': eventStartTime,
      'timeZone': timezone,
    },
    'end': {
      'dateTime': eventEndTime,
      'timeZone': timezone,
    },
    'attendees': [
      {'email': 'gilangpramdya84@gmail.com'},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  // insert event
  calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  res.send({
    msg: "you have successfully created an event"
  })
});


module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  getGoogleCalendar,
  getGoogleCalendarCallback,
  createEvent
};
