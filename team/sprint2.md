# Sprint 2 - *t07* - *Team double 07*

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: *Melvin Gramke*

## Definition of Done

* Sprint Review and Restrospectives completed (sprint2.md).
* Version in pom.xml should be `<version>2.0.0</version>`.
* Increment deployed for demo and testing.
* Increment release `v2.0` created on GitHub with appropriate version number and name.
* Code should follow clean code standards of the Google style guide for Java and JavaScript and be maintainable.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Mobile first! The solution should be designed/optimized for a mobile environment, but still work well in a desktop environment. Not the other way around.
#### Continuous Integration
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

*For sprint 2, we are planning to provide a solution that enhances user experience, that resolves ongoing issues regarding code maintainability and mobile responsiveness, and that promotes interoperability among various client-server ports in order to enhance testing and development. We are planning to implement five epic issues for sprint 2. Two of the epics are specifically designed to enhance user experience. These enhancements include the adoption of user-defined distance units for calculation of trip distances and the display of a map and an itinerary for an associated trip for the user. During this sprint, we are also planning to begin work towards the resolution of three ongoing issues. The first ongoing issue involves the consistent writing of maintainable code. This issue includes ensuring that all code follows clean code standards, and that all code adheres to the google style guide for Java and JavaScript. The second ongoing issue that we are planning for sprint 2 is that the solution needs to be optimized for mobile platforms. The final ongoing issue involves ensuring that there is interoperability among all clients and servers.*

* *88 User: I want a map and itinerary for my trip*: Display a map and an itinerary using data from a TFFI **trip** file that is supplied by the user.
* *90 User: I want supply my own units for the distances*: Allow user-defined units of distance.
* *91 TripCo: The solution must be responsive for mobile devices*: Optimize user interface for mobile environments.
* *93 TripCo: All clients and servers must interoperate!*: Client and server must adhere to TFFI specification. Clients must provide a configuration option for changing the RESTful services server:port number.
* *94 TripCo: All code shall be clean!*: Code must be maintainable and follow the google style guide for Java and JavaScript.

*We decided that the user experience enhancements were necessary for the current sprint planning because they are top priority issues. We also determined that the three ongoing issues are of significance and have relevance to all current and future work; therefore, it is imperative that these issues are treated initially during the current sprint. We believe that dealing with the issue involving client and server interoperability is necessary for the current sprint because of the enhanced testing and development capabilities that can be derived from this enhancement. We expect these capabilities to provide significant improvement to current and future development practices.*


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *0* |
| Tasks |  *13*   | *2* | 
| Story Points |  *23*  | *2* | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *09/14* | *#96, #107* | *#84, #99, #102, #112, #113, #116* | *none* |
| *09/17* | *#123, #100, #99* | *#84, #102, #112, #113, #116* | *Waiting on #97 to complete to add custom units to #102*  |

*Add a new row for each scrum session.*

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What went well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems encountered and resolutions

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

*Articulate at the end of the sprint.  Focus on one of things you need to work on.*
