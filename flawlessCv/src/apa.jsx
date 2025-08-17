import axios from "axios";
import { useState } from "react";
import "./App.css";

function Apa() {


  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('destination', name);
    formData.append('file', file);


    try {
      const response = await axios.post('http://localhost:5000/llm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(response.data.data);
      handleClearForm();
    } catch (error) {
      console.error(error);
      setResponse('Terjadi kesalahan saat mengirimkan formulir.');
      handleClearForm();
    }
  };

  const handleClearForm = () => {
    setName('');
    setFile(null);
  };

  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="mb-10 text-3xl font-bold underline bg-blue-50">
        Review Resume
      </h1>
      <form onSubmit={handleSubmit} className="flex-col space-y-4">
        <div className="">
          <label className="mr-5">Posisi</label>
          <input
            type="text"
            className="border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label className="mr-5">Resume</label>
          <input
            type="file"
            className=""
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="p-2 text-white bg-blue-500">
          Submit
        </button>
      </form>
      <div className="mt-5 mb-20 mx-14 ">
        <h2 className="text-xl font-bold">Response:</h2>
        <p>{response}</p>
        </div>
   
    </section>
  );
}

export default Apa;
