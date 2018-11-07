# Sprint 4 - t07 - double07

## Goal

### Interactive Maps and Shorter Trips!
### Sprint Leader: David Jump

## Definition of Done

* Sprint Review and Retrospectives completed (sprint4.md).
* Version in pom.xml should be `<version>4.0.0</version>`.
* Increment deployed for demo and testing as server-4.0.jar on the production server.
* Increment release `v4.0` created on GitHub with appropriate version number and name.
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
#### Continuous Integration / Delivery
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

On the forth sprint, we have pulled in several of the provided epics. The highest priority goal is to implement the database search functionality to complete an epic we planned but did not complete last sprint, and to optimize the nearest neighbor algorithm. After this is finished, the team will focus on making the itinerary and map more user friendly by allowing the user to choose what information is displayed. We then plan to give the user the ability to optimize their trip with both the nearest neighbor and 2-opt algorithms. Finally, the team plans to allow user to plan trips across the world.


![Sprint4 Component Layout Diagram](./sprint4/sprint4PlanComponentLayout.png "Component View Layout")

Above is a picture of our component diagram in the client view. In Sprint 4 we will be adding a Search component and Collapse/Menu component to be able to collapse other components in the view. The Search component is to allow a place for the user to search for new locations in the database to add to their trip. 

Additional changes to the component diagram are:
* Map - Only show the things the user has requested
* Add - Additional fields for **User Provided Attributes**
* Itinerary - Only populate rows for `name` | `id` | `all` | `user` | `requested` | `attributes` | ...
* Itinerary - Zero out the values in the table if/when units are changed
* Options - New button for `shorter` optimization  
* Options - New section for map type `static` or `interactive`
* Calculate - Zero out the values in the table if/when units are changed
* **Search** - New ***labels*** for: `Search`, `Filters`, `Name`, `Continent`, `Country`, and `Region` 
* **Search** - New ***field*** for the client to enter search phrases
* **Search** - New ***dropdowns*** for: `Name`, `Continent`, `Country`, and `Region` (populated from the MariaDB)
* Collapsable panels for all Cards

![Sprint4 Component Hierarchy Diagram](./sprint4/sprint4PlanComponentHierarchy.png "Component Hierachy Flow")

Above is a diagram of the client component hierarchy. With the exception of the Search component and associated vars in Application, the component heirarchy is the same as in sprint 3. The newly added component likely will not need a state and should just inherrit props as described in the diagram. 

![Sprint4 Server/Client Diagram](./sprint4/sprint4PlanServerClientFlow.png "Server to Client Flow")

The above diagram of the server client flow shows there will not be any added new REST calls in sprint 4. Because the web API now supports TFFI 4 standard the version number and the optimization level will need to be update in the /config GET response to the client. Finally, the server will need an option to filer, which will be added. 

Epics planned for this sprint.

* #189 User: I want to make and save changes to the trip.
* #271 User: I want to choose what information is displayed in the itinerary and map.
* #275 User: I'd like even shorter trips.
* #262 User: I want to plan trips worldwide.


## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | 4 | *total* |
| Tasks |  19   | *total* | 
| Story Points |  37  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 
| 10/22 | | #179, #279 | |
| 10/24 | #179 | #279 | Ailing teammates |
| 10/26 |#283 | #279 #288 #263 #272| |
| 10/29 | #263 #289 | #272 #279 #288 #295 #267 | |
| 10/31 | #288 #296 | #279 #272 #295 #267 #298 #276 | Java update broke Maven |
| 11/02 | #295 #279| #276 #272 #264 #298 #303 #278 #267 | Sickness |
| 11/05 |#273 #272 #303 #278 #279 #276 | #264 #267 #266 #242 #298 | |


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
