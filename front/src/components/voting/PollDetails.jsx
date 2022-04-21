import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../../store/actions";
import ErrorMessage from "../ErrorMessage";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PollDetails() {

  const polls = useSelector((state) => state.VOTACIONES);
  console.log("AQUI")
  console.log(polls)
  const { noteId } = useParams();
  let pollById = polls.find((p) => p._id == noteId);
  const poll = useSelector((state) => state.VOTACIONES.filter(p => p._id == noteId));
  console.log("poll unica: ")
  console.log(poll[0])
  const [getPoll, setPrueba] = useState(poll.entries == undefined ? pollById : poll[0])
  console.log(noteId)
  const dispatch = useDispatch();
  const color = () => {
    return (
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  };
  
  let data = {
    labels: poll[0].options.map(option => option.name),
    datasets: [
      {
        label: poll[0].question,
        data: poll[0].options.map(option => option.votes),
        backgroundColor: poll[0].options.map(() => color()),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    data = {
      labels: poll[0].options.map(option => option.name),
      datasets: [
        {
          label: poll[0].question,
          data: poll[0].options.map(option => option.votes),
          backgroundColor: poll[0].options.map(() => color()),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
  }, [getPoll])

  return (
    <div>
      {getPoll ? (
        <div>
          <ErrorMessage/>
          <h3 className="poll-title">{poll[0].question}</h3>
          <div>
            { poll[0].options && poll[0].status == 0 ? 
              poll[0].options.map((option) => (
                <button
                  className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"    
                  key={option._id}
                  onClick={() => {
                    dispatch(vote(noteId, { answer: option.name}))
                    setPrueba(poll)
                  }}
                >
                  {option.name}
                </button>
              ))
              :
              getPoll.options.map((option) => (
                <button
                  disabled
                  className="button"
                  key={option._id}
                  onClick={() => {
                    dispatch(vote(getPoll._id, { answer: option.name}))
                    setPrueba(poll)
                  }}
                >
                  {option.name}
                </button>
              ))
            }
          </div>
            <button 
              className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"    
              onClick={() => setPrueba(poll)}>
                Refresh
              </button>
            <div className="w-72 h-64">
             <Pie data={data} />
            </div>
        </div>
      ) : (
        <div> Poll not found </div>
      )}
    </div>
  );
}
