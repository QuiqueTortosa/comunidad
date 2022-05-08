import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPoll } from "../../store/actions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PolarArea, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const editorConfiguration = {
  toolbar: [ 'heading','bold', 'italic','undo', 'redo' ]
};

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [description, setDesc] = useState("Escribe la descripción");

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
        options,
        description
    }));
    clear()
    
  };

  const clear = () => {
      setQuestion("")
      setOptions(["", ""])
      setDesc("Escribe la descripción")
  }

  let dataPoll = {
    labels: ["Votacion Gestión"],
    datasets: [
      {
        label: "Gestión",
        data: [1],
        backgroundColor: "rgba(17,24,39,0.6)",
      },
    ],
  };

  let optionsPoll = {
    plugins: {
      legend: {
          display: false,
      }
  }
  }

  return (
    <form className="form shadow-3xl text-center pt-4 pb-8 px-16 rounded-xl sm:shadow-none sm:rounded-none sm:p-0" autoComplete="off" onSubmit={handleSubmit}> 
      <h1 className="text-3xl font-bold italic font-extrabold mt-5 mb-5">Añadir Votación</h1>
      <div className="flex items-center justify-center gap-8">
        <div>
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
        </div>
        <div className="flex h-32 w-32 text-center">
          <Doughnut data={dataPoll} options={optionsPoll}/>
        </div>
      </div>
      <div className="">
          <CKEditor
                        editor={ ClassicEditor }
                        config={ editorConfiguration }
                        data={description}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( e, editor ) => {
                            const data = editor.getData();
                            console.log( { e, editor, data } );
                            setDesc(data)
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
          </div>
      <div className="flex flex-row gap-5 mt-5">
       <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
          Guardar
        </button>
        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="button" onClick={addAnswer}>
          Añadir opción
        </button>
      </div>
    </form>
  );
}
