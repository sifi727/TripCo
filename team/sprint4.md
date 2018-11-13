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
| Epics | 4 | 3 |
| Tasks |  27   | 18 | 
| Story Points |  47  | 35 | 

*In comparison to the previous sprint, we did not plan as many story points as we were anticipating to having tasks that were more time consuming than the tasks in sprint 3.   Researching and Implementing the database as well as adding shorter trip with the 2-opt, for example, we expected that these tasks would take the most time to implement.*

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
| 11/07 |#298 | #264 #242 #265 #267 #266 | | 

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* **#189 User: I want to make and save changes to the trip.** - *There were several tasks that were needed to complete this epic.  Implantation of the search query, creating a new ‘Search.java’ and ‘Search.js’ classes, and populating the search results and adding them to the itinerary were some of the tasks.*
* **#271 User: I want to choose what information is displayed in the itinerary** - *we have added filter fields to the search that allows the user to pick what to display*
* **#275 User: I'd like even shorter trips.** - *Here we added the "shorter" button, improved our nearest neighbour algorithm, and implemented 2-opt. The algorithm could be optimized to produce even more improved trip in the future*

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* **#262 User: I want to plan trips worldwide.** - *We were able to update the svg to a worldwide map and added the ability to connect to new databases; however, we did not have enough time to implement the ability to choose which fields that would be displayed in the search results.*

#### What Went Well

The ways we split up the components allowed for separation of concerns when we developed. Comminication between teammates in person and over Slak continues to improve, we are able to effectively assist each other during planning and development.

* The search component was able to be developed and tested without affecting the other developers.
* Attributes was able to be added to itinerary with any problems.
* The team meeting with our Product Owner helped to clear the air on some minor issues, and gave us all a better understanding of our roles and expectations.*

#### Problems Encountered and Resolutions

The technical problem faced by the team was the Java update causing problems and the dependency needed with the newly implemented search functionality. 

* The Java update breaking Maven cause multiple days of down time as teammates worked to fix their machines, and they could not compile their code. Eventually meeting together on the weekend allowed teammates to discuss how they were able to fix their own machine and the problem was solved.
* With the search functionality it was found out that the query code was not working because of the lack of MySQL decencies installed on machine. This problem was mitigated by installing MySQL on the computers used for development.

## Retrospective

Understanding what was expected in the team’s performance at the beginning of the Sprint helped for members to complete tasks that they felt comfortable with and helped them to learn more. Early planning stages were critical in understanding of tasks and layout of future development. The team member were effective in visualizing the goals and solution process of each epic.

The team faced hindrances in communication due to absences and a failure to update each other when someone missed. This affected the ability of the team to coordinate when faced with problems. We will need to plan for this in the next sprint.

#### What we changed this sprint

Before this sprint we were committed to deploying to black-bottle more often and planned to deploy every 3 days. With each member deploying at least once.

#### What we did well

The team continues to help each other when hindrances were faced and our team coding experiences greatly imporved. Team members when present in meeting were helpful and continued to share their knowledge with their teammates. This continued to help the team to learn and complete task.
After discussing as a team what our team dynamics were, there was less pressure to perform and this allowed for more flexibility on choosing the way tasks were delegated. This gave team members the ability to complete tasks at their comfort level which allowed for better learning opportunities.

#### What we need to work on

In this sprint unexpected absences had a negative impact on the team’s performance. The team experienced a high number of absences in team meetings. This caused a slow down in communication across the team and impacted the overall performance of completing tasks.

Planning for absences and having more team members present during team meetings would help with overall communication and progress. When absences are unavoidable, for whatever reason, then updating the team members with meeting notes on Slack and/or teleconferencing them in would help mitigate the impact of teammates absence.
In this sprint we had the goal of deploying to black-bottle more often then before. While we did deploy our code, it was not as often as we like.

The team will need to discuss our "definition of done" and how we view task completeness. This was a discussion we had at the end of the sprint while reviewing finished epics. 

#### What we will change next sprint 
We missed our goal of deploying every three days to black-bottle. For the next sprint we are thinking of making it a day in the week, so it will be easier to remember and hopefully this will allow us to complete this goal next sprint.
We also need to work on a plan for what to do when a team member is not able to physically attend the meetings. This will be discussed in the planning phase so we can try to plan for any lost days of development and/or avoid them wherever possible. We also plan to figure out viable communication alternatives for when these situations arrise.

