import { verifyJWTToken } from './libs/Auth';

export function verifyJWT_MW(req, res, next) {
  // (req.method === 'POST'); we could check method
  console.log(req.method);

  // if (req.method === 'POST') {
  //   // console.log(req.method);
  //   next();
  //   return;
  // }

  let token = req.headers['x-access-token'];
  // console.log(token);

  verifyJWTToken(token)
    .then((decodedToken) => {
      //req.user gets passed to the next route after *
      //req.user._doc._id;
      req.roommate = decodedToken.data;
      console.log(req.roommate);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ auth: false, token: null, message: 'Invalid auth token provided. Problem with middleware' });
    });
};
