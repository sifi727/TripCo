# Sprint 3 - t07 - double07

## Goal

### Build shorter trips!
### Sprint Leader: Alex Laswell

## Definition of Done

* Sprint Review and Retrospectives completed (sprint3.md).
* Version in pom.xml should be `<version>3.0.0</version>`.
* Increment deployed for demo and testing as server-3.0.jar.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

For this third sprint, we have pulled in several of the provided epics. We have also decided to copy over the TripCo epics from last sprint, as we feel they are more coding style and guidelines or concepts that we would like to continue to practice. We are really excited to have a new member, and are all hoping that the addition of a fourth member will boost our productivity and allow us to do much more this sprint. We are planning on going back and re-working a few aspects of the client that were rushed at the end of last sprint, as well as changing some things that were suggested in the demo. Finally, there was one epic that we did not complete that we are swarming on to finish first thing this sprint. 

![Sprint3 Client](/team/sprint3/client.jpg "An rough image of the expected look of the client at end of the sprint")
This image was created during sprint planning. It was meant to be a rough image of how the client will look at the end of the sprint. 

![Sprint3 Epics](/team/sprint3/epics.jpg "A list of the initial epics we expect to complete")
This is just a list of the epics we agreed upon. We have actually added to this list now that we have an additional member. 

![Sprint3 Component Diagram](/team/sprint3/Sprint3PlanComponentLayout.jpg "Component View Layout")

Above is a picture of our component diagram in the client view. In Sprint 3 we will be adding a CalcDistance component and Collapse component to be able to collapse other components in the view. The CalcDistance component is to allow a place for the user to calculate the distance between two latitude and longitude points. The collapse component is being added so the user will have an easier time choosing if they want to calculate a distance or if they want to plan an itinerary and allow it to perform well on a mobile device.

![Sprint3 Component Diagram](/team/sprint3/Sprint3PlanComponentHierarchy.jpg "Component Hierachy Flow")

Above is a diagram of the client component hierarchy. It’s close to the hierarchy in sprint 2 except for the addition of Collapse and CalcDistance components. The props from the Application component will now need to be passed down through the Collapse to its children. CalcDistance will have state variables to monitor if user the has entered a latitude and longitude and the store the result retrieved from the POST to the /distance method in the server.

![Sprint3 Component Diagram](/team/sprint3/Sprint3PlanServerClientFlow.jpg "Server to Client Flow")

The above diagram of the server client flow shows there will not be any added new REST calls in sprint 3. Because the web API now supports TIFF 3 standard the version number and the optimization level will need to be update in the /config GET response to the client. 


Epics planned for this sprint.

* #165 TripCo: The solution must be responsive for mobile devices.
* #166 TripCo: All code shall be clean!
* #93 TripCo: All clients and servers must inter-operate!
* #169 User: I want to determine the distance between a pair of destinations
* #168 TripCo: All code must be tested.
* #188 User: I want to design a trip from scratch so I can stop using the other tool.
* #189 User: I want to make and save changes to the trip.
* #190 User: I want my trips to be shorter. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 8 | *value* |
| Tasks | 32 | *value* | 
| Story Points | 36 | *value* | 

When compared to last sprint, this plan is pretty high, but we are trying to also factor in our new member and make sure that we are all being utilized at all times. As we meet and things progress, we can and will modify this to better reflect what is taking place and keep us on track. 

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 
| 10/3 | #170, #171 | #194, #199, #203 | Upcoming midterm |
| 10/5 | #194, #199, #203, | #172 | Studying for midterm  |
| 10/8 | #172 | #101, #184, #183, #207 | none |
| 10/10 | | #101, #184, #183, #207 | none |
| 10/12 | #207, #215, #176, #219, #153, #187, #178, #101, #184, #173, #183, #203, #170 | #216, #179, #222 | none |
| 10/15 | #216, #222 | #179, #195, #196 | Midterm exams in other classes. David's computer is broken |
| 10/17 | #93, #110, #154, #157, #175, #185, #191, #192, #193, #195, #196, #201, #202, #225, #230, #233, #236, #239 | #179, #245, #247 | David's computer is still broken (waiting on parts) |

## Review

Overall the team performed really well. We were able schedule our tasks during scrums and successfully deliver quality solutions. The new team composition allowed us to take on more work than during previous sprint. We have completed all outstanding tasks from Sprint 2 and added a lot of new functionality as a part of Sprint 3. The webapp has the new ability to add and delete places, reorder and optimize a trip, set different starting location, create new blank trip, select a different server, and find the distance between two locations. Further, we did this all while maintaing Clean Code guidelines, code coverage, and a mobile responsive design. 

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

The team performed well together, there was good communication, task planning and work distribution throughout the sprint.

*	We were able to finish the webapp's planned functionality on time. We completed most of the planned Epics.
*	The team communicated well over Slack and during team meetings after class. We were very successful in creating tasks and adequately distributing workload among team members.
*	Team members were very helpful in sharing information and assisting each other.


#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

In this sprint, we took more time to plan out what tasks needed to be accomplished. To help us visualize what we needed to build we drew out diagrams to guide our thoughts. We as team worked on making sure we did not take on more than we could do in the sprint. This meant that we decided not to try and implement any of the search and 2-opt functionality until the next sprint because we knew getting at least 50% code coverage would be a challenge and code coverage was placed at a higher priority in the product backlog than the search, and 2-opt functionality.

#### What we did well
In this sprint we were able to split up the epics into better tasks. We still had to add tasks that we did not account for, but it seemed less than in previous sprints. These tasks were organized better based off of priority of the epics and allowed the team to move forward faster after our midterms. Communication has also improved.

Concepts and discussions have also been better by taking time to ask if everyone is understanding what is being discussed at the current time. This has allowed us to work better together and be more productive and avoid possible miscommunications. Even though this has improved we are still learning better ways to communicate.

#### What we need to work on

Things we can work on is learning to deploy more often to Black-Bottle. Not only will this help us to see what the status of the product is in production, but it will be a benefit to other teams. A possible way of going about this is to publish every 3 days whatever is in master to the server.

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
