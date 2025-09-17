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
- POST /reque/send/:status/:userId
<!-- - POST /request/send/ignored/:userId -->
<!-- - POST /request/send/interested/:userId -->

- POST /reque/review/:status/:userId
<!-- - POST /request/send/accepted/:requestId
- POST /request/send/rejected/:requestId -->

## userRouter
- GET /user/requests/received
- GET /user/connectons
- GET /user/feed - Gets you the profiles of other users on platform

status: ignored, interested, accepted, rejected