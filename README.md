# fantasy_team
APL Fantasy Team helper

## Tech overview
#### is JS will be enough or i do need python?
Project will be build in js for easy development and use of best infrastructure.
I'm not really bothered by js math or ML performance at this point.
Actually that is not a big deal in both scopes - performance of calculation and Math support.
JS already have pretty much of Math modules to support different calculations.
Tensorflow within NodeJS are just the same as python on CUDA.

#### what ML tools i can use?
Tensorflow and some statistic modules should be enough for start.

#### where i can get old data + update it every run?
FPL provide api to get that or this data of next events and old events.
There is files preexisted so i can put it into some kind of db if needed.

#### what is my plan to learn data?
I would like to start with simple questions. What teams potentially get more points, what players earn more.
What data i have and how can i use every bit of data.

#### Can I do it without ML?
At start point - yes, some statistic methods would be enough. But in future it will be good to find out how can i use this tool.

## Plan
- Main question - how to maximize overall team result?
- Game questions
  - what positions earn more considering others?
- Position specific
  - goalkeeper
    - How much goalkeepers earn each year considering other positions?
    - How much should i put on a goalkeeper
    - When should I change goalkeeper? should i change it?
    - Should i captain goalkeeper?
    - Who is the best fit at the moment? Who will be best fit on next week?
- Player specific
- Wave Algo:
  - if we could suggest that everything in play turns to waves (up and down)
  - isn't it put us to a problem finding maximum of all available waves?
- ?save players into memory once a day
- ?normalize data?
- ?use new technologies? GraphQL/typescript/no nodemodules?/serverless?/next?/now?/
- ?use proper architecture - microservice/domain driven

## Docs
- https://medium.com/@277roshan/machine-learning-to-predict-high-performing-players-in-fantasy-premier-league-3c0de546b251
- https://fantasy.premierleague.com/drf/bootstrap-static
- https://fantasy.premierleague.com/drf/element-summary/1
- https://www.kaggle.com/chaibapat/fantasy-premier-league
- https://peterellisjones.com/posts/fantasy-machine-learning/
- https://towardsdatascience.com/a-simple-method-to-predict-player-performance-using-fantasy-football-data-8b2d3adb3a1a
- https://towardsdatascience.com/fantasy-football-artificial-intelligence-cheat-sheet-ac172a23e2e1
- https://towardsdatascience.com/machine-learning-meets-fantasy-football-part-2-36632a27328c
- https://medium.com/@YourMumSaysWhat/how-to-get-data-from-the-fantasy-premier-league-api-4477d6a334c3
- http://www.fantasyfutopia.com/python-for-fantasy-football-apis-and-json-data/
