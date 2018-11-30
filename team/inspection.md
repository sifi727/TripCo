# Inspection - Team *T07* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | ShortestOptimization.java|
| Meeting | 11/30/18|
| Checklist | java checklist from slides|

### Roles

| Name | Preparation Time |
| ---- | ---- |
| David | 1.75 hr  |
|Dmitry| 1 hr|
| Jerrel | 0.75 hr |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| :--- | :--- | :--- | :--- | :--- |
| ShortOptimization:6 | Class name has short in it but the class has to do with optimization | low | David |  | 
| ShortOptimization:107 | reverseBetweeniIndecency has i in it| low | David | |
| ShortOptimization:12-14  | places could be null or size = 0 does not check | low | David | |
| ShortOptimization:18,135,107,76,68,135 | methods are public should the be private | low | David | |
| ShortOptimization:11,19 | methods have no access modifier | low | David||
| ShortOptimization:69 | distance could be overflowed if the route was longer than 2^31-1 | low | David | |
| ShortOptimization:49 | if statement will always be true | low | David | |
| ShortOptimization:19 | method name states it does nearestNeighbor but it also does 2-opt | low | David | |
| ShortOptimization:40 | comment out line of code | low | David | |
| ShortOptimization:123,68 | sumRoute and totalDistance supose to do the same this | low | David | |
| ShortOptimization:128 | totalDistance does not calculate the total distance missing +=  | high | David |#348 |
| ShortOptimization:57 | sumroute adds includes the return so this line is not needed | high | David | #348|
| ShortOptimization:119,123,135 | methods do not need distance[][] in parameters, its a class variable | low | Dmitry | |
| ShortOptimization:28,40,54 | unnecessary comments from previous attempts | low | Dmitry | |
| ShortOptimization:15,77,99 | Possibly an unnecessary empty line(s) that could be removed | low | Jerrel | |
