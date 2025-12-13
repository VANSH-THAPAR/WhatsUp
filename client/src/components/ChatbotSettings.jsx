import React from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles, Brain, Sliders, MessageSquare, Database } from 'lucide-react'; // Assuming you can use lucide-react or similar icons

const ChatbotSettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      temperature: 0.7,
      maxTokens: 500,
      enableRAG: true,
      model: 'gemini-2.5-pro',
    }
  });

  // Watch fields for conditional rendering
  const mood = watch('mood');
  const category = watch('category');
  const temperature = watch('temperature');

  const onSubmit = async (data) => {
    console.log("Saving AI Configuration:", data);
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('chatbot_settings', JSON.stringify(data));
    alert("Settings Saved!"); // Simple feedback
  };

  return (
    <div className='w-full max-w-4xl mx-auto backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 text-white shadow-2xl'>
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Brain className="text-green-500 w-8 h-8" />
        <div>
          <h2 className='text-2xl font-bold'>Model Configuration</h2>
          <p className='text-zinc-400 text-sm'>Fine-tune hyperparameters and system behavior</p>
        </div>
      </div>

      <form className='w-full flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        
        {/* --- SECTION 1: CORE BEHAVIOR --- */}
        <div className='space-y-4'>
            <h3 className='text-green-400 font-semibold flex items-center gap-2'><Sparkles size={18}/> Persona & Style</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mood Selector */}
                <div className="group">
                    <label className='block mb-2 text-sm font-medium text-zinc-300'>Base Persona (Mood)</label>
                    <select
                        className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none'
                        {...register('mood', { required: true })}
                    >
                        <option value="">Select Persona</option>
                        <option value="professional">Professional Assistant</option>
                        <option value="empathetic">Empathetic Friend</option>
                        <option value="sarcastic">Witty/Sarcastic</option>
                        <option value="technical">Technical Expert</option>
                        <option value="other">Custom...</option>
                    </select>
                    {errors.mood && <span className='text-red-400 text-xs mt-1'>* Required</span>}
                </div>

                {/* Conditional Custom Mood */}
                {mood === 'other' && (
                    <div className="group animate-in fade-in slide-in-from-top-2">
                        <label className='block mb-2 text-sm font-medium text-zinc-300'>Define Custom Persona</label>
                        <input
                            type="text"
                            placeholder='e.g., A pirate from the 1700s'
                            className='w-full bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 focus:border-green-500 outline-none'
                            {...register('otherMood', { required: true })}
                        />
                    </div>
                )}

                {/* Response Format */}
                <div className="group">
                    <label className='block mb-2 text-sm font-medium text-zinc-300'>Response Format</label>
                    <select
                        className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-4 focus:border-green-500 outline-none'
                        {...register('responseStyle')}
                    >
                        <option value="concise">Concise (Bullet points)</option>
                        <option value="conversational">Conversational (Natural)</option>
                        <option value="code_heavy">Technical (Code blocks)</option>
                        <option value="storyteller">Narrative (Long form)</option>
                    </select>
                </div>
            </div>
        </div>

        {/* --- SECTION 2: HYPERPARAMETERS (The GenAI Flex) --- */}
        <div className='space-y-4 p-6 bg-white/5 rounded-2xl border border-white/5'>
            <h3 className='text-green-400 font-semibold flex items-center gap-2'><Sliders size={18}/> Model Hyperparameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Temperature Slider */}
                <div className="group">
                    <div className="flex justify-between mb-2">
                        <label className='text-sm font-medium text-zinc-300'>Temperature (Creativity)</label>
                        <span className='text-green-400 font-mono'>{temperature}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1"
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                        {...register('temperature')}
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>Precise (0.0)</span>
                        <span>Creative (1.0)</span>
                    </div>
                </div>

                {/* Max Tokens */}
                <div className="group">
                     <label className='block mb-2 text-sm font-medium text-zinc-300'>Max Output Tokens</label>
                     <select 
                        className='w-full bg-zinc-900/50 border border-zinc-700 rounded-xl p-3 focus:border-green-500 outline-none'
                        {...register('maxTokens')}
                     >
                        <option value="256">Short (256)</option>
                        <option value="512">Medium (512)</option>
                        <option value="1024">Long (1024)</option>
                        <option value="4096">Full Context (4096)</option>
                     </select>
                </div>
            </div>
        </div>

        {/* --- SECTION 3: KNOWLEDGE & CONTEXT (RAG) --- */}
        <div className='space-y-4'>
            <h3 className='text-green-400 font-semibold flex items-center gap-2'><Database size={18}/> Knowledge Base (RAG)</h3>
            
            <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableHistory')} />
                    <span className="text-zinc-300">Conversation History</span>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableWebSearch')} />
                    <span className="text-zinc-300">Live Web Search</span>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableDocs')} />
                    <span className="text-zinc-300">Project Documents</span>
                </label>
            </div>
        </div>

        {/* --- SECTION 4: SYSTEM PROMPT --- */}
        <div className="group">
            <label className='block mb-2 text-sm font-medium text-zinc-300'>System Prompt</label>
            <p className='text-xs text-zinc-500 mb-2'>This instruction defines the core behavior of the model and cannot be overridden by user messages.</p>
            <textarea
                placeholder='e.g., You are a helpful AI assistant specialized in React development. Always prefer functional components...'
                className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none font-mono text-sm h-32 resize-none'
                {...register('systemPrompt', { required: true, minLength: 10 })} 
            />
            {errors.systemPrompt && <span className='text-red-400 text-xs'>* System Prompt is required</span>}
        </div>

        <button
            type="submit"
            className='w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl p-4 mt-4 shadow-lg hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200'
        >
            Deploy Configuration
        </button>
      </form>
    </div>
  );
};

export default ChatbotSettings;