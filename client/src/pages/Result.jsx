// import React, { useContext, useState } from 'react'
// import {assets} from '../assets/assets'
// import {motion} from "motion/react"
// import { AppContext } from '../context/AppContext';

// const Result = () => {
//   const [image,setImage]=useState(assets.sample_img_1);
//   const [isImageLoaded,setIsImageLoaded]=useState(false);
//   const [loading,setLoading]=useState(false);
//   const [input,setInput]=useState('');
//   const {generateImage}=useContext(AppContext)

//   const onsubmitHandler =async(e)=>{
//      e.preventDefault()
//      setLoading(true)
//      if(input){
//       const image=await generateImage(input)
//       if(image){
//         setIsImageLoaded(true)
//         setImage(image)
//         setInput(''); //clear text after generating
//       }
//      }
//      setLoading(false)
//   }



//   return (
//     <motion.form 
//     initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
//     onSubmit={onsubmitHandler} action="" className='flex flex-col min-h-[90vh] justify-center items-center'>
//     <div>
//       <div className='relative'>
//         <img src={image} className='max-w-sm rounded' alt="" />
//         <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
//     loading ? 'w-full' : 'w-0'
//   }`}></span>
//       </div>
//       <p className={!loading ? 'hidden':""}>Loading.....</p>

//     </div>
//     {!isImageLoaded &&
//     <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
//       <input 
//       onChange={e =>setInput(e.target.value)}
//       value={input}
//       type="text" placeholder='Describe what you want to generate' name="" id=""  
//       className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
//       <button type='submit'
//       className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
//     </div>
// }
// {isImageLoaded &&
//     <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
//       <p onClick={() => {
//     setIsImageLoaded(false);
//     setInput('');
//       }}
//       className='bg-transparent border border-zinc-900
//        text-black px-8 py-3 rounded-full cursor-pointer'>
//         Generate Another</p>
//       <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
//     </div>
// }
//     </motion.form>
//   )
// }

// export default Result


import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const { generateImage } = useContext(AppContext);

  const progressInterval = useRef(null);

  // Progress animation loop
  useEffect(() => {
    if (loading) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 1; // slow build-up
          return prev; // hold at 90% until done
        });
      }, 80);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [loading]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setProgress(0);

    const image = await generateImage(input);

    if (image) {
      setProgress(100);
      setImage(image);
      setIsImageLoaded(true);
      setInput("");

      // Wait briefly so 100% progress is visible
      setTimeout(() => {
        setLoading(false);
      }, 600);
    } else {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onsubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="relative">
        <img src={image} alt="" className="max-w-sm rounded" />

        {/* Blue progress bar */}
        {loading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="h-1 bg-blue-500 rounded"
            ></motion.div>
          </div>
        )}
      </div>

      {loading && <p className="text-center text-gray-600 mt-2">Generating image...</p>}

      {!isImageLoaded && !loading && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && !loading && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
              setInput("");
              setProgress(0);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
