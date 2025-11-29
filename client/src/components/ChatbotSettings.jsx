import React from 'react'
import { useForm } from 'react-hook-form'

const ChatbotSettings = () => {

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = async(data) => {
        console.log("Chatbot settings data:", data);
        // Implement settings submission logic here
      }


  return (
    <div className='w-full h-fit backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white flex flex-wrap gap-6 flex-col'>
        <h2 className='text-xl font-semibold mb-4' >Finetune your Chatbot : </h2>
        <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
                <label className='block mb-2'>Select Mood:</label>
                <select
                    className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-xl p-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300'
                    {...register('mood', { required: true })}
                >
                    <option value="">--Select Mood--</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                    <option value="other">Other</option>
                </select>
                {errors.mood && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Mood is required</span>}
            </div>
            <div className="group">
                <label className='block mb-2'>If Other, please specify:</label>
                <input
                    type="text"
                    placeholder='Your Mood'
                    className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-xl p-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500'
                    {...register('otherMood')}
                />
            </div>
            <div className="group">
                <label className='block mb-2'>Select Category:</label>
                <select
                    className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-xl p-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300'
                    {...register('category', { required: true })}
                >
                    <option value="">--Select Category--</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                </select>
                {errors.category && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Category is required</span>}
            </div>
            <div className="group">
                <label className='block mb-2'>If Other, please specify:</label>
                <input
                    type="text"
                    placeholder='Your Category'
                    className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-xl p-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500'
                    {...register('otherCategory')}
                />
            </div>
            <div className="group">
                <label className='block mb-2'>Description for AI:</label>
                <textarea
                    placeholder='How should the AI respond?'
                    className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-xl p-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500 resize-none h-24'
                    {...register('description', { required: true, minLength: 10 })} 
                />
                {errors.description && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Description is required and should be at least 10 characters</span>}
            </div>
            <button
                type="submit"
                className='w-full bg-linear-to-r from-green-600 to-green-500 text-black font-bold text-xl rounded-xl p-4 mt-4 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out'
                style={{ fontFamily: "Cabin Sketch" }}
            >
                Save Settings
            </button>
        </form>
    </div>
  )
}

export default ChatbotSettings
