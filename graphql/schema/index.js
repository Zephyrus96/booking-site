const { buildSchema } = require("graphql");

//! means NOT NULL
//The input keyword is used to define a custom type.
module.exports = buildSchema(`
        type Booking {
          _id: ID!
          event: BookingEvent!
          user: User!
          createdAt: String!
          updatedAt: String!
        } 

        type Event {
          _id: String!
          title: String!
          image: Image!
          price: Ticket
          date: SalesDate!
          location: Location!
          seatmap: String
          socialMedia: SocialMedia
          lineups: [Lineup]
          pleaseNote: String
          ticketLimit: String
          accessibility: String
        }

        type BookingEvent{
          _id: String!
          title:String!
          location: String
          date: String
        }

        type User {
          _id: ID!
          firstName: String!
          lastName: String!
          email: String!
          password: String!
        }

        type AuthData {
          userID: ID
          token: String
          tokenExpiration: Int
          error: String
        }

        type Location {
          state: String
          city: String!
          country: String!
          venue: String
        }

        type Image {
          smallImage: String
          largeImage: String
        }

        type Ticket {
          minTicketPrice: Float
          maxTicketPrice: Float
          ticketLimit: Float
        }

        type SocialMedia{
          youtube: String
          facebook: String
          twitter: String
          instagram: String
        }

        type SalesDate {
          startSalesDate: String
          endSalesDate: String
          startEventDate: String
        }

        type Lineup {
          name: String
          image: String
        }

        type BookingCheck{
          isBooked: Boolean!
          error: String
        }

        input UserInput {
          firstName: String!
          lastName: String!
          email: String!
          password: String!
        }

        type RootQuery {
            events(eventID:String, genreID: String, sort:String, page: Int!): [Event]
            eventDetails(eventID: String!): Event!
            bookings: [Booking!]!
            searchBooking(id: String!): BookingCheck!
            loggedIn: String!
        }

        type RootMutation {
            login(email: String!, password: String!): AuthData!
            createUser(userInput: UserInput): User
            bookEvent(id: String!, title:String!, date: String!, location: String!): Booking!
            cancelBooking(eventID: String!): String!
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }    
    `);
