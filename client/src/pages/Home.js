import React from 'react';
import { useQuery } from "@apollo/client";// importing the useQuery Hook from Apollo Client. This will allow us to make requests to the GraphQL server
import { QUERY_THOUGHTS } from "../utils/queries";// query for retrieving all thought data to be displayed on homepage.
import ThoughtList from "../components/ThoughtList";



const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];// if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.
  console.log(thoughts);
  

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
