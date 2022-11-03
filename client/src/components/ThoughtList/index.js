import React from "react";
import { Link } from "react-router-dom";


const ThoughtList = ({ thoughts, title }) => {
  // ThoughtList component will receive two props: a title and the thoughts array---destructure the argument data to avoid using props.title and props.thoughts

  
  if (!thoughts.length) {//   conditionally render- checking to see if there's even any data in the thoughts array
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              thought on {thought.createdAt}
            </p>

            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{" "}
                  {thought.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
      {/* check to see the value of thought.reactionCount. displaying a message to contextualize what the call to action should be. If there are no reactions, the user will start the discussion by adding the first reaction*/}
    </div>
  );
};

export default ThoughtList;
