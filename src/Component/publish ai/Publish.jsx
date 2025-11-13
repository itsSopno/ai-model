import React from 'react';
import Swal from "sweetalert2";   // ✅ Add this
import './publish.css'
import { Link } from 'react-router';
const Publish = () => {
  
 
  const handleEmailLogin = async(e) => {
    e.preventDefault();

    const form = e.target; // ✅ easy reset reference
    const createdBy = form.email.value;
    const name = form.name.value;
    const image = form.image.value;
    const frameork = form.framework.value;
    const useCase = form.useCase.value;
    const description = form.description.value;
    const dataset = form.dataset.value;

    const newData = { name ,frameork,useCase,dataset,description,image,createdBy};

    try {
      const response = await fetch('https://server-3-smoky.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });

      const result = await response.json();
      console.log("Saved:", result);

      // ✅ Sweet Alert
      Swal.fire({
        title: "Successfully Published!",
        text: "Your model has been uploaded.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      
      form.reset();

    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "Something went wrong!",
        text: "Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#11190c] gap-9 px-4 md:px-8">
      <fieldset className="bg-[#7af201] border-base-300 rounded-box w-full max-w-sm border p-6 shadow-md text-[#11190c]">
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">

          <label className="label">Email</label>
          <input type="email" name="email" placeholder="EMAIL" className="input input-bordered  bg-[#7af201]" required />

          <label className="label">dataset</label>
          <input type="text" name="dataset" placeholder='dataset' className="input input-bordered bg-[#7af201]" required />

          <label className="label">MODEL NAME</label>
          <input type="text" name="name" placeholder="MODEL-NAME" className="input input-bordered bg-[#7af201]" required />

          <label className="label">HOASTED-IMAGE</label>
          <input type="text" name="image" placeholder='IMAGE' className="input input-bordered bg-[#7af201]" required />

          <label className="label">FRAMEWORK</label>
          <input type="text" name="framework" placeholder="FRAMEWORK" className="input input-bordered bg-[#7af201]" required />

          <label className="label">USECASE</label>
          <input type="text" name="useCase" placeholder='USECASE' className="input input-bordered bg-[#7af201]" required />

          <textarea className="textarea textarea-ghost" name="description" placeholder="DISCRIPTION"></textarea>

          <button type="submit" className="btn btn-neutral mt-4 rounded-tr-4xl rounded-tl-4xl">
            PUBLISH
          </button>
    
        </form>
      </fieldset>
    </div>
  );
};

export default Publish;
