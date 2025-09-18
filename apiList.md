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

notes:
/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
/feed?page=4&limit=10 => 31-40 => .skip(30) & .limit(10)

skip = (page-1)*limt



 - params = "/feed:skip"(like this)
 - query = "/feed/:skip?"(like this)