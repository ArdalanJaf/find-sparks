# Find-Sparks Dating App

Dating app 

## Software

- Javascript
 - React
   - Redux
   - react-webcam
 - Axios
 - node.js
   - Express
   - nodemailer
  - joi 
- SQL
- Bootstrap
- SASS
- API (api.postcodes.io)

## Features

- Full onboarding, including validation and obtaining profile picture with react-webcam.
- Matching algorithm (made with pure JS) that first filters, then sorts, members for review (like/pass) by user.
- Online messenger for matched members to talk to eachother.
- SQL database to store all users data.
- Token-based middleware security.
- Uses nodemailer to automatically email new users (with structure to add multiple languages).
- Postcodes API (called through Axios) to determine distances between users.

## Method

1. User registers, providing their information, dating preferences and an image of themselves. Input is validated through joi before being submited.
2. User data is compiled into an object, which includes a randomly generated user_id. User_id is the main anchor for refering to users, respectively.
  - User data is stored in SQL, to be pulled when required.
3. User can then review other users in matching. Upon loading said page, an algorithm creates a copy of the entire users object - with incompatible users filtered out and sorted with most compatible users first.
  - Filter: filters out members who concretely do not match user's criteria (and vice-versa). 
    - E.g. member lives beyond user's stated minimum distance.
  - Sort: Applies points based on compatibility for flexible criteria, and organises list with most-compatible first.
    - E.g. If user is "unsure about kids", a member that "wants kids in the future" will get more points than one that "wants kids ASAP".
4. User has option to "like" or "pass" each member presented for review. In either case, member is added to user's "seen list" (inside their user-object) to ensure they won't be displayed again. If "liked", the member's user_id is added to the user's "like list" (also inside their user-object).
5.  If user likes a member that has liked them (or member later likes them), a "conversation" begins in the "messages" section allowing said users to talk to eachother. 
  - Upon loading "messages", all user_ids' in the user's "like list" are cross-examined to see the user's user_id is also in their "like list", respectively. If so, a conversation is created. 
 
