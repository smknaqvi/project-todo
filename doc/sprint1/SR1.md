# Participants

Syed Kazim Naqvi
Daniel Wang
Sendooran Sitsabesan
Tony Attalla
Roozbeh Yadollahi
Antony Tang
Siavash Yassemi

# Unfinished Stories / Tasks

None!

# Demo Feedback

The clients asked that we modify the landing page to be open court itself, and also rename open court to The Zone.
We decided to make a new user story called "The Zone Landing Page" which can be seen in our PB.md in docs/sprint2.

Specifically, our new user story is as followed:

## The Zone Landing Page

As a user I want to be able to access different aspects of the application (Trivia, Picks, Debate) easily from the landing page, The Zone, so that I can start using the application in the way I want as soon as I open the application.

### Relevant Users

All three of Charlie (Fanalyst), Jamie (Analyst), and Sam (The Expert Analyst) should have a homepage (the Zone) presented to them as they log in and use the webapp. From the zone, all three of the users should be able to navigate to other sections of the app.

### Acceptance Criteria

1. Given that the user has just logged in or signed up, then the user should be taken the The Zone homepage.
2. Given that the user is at The Zone, then the user should be able to navigate easily to the trivia page, picks and predictions page, and debate page from the navbar
3. Given that the user navigates back to the homepage, then the user should be presented with The Zone.

We also decided to remove the "Status" user story as it doesn't fit the client's platform. They want to stay away from being a social media.

This is the story we deleted:

## Status

As a user I want to be able to create posts so that I am able to communicate with my followers and express my opinion.

### Relevant Users

All three of Charlie (Fanalyst), Jamie (Analyst), and Sam (The Expert Analyst) want to be able to share what's on their mind and how they're currently feeling so that their friends and followers stay updated.

### Acceptance Criteria

1. Given that a user is on their profile page, when there is interaction on any of their post, users are notified and are able to see those posts on their profile (sorted by time) and see them in the notifications tab

### Estimation / Priority

Priority: 1 / 5

Estimate: 2 Days

Finally, we also modified all our open-court user stories to reflect the new name, The Zone.

# Practices We Should / Shouldn't Continue and New Practices

We can continue pair programming on larger user stories as it worked well to get many people up to speed quickly, but we also want to aim for autonomy by reserving pair programming to more complex tasks.

Our code review process was very streamlined and everyone had a chance to give feedback on pull requests. Our PR's require 2 approvals and this was the best balance between time to ship code and code quality.

When merging a PR, squashing commits allowed us to keep a linear commit history in master and allows us to quickly assess the current state of our project with concise commit messages.

Something we can improve on is that we should break down our stories down into smaller subtasks so that we can be more specific on who is working on what part of a user story. This allows us to be asynchronous in our collaboration which will improve our efficiency.

# Best / Worst Experience in Sprint 1

A great benefit of using Discord is that we can stay connected with the rest of the team and with the TA. Being able to ask questions in real-time to the TA allows us to unblock many issues in a timely manner.

Every PR was reviewed thoroughly which allowed us to keep our codebase clean and minimize code debt.

Our Saturday meetings allowed us to update eachother on issues/blockers and also allowed for small demos to keep everyone on the same page. It also allowed us to ask questions and discuss different ideas with the team.

The hardest part by far was the learning curve of the first sprint. It took many ideal days worth of time to have everyone learn how to set up their dev environments, launch the API, launch the front-end, and learn how to develop in both Express and React. On top of learning React and Express, the team had to learn about different libraries such as Redux, Axios, CORS, Mongoose, Immutablejs, etc.
