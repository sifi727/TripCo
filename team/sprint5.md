# Sprint 5 - t07 - double07

## Goal

### Wrap It Up!
### Sprint Leader: Dmitry Melnikov

## Definition of Done

* Sprint Review and Retrospectives completed (sprint5.md).
* Version in pom.xml should be `<version>5.0.0</version>`.
* Increment deployed for demo and testing as server-5.0.jar on the production server.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* All tests pass.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests on all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

We are planning to finish the pending tasks from Sprint 4, and to fix issues that our team noticed during our review of Sprint 4. Additionally we plan to add about section to introduce our team members to the web app. The main focus after that will be to improve user experience of our web app.

![Sprint5 Component Layout Diagram](./sprint5/Sprint5Comp.jpg "Component Hierarchy View")

Above is a diagram of the client component hierarchy. In Sprint 5 we will be adding Filter and map options to state of our app, no additional components will be created and the hierarchy will be similar to Sprint 4.

![Sprint5 Component Hierarchy Diagram](./sprint5/Sprint5Layout.jpg "Component Layout")

Above is a picture of our component diagram in the client view. In Sprint 5 we will be upgrading user experience to utilize tabs instead of having all of the functionality visible on the page at once.

![Sprint5 Client Server Flow](./sprint5/sprint5PlanServerClientFlow.png "Client Server Flow")

The above diagram of the server client flow shows there will not be any added new REST calls in sprint 5. No new changes will be introduced to client - server flow this sprint.

Epics planned for this sprint.

* #264 User: I want to plan trips worldwide.
* #321 TripCo: Update the application to adhere to sprint 4 TFFI specs and demo results 
* #317 User: I want to view my trip in other tools. 
* #325 User: I want to know who to thank for this application 
* #338 User: Make the system easier to use. 

## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | 5 | 5|
| Tasks |  58  | 58 | 
| Story Points |  49 | 49| 

We have more epics planned for this Sprint as a result of few tasks rolling over from Sprint 4. We have less story points planned compared to previous Sprints to ensure that we will be able to finish our planned deliverables by the end of the Sprint.

We were able to complete all of the planned Epics, including all of the tasks and story points.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
|11/26/18| 0| #315, #323, #326, #337, #290| none|
|11/28/18| #337|  #315, #323, #326,  #290| none|
|11/30/18| #290, #326, #315, #323, #324| #336, #242, #335| none|
|11/2/18| #318, #330, #327, #328, #361, #329, #365, #332, #242| #358, #359, #370, #336, #227| none|
|11/5/18| #380, #379, #320, #336, #277, #331| #358, #359, #370| none|

*Add a new row for the scrum session after each lecture. *

## Review

We were able to successfully finish all of our Epics and tasks including all of the story points. 

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* #338 User: Make the system easier to use.: We've implemented a number of UI improvements to make the web app easier and more intuitive
* #317 User: I want to view my trip in other tools.: We have added a reactive map and the ability for user to save their trip in svg or kml map format  
* #321 TripCo: Update the application to adhere to sprint 4 TFFI specs and demo results : We have finalized our web app to match the updated TFFI specs
* #325 User: I want to know who to thank for this application: Added a section that showcases our team.
* #262 User: I want to plan trips worldwide.: Added the ability to search for destinations worldwide and filter search requests


#### Incomplete Epics in Sprint Backlog 

We don't have any uncompleted Epics.

#### What Went Well

The team showed clear understanding of overall goals of this projects. We were able to put the user first and design our web app around this concept.

* Good team communication throughout the entire sprint
* We were able to correctly plan out our sprint, divide the Epics into individual tasks and divide them between team members.
* We focused heavily on matching our web app with the updated TFFI and the results we received from 50% check. 
* The UI improvements were a large focus this sprint and we were very happy with the results 

#### Problems Encountered and Resolutions

We didn't have any major setbacks this sprint. Although we did have the following minor difficulties:

* leaflet wrap calculations
* kml conversion
* setting up the map save feature
* staying focused on finishing, two of us graduating made it hard! 

## Retrospective

Early planning stages were critical in understanding of tasks and layout of future development. The team members were effective in visualizing the goals and solution process of each epic. We really came out with something that looks great, and all members are satisified with the product.

#### What we changed this sprint

We were able to adapt to team members not being present during team meetings. This was our goal from last sprint and we were able to still include missing team members by setting up a conference call. This helped us is keeping everyone up to date with current developments.

#### What we did well

The team displayed good communication and cohesion. The team members continued to help each other with complicated tasks which greatly improved development times. 

#### What we need to work on

We were able to meet our goals this sprint. We could improve development time distribution so tasks are completed evenly throughout the sprint instead of mostly in the second half.

#### What we will change next sprint 

This is the final sprint and no additional development will be done. 
