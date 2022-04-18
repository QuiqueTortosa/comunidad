import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPoll } from "../../store/actions";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const addAnswer = () => {
    setOptions([...options, ""]);//Añadimos un elemento al array
    options.map(o => {
        console.log(o)
    })
  };

  const handleAnswer = (e, i) => {
      console.log(question[i])
      setOptions(o => {
          return [
              ...o.slice(0,i), //El slice devuelve parte de un array
              o[i] = e.target.value,
              ...o.slice(i+1)
          ]
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPoll({
        question,
        options
    }));
  };

  return (
    <form className="form" autocomplete="off" onSubmit={handleSubmit}> 
      <div className="relative z-0 mb-6 w-full group">
         <input type="text" value={question} onChange={handleChange} name="question" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
         <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pregunta</label>
      </div>
      <div className="container">
      {options.map((option, i) => (
          <div key={i} className="relative z-0 mb-6 w-full group">
            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Opción</label>
            <input type="text" key={i} value={option} onChange={(e) => handleAnswer(e, i)} name="question" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-5">
        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="button" onClick={addAnswer}>
          Add options
        </button>
        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

/*
    <form className="form" onSubmit={handleSubmit}>
      <div className="relative z-0 mb-6 w-full group">
         <input type="text" value={question} onChange={handleChange} className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
         <label for="Pregunta" class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pregunta</label>
      </div>
      <label className="form-label" htmlFor="question">
        question
      </label>
      <input
        className="form-input"
        type="text"
        name="question"
        value={question}
        onChange={handleChange}
      />
      <div className="container">
      {options.map((option, i) => (
          <div key={i}>
            <label className="form-label">option</label>
            <input
              className="form-input"
              type="text"
              value={option}
              key={i}
              onChange={(e) => handleAnswer(e, i)}
            />
          </div>
        ))}
      </div>
      <div className="buttons_center">
        <button className="button" type="button" onClick={addAnswer}>
          Add options
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
*/