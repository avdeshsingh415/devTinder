# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /reque/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/accepted/:requestId
- POST /request/send/rejected/:requestId

## userRouter
- GET /user/connectons
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

status: ignore, interesteded, accepted, rejecyed