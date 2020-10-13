# Sprint Planning

## Particpants
Syed Kazim Naqvi
Daniel Wang
Sendooran Sitsabesan
Tony Attalla
Roozbeh Yadollahi
Antony Tang
Siavash Yassemi

## Meeting Topics / Prioritization
We prioritized the signup page, login page, ACS score infrastructure, navigation bar, and homepage user stories. The rationale behind these choices is because these user stories not only set up critical infrastructure our future user stories rely on, but these features are easy to demo and allows us to show a high level overview of the direction of our design so that the product owner can accept or reject features or suggest changes.


## Sprint Goal
We want to have most of our infrastructure (MongoDB, basic pages, and expressJS REST API) set up by the end of the sprint.
We will complete the following user stories and meet their respective criterion of satisfaction.

**TODO-10 Signup / Register Page**
 - As a user I want to be able to sign-up for SPORTCRED so that I can have an account on the platform.
1. Given that the user is on the signup page, when the user tries to signup with an email or display name already associated with an account, then the user should receive an error message.
2. Given that the user wants to signup, when the user navigates onto the signup page, then the user should be presented with the required fields of display name, email, and password and optional demographic fields.
3. Given that the user is signing up with valid information, when the user clicks signup, then the user’s account should be created and the user should be automatically logged in.

**TODO-11 Login Page**
 - As a user I want to be able to login to my account using my email and password so that I can use the platform.
1. Given user has entered the wrong password or email when entering their account should see if they enter the wrong password or email
2. Given user is on the login page when they want to enter their account then they should see a place to enter their email, password, and a login button.
3. Given a user in on the login page when they have forgotten their password then they should see a “forgot password button?”

**TODO-14 ACS Score Infrastructure**
- As a user I want to be assigned an ACS score so that I can know what type of fan I am
1. Given a user, when the user is new, then the user is assigned an ACS score of 100
2. Given a user, when the user’s score is about to exceed 1100, the user’s ACS score should stay at 1100
3. Given a user, when the user’s score is about to drop below 100, the user’s ACS score should stay at 100
4. Given a user's ACS score, when a new ACS score is calculated, the appropriate tier should assigned to that user

**TODO-17 Navigation Bar**
- As a user I want to be able to get to another section from any of the other sections of the application so that I am able to switch to different parts of the application quickly.
1. Given that a user is in any section in the application, when the user clicks on another section on the navigation bar, then the user should be taken to the other secton

**TODO-16 Homepage**
- As a user I want to be able to access different aspects of the application (Open court, Trivia, Picks, Debate) easily so that I can start using the application in the way I want as soon as I open the application.
1. Given that the user has just opened their application, when clicking a section then the user will arrive at the web page corresponding to that section

## Spikes
No spikes currently. We have estimated all our user stories for this sprint :)

## Team Capacity
As 7 team members, we are taking on a total of 5 user stories that have a total of 19 story points = 19 ideal days worth of work.
That's about 2.7 ideal days worth of work per person. Given that many of the team have 5 courses and many have not worked with React, Express, and/or Mongo, this seams like a very reasonable goal.

User stories are split up as follows:
TODO-10 Signup / Register Page - Daniel / Kazim (7)
TODO-11 Login Page - Daniel / Kazim / Roozbeh (4)
TODO-14 ACS Score Infrastructure - Kazim / Siavash / Tony (4)
TODO-17 Navigation Bar - Daniel (2)
TODO-16 Homepage - Antony / Sendooran (2)

Systems Design task split:
CRC Cards (Backend) - Daniel
CRC Cards (Frontend) - Kazim
Software Architecture Diagram - Daniel

Many tasks are going to be completed through some pair programming as a few members already have experience with MERN and this will allow us to get everyone up to speed by the end of sprint 1.