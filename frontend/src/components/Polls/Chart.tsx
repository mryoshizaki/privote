import axios from "../../axios";
import React, { useEffect, useState } from "react";

interface ChartProps {
  votes: any;
  enableVote?: boolean;
  userId?: number;
  userName?: string;
}

const Chart = (props: ChartProps) => {
  const votes = props.votes;
  const [status, setStatus] = useState<"not-started" | "running" | "finished">(
    "not-started"
  );
  const [votedCandidates, setVotedCandidates] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/polls/status")
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((error) => console.log({ error }));

    // Retrieve previously voted candidates from localStorage
    const storedCandidates = localStorage.getItem("votedCandidates");
    if (storedCandidates) {
      setVotedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const vote = (candidate: string) => {
    axios
      .post("/polls/vote", {
        id: props.userId?.toString(),
        name: props.userName,
        candidate,
      })
      .then(() => {
        // Show success popup message
        alert(`You voted for ${candidate}!`);
        // Update voted candidates in state
        setVotedCandidates([...votedCandidates, candidate]);
        // Store voted candidates in localStorage
        localStorage.setItem(
          "votedCandidates",
          JSON.stringify([...votedCandidates, candidate])
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getButtons = () => {
    const names = [];

    for (const name in votes) {
      // Check if the candidate has been voted by the user
      const isVoted = votedCandidates.includes(name);

      names.push(
        <button
          onClick={() => vote(name)}
          key={name}
          className={`button-wrapper text-normal ${isVoted ? "voted" : ""}`}
          disabled={isVoted} // Disable the button if already voted
        >
          {isVoted ? "Voted" : "Vote"}
        </button>
      );
    }

    return names;
  };

  const getNames = () => {
    const names = [];

    for (const name in votes) {
      names.push(
        <div key={name} className="name-wrapper text-normal">
          {name}
        </div>
      );
    }

    return names;
  };

  const getTotal = () => {
    let total = 0;

    for (const name in votes) {
      total += parseInt(votes[name]);
    }

    return total;
  };

  const getBars = () => {
    const bars = [];
    const total = getTotal();

    for (const name in votes) {
      const count = votes[name];
      bars.push(
        <div key={name} className="bar-wrapper">
          <div
            style={{
              height: count !== 0 ? `${(count * 100) / total}%` : "auto",
              border: "2px solid #4daaa7",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "white",
              backgroundColor: "rgb(77, 170, 167)",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            {votes[name]}
          </div>
        </div>
      );
    }

    return bars;
  };

  return (
    <div>
      {status === "finished" && (
        <div className="bars-container">{getBars()}</div>
      )}
      <div className="names-wrapper">{getNames()}</div>

      {props.enableVote ? (
        <div className="buttons-wrapper">{getButtons()}</div>
      ) : null}
    </div>
  );
};

export default Chart;
