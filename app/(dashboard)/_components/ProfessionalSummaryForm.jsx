import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'

const ProfessionalSummaryForm = ({data,onChange,setResumeData,onEnhanced}) => {
  const [enhancing, setEnhancing] = useState(false)

  const enhanceWithAI = async () => {
    if (!data || enhancing) return
    try {
      setEnhancing(true)
      const res = await axios.post('/api/ai/enhance-pro-sum', { userContext: data })
      const improved = res?.data?.enhanceContent || ''
      if (improved) {
        onChange(improved)
        // Notify parent so it can persist immediately
        if (typeof onEnhanced === 'function') {
          try { await onEnhanced(improved) } catch {}
        }
      }
    } catch (e) {
      console.error('enhance-pro-sum failed', e)
    } finally {
      setEnhancing(false)
    }
  }

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add Summary for your resume here</p>
            </div>
            <button onClick={enhanceWithAI} disabled={!data || enhancing} className='flex items-center  cursor-pointer gap-2 px-3 text-sm py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                <Sparkles className='size-4' />
                <span>{enhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
            </button>
        </div>
        <div className='mt-4'>
            {enhancing && (
              <p className='text-xs text-purple-600 mt-1 animate-pulse'>Enhancing summary…</p>
            )}
            <textarea
              value={data || ''}
              onChange={(e)=>onChange(e.target.value)}
              rows={7}
              className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
              disabled={enhancing}
              aria-busy={enhancing}
            />
            <p className='text-sm text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills</p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm
