Since our Apollo server is set up (in index.js) to run on port 4000, visit localhost:4000
and you'll see a landing page that will take you to the Apollo Studio "playground". Or you can hit your Apollo server directly via curl with a GraphQL client request such as this:

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query { __typename }"}'

Apollo docs are here: https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/

To get the full functionality of this project, you'll need to run the mock REST endpoint server. Do that by navigating in my Darter Pro to: 

~/code/learning/graphQL/speakers/bin

(which I downloaded as the speakers project in Resources relating to Chapter 4 of Jonathan Mills's Building a GraphQL API with Apollo Server Pluralsight course). To get the API executing, type this:

$ node www

The main project (i.e. the source code that I've written by following Jonathan's course) is, of course, in ~/code/learning/graphQL/graphQLApi/.

To run that project, easiest to invoke it from VS Code's Run/(Re)Start Debugging