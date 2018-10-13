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

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
