-- DROP DATABASE IF EXISTS AirFECCalendar;
-- CREATE DATABASE "AirFECCalendar";

-- \c AirFECCalendar;

CREATE TABLE bookings
(
  roomId serial NOT NULL,
  roomName character varying(50),
  price INT,
  cleaningFee INT,
  serviceFee INT,
  minimumStay INT,
  maxAdults INT,
  maxChildren INT,
  maxInfants INT,
  taxes INT,
  funFactTitles character varying(100),
  funFacts character varying(100),
  CONSTRAINT rooms_pkey PRIMARY KEY (roomId)
);

-- CREATE TABLE bookings (roomId serial NOT NULL, roomName character varying(50), price INT, cleaningFee INT, serviceFee INT, minimumStay INT, maxAdults INT, maxChildren INT, maxInfants INT, taxes INT, funFactTitles character varying(100), funFacts character varying(100), CONSTRAINT rooms_pkey PRIMARY KEY (roomId));

CREATE TABLE bookingDates
(
  id SERIAL NOT NULL,
  roomId INT REFERENCES bookings(roomId) ON DELETE CASCADE,
  bookingCheckIn TIMESTAMPTZ,
  bookingDuration INT,
  PRIMARY KEY (id)
);

-- CREATE INDEX CONCURRENTLY roomId_index ON pgBookingDates (roomId);

-- \COPY bookings FROM '/home/ec2-user/bookingData1.csv' csv; 
-- \COPY bookings FROM '/home/ec2-user/bookingData2.csv' csv;
-- \COPY bookings FROM '../Data/bookingData3.csv' csv;
-- \COPY bookings FROM '../Data/bookingData4.csv' csv;
-- \COPY bookings FROM '../Data/bookingData5.csv' csv;
-- \COPY bookings FROM '../Data/bookingData6.csv' csv;
-- \COPY bookings FROM '../Data/bookingData7.csv' csv;
-- \COPY bookings FROM '../Data/bookingData8.csv' csv;
-- \COPY bookings FROM '../Data/bookingData9.csv' csv;
-- \COPY bookings FROM '../Data/bookingData10.csv' csv;

-- \COPY bookingDates FROM '/home/ec2-user/bookingDatesData1.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData2.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData3.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData4.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData5.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData6.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData7.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData8.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData9.csv' csv;
-- \COPY bookingDates FROM '../Data/bookingDatesData10.csv' csv;
