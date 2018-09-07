# Sprint 1 - *t07* - *Team double 07*

## Goal

### Distance Calculator!
### Sprint Leader: *David Jump*

## Definition of Done

* Web application deployed on the production server (black-bottle.cs.colostate.edu).
* Version in server/pom.xml should be `<version>1.0</version>`.
* Replace `sprint#` with `sprint1`
* Sprint Review and Restrospectives completed (sprint1.md).
* Product Increment release `v1.0` created on GitHub.

## Policies

* All commits include a task/issue number.
* No commits to master
* All pull requests must have at least two reviewers aproving it before the new branch is merged into the master branch.

## Plan

Epics planned for this release.

* *RESTful Service for Distance*
* *Responsive Client for Distance Calculator*

Planning Decisions the team made.

* On Friday we as team copied the tasks which were setup in the tripco repository. We then, discussed each task and then rated how complex we thought each task would be using the Fibonacci number sequence. Then, each member on the team chose the task(s) they felt comfortable completing by the end the sprint.

* Since this is the first time the team has worked together on a sprint we also met on Saturday and reviewed how the current code worked to help insure everyone was still comfortable with the tasks they had chosen on Friday. We also tentatively set a meeting for Wednesday after class because we knew the different parts of the code would need to work together and it is faster to figure out problems when we are physically together.

* On Wednesday we worked together and made decisions to revert changes which happen in auto generated files and we polished up the code before merging it into master.

## Review

#### Completed epics in Sprint Backlog 
* RESTful Service for Distance
* Responsive Client for Distance Calculator

#### Incomplete epics in Sprint Backlog 
* Currently waiting on the next sprint to create new epics

#### What went well
* Everyone in the team contributed to different parts in the sprint.
* Everyone in the team provided useful correction to code before it was merged into the master branch.
* The TFFI object structure provided a powerful means of handling distance requests that was easy to work with and that greatly enhanced integration of tasks.


#### Problems encountered and resolutions
* Some of the original code purposed to be merged into the master branch did not compile. This was found and fixed before it was merged.
* Because of the lack of mock up during the planning phase some code was merged into the master branch that would not compile. This was fixed promptly when it was discovered.
* Some code was complex and was hard to read in the first purposed pull request. This was fixed by refactoring the code into a more readable format.
*  Some specifications for the Place type were modified during development. This modification required further changes to project files and data.

## Retrospective

#### What went well
The planning and delegating went well in the team. Each team member rated how complex each task was based off the Fibonacci sequence. We then discussed based off each member’s response what we as team felt was a correct complexity to assign to each task. This helped to facilitate ownership in the team. After this was accomplished then each team member chose the task they could accomplish in the sprint. Doing it this way allowed each member to fully participate in the decision-making process and help solidify ownership of each task. Delegating each task as a team also helped the team want to support each other and ultimately succeed. With this outlook, this also facilitated work times together outside of class.

Working together outside of class time also helped the team succeed. As a team we met after class for an hour or so to insure each team member was not having any major problems. We also used this time to explain different concepts and to teach each other how to use the tools we are now using in class. Working together helped insure there was no big set backs in the sprint and allowed team members to get and give help to other members. Working together also happened when using pull request on GitHub to insure correct and readable code was being merged into the master branch.

The team also has a policy that two other teammates must review their purposed code changes before it could be merged into the master branch. This policy helped the team to verify if the code was good. There were times when one reviewer would miss something, but the other reviewer would not. This gave the team as whole ownership over the entire code base. This also saved the team time because bugs and other issues in code were corrected in the early stages of the code development rather than rushing to fix these problems at the end of the sprint. A lot of things went well for this sprint but there were also places the team could improve as well.

#### Potential improvements
During the planning phase the team did not consider certain methods and classes were being created by different teammates. This caused an unexpected complexity because of the dependencies on methods currently being developed which caused other code being developed by other team members to not locally compile. To get a round these problems some members commented out their code so it would compile when they pushed their changes or would push broken code. Because broken code was being pushed there was an instance where the master branch was broken. The master was promptly fixed, but a new process needs to be implemented so the code can be tested and built locally while other members are building the supporting methods for that code. We as team also did not efficiently start some of our meetings.

When we had our meetings, we did not reserve a room to use. Instead, we as a team used one hour trying to get different equipment in different rooms to work so we could start working together. This use of time means more time had to be used then necessary on the sprint and it hindered teamwork because team members only have so much time in their schedules to meet. Currently the team is working on solutions to these problems.

#### What we will change next time
For the next sprint, the team is looking at mocking out new classes and public methods. The team can have the methods throw an exception or return some dummy value so members know it is being worked on. If in testing something is not implemented the team should promptly know because of the dummy variables and exceptions breaking the code. The team has concerns this could burden us to be making mocks and not actually working on the code which needs to be completed during the sprint. So, after the end of the next sprint, the team will review how this went and what changes need to occur to improve this process. Not having a place to work together on campus is also being addressed.

In future sprints the team will reserve rooms on campus. The team is looking at reserving rooms at Morgan Library and Bio Scott Engineering building. Once the team can establish more of a rhythm in meeting times this should become less of a hindrance to the team.
