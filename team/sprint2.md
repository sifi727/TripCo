# Sprint 2 - *t07* - *Team double 07*

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: *Jerrel Siler*

## Definition of Done

* Sprint Review and Retrospectives completed (sprint2.md).
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
| Epics | *5* | *4* |
| Tasks |  *13*   | *20* | 
| Story Points |  *23*  | *39* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *09/14* | *#96, #107* | *#84, #99, #102, #112, #113, #116* | *none* |
| *09/17* | *#123, #100, #99* | *#84, #102, #112, #113, #116* | *Waiting on #97 to complete to add custom units to #102*  |
| *09/19* | *#84, #102, #112, #113, 116* | *#97, #98, #117, #127* | *Loss a teammate. Another teammate was sick*  |
| *09/21* | *#97, #127* | *#98, #117* | *none* |
| *09/24* | *none* | *#98, #117* | *need to finish the Client UI task in progress before we can pickup other tasks* |
| *09/26* | *#98, #117* | *#142, #143, #144* | *none* |

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

* 88 User: I want a map and itinerary for my trip: We have added server side code to handle this request, along with the client side magics necessary to get everything to show up for the user, once they have uploaded their trip. The map includes the path of the trip and the name supplied by the user. The distances for each leg are populated in the table, along with a running total and the names of each location along the way.

* 90 User: I want to supply my own units for the distances:  We added two input fields when the `user defined` button is active; a field to add the unit Name and a field to add the unitRadius.  We also added an upload file feature for the user to upload their own Trip TFFI object

* 91 TripCo: The solution must be responsive for mobile devices:  As a team, we made the decision to be mindful of this and continuously work on it as we made changes throughout the sprint. We did need to make a task that directly address this, to be sure things were good on deploy day, but as a direct result of our planning and execution, we were able to close this on the final day with no issue.

* 94 TripCo: All code shall be clean: By using the clean code output and adhering to the google standards outlined in the company handbook, this was again very easy to complete. Everything was done incrementally, during development, and it was essentially just a matter of moving this from in progress to done.

#### Incomplete epics in Sprint Backlog 

* 93 TripCo: All clients and servers must interoperate: While we are confident that everything should work with the other teams, we were not able to get with our assigned group partners and actually test this. We also had a task to add some configuration options related this epic that were not completed, and as such neither was the epic.

#### What went well

* Team meetings were focused and concise. We were able to address each other's concerns and come to conclusions fairly easily, and each member's input contributed to the end goal
* The server side implementation was very quick and pretty simple for us to do. Everyone had a good understanding of what was needed going in, and we were able to finish the epic very quickly
* Using clean code and the other plugins was really good. It helped us to see where we needed to add in some testing, as well as reduce some functions and clean things up a bit

#### Problems encountered and resolutions

* Loosing a member in the middle of the sprint was really difficult. It caused a ton of confusion and led to a lot of issues throughout the sprint
* The client side implementation was much harder than originally anticipated, and ended up being a major time sync. Having a more candid discussion about what we know and do not know, and asking more questions could help us with this.
* Communication was lacking in some meetings and is something we can improve on

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

In the previous sprint we wasted time looking for places to meet for this sprint we reserved rooms so we could more effectively work together. This allowed us to meet for easily and make sure to discuss problems were facing since out last stand up.

We were hoping to learn how to mock out code so the team would not accidentally be blocked from doing code they need to do. We did not mock out anything on this sprint because we able to stay in different areas of the code and work with each other when necessary

#### What we did well

Last sprint we wasted time trying to find a place to meet because we did not reserve a room. We worked to change this by reserving rooms to meet and this worked out, so we did not waste as much time. Also, we reserved rooms where we could display a computer screen, this helped the team to understand a communicate over what tasks we need to accomplish.

The team unexpectedly had the withdraw of a teammate after our week of sprint 2 planning. We told Dave as soon as possible so he could plan for missing member. The team was willing to continue to try and pursue what we had said we were going to accomplish. This was good because it showed we wanted to complete what we set out to complete. Our team also did well in trying to be flexible with change.

#### What we need to work on

We did not ask questions on things we needed to understand early in the sprint. This translated into delays when we went to implement the client view because we did not fully understand how ReactJS and JavaScript worked. An example of this is simple things like loading a file took the whole team an entire day to figure out. If we had asked questions sooner this could have been solved much quicker, and we could have allocated more time for the task(s) as needed. As a team, asking questions early on would have helped us to define the tasks better.

As a team, we also noticed that each
 member did not fully understand our discussions every time. This translated into members being blocked from doing work over the weekend at times, and other times having to re-discuss a topic from a previous meeting. Communication skills is something that needs continual improvement, so we will need to continue to work on it.

Near the end of the sprint we realized that certain tasks needed to get done that we did not account for. Because we did not create those tasks, we also underestimated the complexity of the epics and this contributed to us over committing on what we could deliver in the sprint. An example of this is, we had to make tasks in the last week to address that we needed to display the map and itinerary on the client view. In retrospect this should have been figured out and had a task during our planning stage. 

We also tried to accomplish multiple epics at once this limit how many epics we could complete. Instead of just focusing on the first epic, “I want a map and itinerary for my trip” we also tried to work on the second epic, “I want to supply my own units for the distances.” This was mistake because it split our focus and did not guarantee that we would at least complete one requested functionality for the customer.


#### What we will change next sprint 

We as team in the next sprint will focus on making sure during the planing phase that we ask questions early on and communicate with upper management when we have confusion. This will hopefully help to eliminate unforeseen problems, so we don’t over commit to the amount of epics we try to finish.

For the next sprint we will also work on focusing just on one epic at time and making sure the tasks to complete the epic are first on zen-hub. This will to help us to deliver the most important thing the customer has requested first and be more successful overall. 
