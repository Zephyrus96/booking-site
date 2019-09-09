const axios = require("axios");

const checkLocation = event => {
  const location = event._embedded ? event._embedded.venues[0] : event.place;

  //Get venue name.
  let venue = location.name;

  //Check if the event is in the US.
  let state;
  if (!location.state) {
    state = null;
  } else {
    state = location.state.stateCode;
  }

  //check if city and country are stated.
  let city, country;
  if (location.city.name) {
    city = location.city.name;
  } else {
    city = null;
  }

  if (location.country.name) {
    country = location.country.name;
  } else {
    country = null;
  }

  const accessibility = location.accessibleSeatingDetail
    ? location.accessibleSeatingDetail
    : null;

  return {
    state,
    city,
    country,
    venue,
    accessibility
  };
};

const checkSales = event => {
  //Get start and end sales date.
  const startSalesDate = event.sales.public.startDateTime;
  const endSalesDate = event.sales.public.endDateTime;

  //Get event date.
  const startEventDate = event.dates.start.dateTime;

  return {
    startSalesDate,
    endSalesDate,
    startEventDate
  };
};

const getSocialMedia = event => {
  let socialMedia, youtube, facebook, twitter, instagram;

  const attractions = event._embedded.attractions
    ? event._embedded.attractions[0]
    : null;

  if (attractions) {
    socialMedia = attractions.externalLinks ? attractions.externalLinks : null;
  }

  if (socialMedia) {
    youtube = socialMedia.youtube ? socialMedia.youtube[0].url : null;
    facebook = socialMedia.facebook ? socialMedia.facebook[0].url : null;
    twitter = socialMedia.twitter ? socialMedia.twitter[0].url : null;
    instagram = socialMedia.instagram ? socialMedia.instagram[0].url : null;
  }

  return {
    youtube,
    facebook,
    twitter,
    instagram
  };
};

const ticketInfo = event => {
  const minTicketPrice = event.priceRanges ? event.priceRanges[0].min : null;
  const maxTicketPrice = event.priceRanges ? event.priceRanges[0].max : null;

  const ticketLimit = event.ticketLimit ? event.ticketLimit.info : null;

  return {
    minTicketPrice,
    maxTicketPrice,
    ticketLimit
  };
};

const getLineup = event => {
  let lineups = [];
  const attractions = event._embedded ? event._embedded.attractions : null;
  if (attractions) {
    attractions.map(attraction => {
      const name = attraction.name;
      const image = attraction.images
        ? attraction.images.filter(
            img => img.width === 205 && img.height === 115
          )[0].url
        : null;

      image ? (lineups = [...lineups, { name, image }]) : (lineups = []);
    });
  }

  return lineups;
};

const getEventImage = event => {
  const smallImage = event.images
    ? event.images.filter(
        image => image.width === 100 && image.height === 56
      )[0].url
    : null;

  const largeImage = event.images
    ? event.images.filter(
        image => image.width === 205 && image.height === 115
      )[0].url
    : null;

  return {
    smallImage,
    largeImage
  };
};

module.exports = {
  events: async args => {
    let url =
      "https://app.ticketmaster.com/discovery/v2/events.json?size=15&page=" +
      args.page +
      "&apikey=" +
      process.env.API_KEY;

    if (args.eventID) {
      url += "&segmentId=" + args.eventID;
    }
    if (args.genreID) {
      url += "&genreId=" + args.genreID;
    }

    switch (args.sort) {
      case "Date":
        url += "&sort=date,desc";
        break;
      case "Name A-Z":
        url += "&sort=name,asc";
        break;
      case "Name Z-A":
        url += "&sort=name,desc";
        break;
      default:
        break;
    }
    const res = await axios.get(url);

    //No events.
    if (res.data.page.totalElements === 0) {
      return null;
    }
    const events = await res.data._embedded.events;

    return events.map(event => {
      const image = getEventImage(event);

      const location = checkLocation(event);

      return {
        _id: event.id,
        title: event.name,
        image,
        location
      };
    });
  },

  eventDetails: async args => {
    const res = await axios.get(
      "  https://app.ticketmaster.com/discovery/v2/events/" +
        args.eventID +
        ".json?apikey=" +
        process.env.API_KEY
    );

    const event = await res.data;

    //Get location of the event.
    const { accessibility, ...location } = checkLocation(event);

    //Get ticket info of the event.
    const price = ticketInfo(event);

    //Get all the necessary dates.
    const date = checkSales(event);

    //Get seatmap image.
    const seatmap = event.seatmap ? event.seatmap.staticUrl : null;

    //Get social media links.
    const socialMedia = getSocialMedia(event);

    const image = getEventImage(event);

    const lineups = getLineup(event);

    const pleaseNote = event.pleaseNote ? event.pleaseNote : null;

    const ticketLimit = event.ticketLimit ? event.ticketLimit.info : null;

    return {
      _id: event.id,
      title: event.name,
      price,
      location,
      image,
      seatmap,
      date,
      socialMedia,
      lineups,
      pleaseNote,
      ticketLimit,
      accessibility
    };
  }
};
