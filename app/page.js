"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  //function to get file extension name
  const getExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  //handleUpload function
  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!selected) {
        alert("File not selected!");
        return;
      }
      //alert(URL.createObjectURL(selected));
      const formData = new FormData();
      formData.append("file", selected);
      console.log(formData);
      const request = await axios.post("/api/upload/", formData);
      //const response = await request.json();
      alert(request.messege);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <input
        type="file"
        onChange={(event) => setSelected(event.target.files[0])}
      />
      <button
        className=" p-2 bg-slate-800 text-2xl font-semibold text-white"
        onClick={handleUpload}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {selected &&
      ["jpg", "png", "gif"].includes(getExtension(selected.name)) ? (
        <img src={URL.createObjectURL(selected)} style={{ width: "100vmin" }} />
      ) : null}
      <br />
    </>
  );
}
