import React from 'react';
import { useForm } from 'react-hook-form';
// Added FileText to imports for the document icon
import { Sparkles, Brain, Sliders, Database, FileText } from 'lucide-react'; 

const ChatbotSettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      temperature: 0.7,
      maxTokens: 500,
      enableRAG: true,
      model: 'gemini-1.5-flash', // Corrected model name for stability
      documentContent: ""        // New field for RAG
    }
  });

  // Watch fields for conditional rendering
  const mood = watch('mood');
  const enableDocs = watch('enableDocs'); // We watch this to toggle the text area
  const temperature = watch('temperature');

  const onSubmit = async (data) => {
    console.log("Saving AI Configuration:", data);
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('chatbot_settings', JSON.stringify(data));
    alert("AI Settings Deployed! 🧠"); 
  };

  return (
    <div className='w-full max-w-4xl mx-auto backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 text-white shadow-2xl'>
      
      {/* Header */}
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
                            className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-4 focus:border-green-500 outline-none'
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

        {/* --- SECTION 2: HYPERPARAMETERS --- */}
        <div className='space-y-4 p-6 bg-white/5 rounded-2xl border border-white/5'>
            <h3 className='text-green-400 font-semibold flex items-center gap-2'><Sliders size={18}/> Model Hyperparameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Temperature */}
                <div className="group">
                    <div className="flex justify-between mb-2">
                        <label className='text-sm font-medium text-zinc-300'>Temperature (Creativity)</label>
                        <span className='text-green-400 font-mono'>{temperature}</span>
                    </div>
                    <input 
                        type="range" min="0" max="1" step="0.1"
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
                        className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-3 focus:border-green-500 outline-none'
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

        {/* --- SECTION 3: KNOWLEDGE BASE (RAG UI ADDED HERE) --- */}
        <div className='space-y-4'>
            <h3 className='text-green-400 font-semibold flex items-center gap-2'><Database size={18}/> Knowledge Base (RAG)</h3>
            
            <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition select-none">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableHistory')} />
                    <span className="text-zinc-300">Conversation History</span>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition select-none">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableWebSearch')} />
                    <span className="text-zinc-300">Live Web Search</span>
                </label>

                {/* The Trigger for the Document Input */}
                <label className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition select-none">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" {...register('enableDocs')} />
                    <span className="text-zinc-300">Project Documents</span>
                </label>
            </div>

            {/* --- CONDITIONAL DOCUMENT INPUT (Preserving Design) --- */}
            {enableDocs && (
                <div className="w-full mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className='bg-zinc-900/30 p-4 rounded-xl border border-green-500/30'>
                        <label className='block mb-2 text-sm font-medium text-green-400 flex items-center gap-2'>
                            <FileText size={16}/> 
                            Paste Context / Documentation
                        </label>
                        <textarea
                            placeholder='Paste your text here (e.g., "The secret code is 1234", or "This app was built by Vansh"). The AI will use this to answer questions.'
                            className='w-full bg-black/20 text-white border border-zinc-600 rounded-xl p-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none font-mono text-sm h-40 resize-none'
                            {...register('documentContent')}
                        />
                        <p className='text-xs text-zinc-500 mt-2 ml-1'>* The AI will prioritize this information when answering.</p>
                    </div>
                </div>
            )}
        </div>

        {/* --- SECTION 4: SYSTEM PROMPT --- */}
        <div className="group">
            <label className='block mb-2 text-sm font-medium text-zinc-300'>System Prompt</label>
            <p className='text-xs text-zinc-500 mb-2'>This instruction defines the core behavior of the model.</p>
            <textarea
                placeholder='e.g., You are a helpful AI assistant specialized in React development...'
                className='w-full bg-zinc-900/50 text-white border border-zinc-700 rounded-xl p-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none font-mono text-sm h-32 resize-none'
                {...register('systemPrompt', { required: true, minLength: 10 })} 
            />
            {errors.systemPrompt && <span className='text-red-400 text-xs'>* System Prompt is required</span>}
        </div>

        <button
            type="submit"
            className='w-full bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl p-4 mt-4 shadow-lg hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200'
        >
            Deploy Configuration
        </button>
      </form>
    </div>
  );
};

export default ChatbotSettings;