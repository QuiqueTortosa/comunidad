import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { voteDiscussion, getDiscussions } from "../../../store/actions";
import { PolarArea, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Poll({poll}) {
  const dispatch = useDispatch();
  const { discId } = useParams();

  useEffect(() => {
    dispatch(getDiscussions())
  },[poll.voted.length])

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
    labels: poll.options.map((option) =>
      option.name.length > 7 ? option.name.substring(0, 7) + "..." : option.name
    ),
    datasets: [
      {
        label: "Datos",
        data: poll.options.map((option) => option.votes),
        backgroundColor: poll.options.map(() => random_rgba()),
      },
    ],
  };

  let options = {
    plugins: {
      legend: {
          display: false,
      }
  }
}

  useEffect(() => {
    data = {
      datasets: [
        {
          label: "Datos",
          data: poll.options.map((option) => option.votes),
          backgroundColor: poll.options.map(() => random_rgba()),
        },
      ],
    };
  }, [poll]);
  return (
        <div className="flex flex-col">
          <div className="flex flex-row place-items-center justify-center sm:flex-col">
            <div className="flex flex-col w-3/12 min-w-[200px] max-w-[2500px] h-auto mb-2 ml-6 justify-center">
              <Doughnut data={data} options={options}/>
            </div>
            <div className="flex flex-col ml-3">
              <div className="">
                <h3 className="text-xl font-bold italic">
                  {poll.question}
                </h3>
              </div>
                {
                  poll.options.map((option, index) => (
                    <div className="flex gap-2 align-bottom mb-3">
                      <button
                        className="bg-blue-900 rounded-full text-center text-white px-2 py-1 shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
                        key={option._id}
                        onClick={() => {
                          dispatch(voteDiscussion(discId, { answer: option.name }))
                         }}
                       >
                        {index + 1 + " )"}
                      </button>
                      <p className="align-bottom place-self-end mb-1">
                        {option.name}
                      </p>
                    </div>
                    ))
                  }
              </div>
          </div>
        </div>
  )
}
