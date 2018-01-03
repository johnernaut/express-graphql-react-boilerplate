# express-graphql-react-boilerplate

An example Express GraphQL server that uses JWT's for authentication.  Basic login / logout and signup functionality are provided.  MongoDB is used as the default (via Mongoose), but you can easily replace that with any DB you'd like.
More docs to come soon.

### Getting Started
* `git clone https://github.com/johnernaut/express-graphql-react-boilerplate.git && cd express-graphql-react-boilerplate`
* `yarn install`
* `cd frontend && yarn install`
* `yarn dev -- from root folder`

#### Requirements
A `.env` file is needed with a `MONGO_HOST` and `JWT_SECRET` variable set.  The boilerplate uses mongo to give an example of how to authenticate, but you can plug in any DB you'd like.


Layout and CSS taken from Stripe's [RocketRides](https://github.com/stripe/stripe-connect-rocketrides).
