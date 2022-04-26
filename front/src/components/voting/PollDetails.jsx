import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../../store/actions";
import ErrorMessage from "../ErrorMessage";
import { PolarArea, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import autocolors from "chartjs-plugin-autocolors";

export default function PollDetails() {
  const polls = useSelector((state) => state.VOTACIONES);
  console.log("AQUI");
  console.log(polls);
  const { noteId } = useParams();
  let pollById = polls.find((p) => p._id == noteId);
  const poll = useSelector((state) =>
    state.VOTACIONES.filter((p) => p._id == noteId)
  );
  console.log("poll unica: ");
  console.log(poll[0]);
  const [getPoll, setPrueba] = useState(
    poll.entries == undefined ? pollById : poll[0]
  );
  console.log(noteId);
  const dispatch = useDispatch();
  const color = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
  };

  const random_rgba = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      0.6 +
      ")"
    );
  };

  let data = {
    labels: poll[0].options.map((option) =>
      option.name.length > 7 ? option.name.substring(0, 7) + "..." : option.name
    ),
    datasets: [
      {
        label: "Datos",
        data: poll[0].options.map((option) => option.votes),
        backgroundColor: poll[0].options.map(() => random_rgba()),
      },
    ],
  };

  useEffect(() => {
    data = {
      labels: poll[0].options.map((option) => option.name),
      datasets: [
        {
          label: "Datos",
          data: poll[0].options.map((option) => option.votes),
          backgroundColor: poll[0].options.map(() => random_rgba()),
        },
      ],
    };
  }, [getPoll]);

  return (
    <div>
      {poll ? (
        <div className="flex flex-col mx-8 my-4">
          <ErrorMessage />
          <div className="flex flex-row lg:flex-col  place-items-center">
            <div className="w-full">
              <div className="mb-4">
                <h3 className="text-2xl font-bold italic font-extrabold">
                  {poll[0].question}
                </h3>
              </div>
              <div className="flex flex-col">
                {poll[0].options && poll[0].status == 0
                  ? poll[0].options.map((option, index) => (
                      <div className="flex gap-2 align-bottom mb-3">
                        <button
                          className="bg-blue-900 rounded-full text-center text-white px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
                          key={option._id}
                          onClick={() => {
                            dispatch(vote(noteId, { answer: option.name }));
                            setPrueba(poll[0]);
                          }}
                        >
                          {index + 1 + " )"}
                        </button>
                        <p className="align-bottom place-self-end mb-1">
                          {option.name}
                        </p>
                      </div>
                    ))
                  : getPoll.options.map((option, index) => (
                      <div className="flex gap-2 align-bottom mb-3">
                        <button
                          className="bg-blue-900 rounded-full text-center text-white px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
                          key={option._id}
                          onClick={() => {
                            dispatch(vote(noteId, { answer: option.name }));
                            setPrueba(poll[0]);
                          }}
                        >
                          {index + 1 + " )"}
                        </button>
                        <p className="align-bottom place-self-end mb-1">
                          {option.name}
                        </p>
                      </div>
                    ))}
              </div>
              <div className="mb-2" dangerouslySetInnerHTML={{ __html: poll[0].description }}/>
              <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => setPrueba(poll)}>
                Refresh
              </button>
            </div>
            <div className="flex flex-col w-4/12 h-64 ml-6 justify-center lg:w-full">
              <Bar data={data} />
            </div>
          </div>
          <div className="flex flex-row justify-evenly lg:flex-col items-center">
            <div className="w-72 h-64 mt-3 lg:my-5">
              <PolarArea data={data} />
            </div>
            <div className="w-72 h-72 mt-3">
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      ) : (
        <div> Poll not found </div>
      )}
    </div>
  );
}
