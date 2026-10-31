import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import ResumePreview from '../components/ResumePreview'
import api from '../configs/api'

const Preview = () => {
const {resumeId} =useParams()
const [isLoading ,setisLoading]=useState(true)
const [resumedata,setresumedata]= useState(null)
useEffect(() => {
  let isMounted = true;

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resume/public/' + resumeId);
      if (isMounted) {
        setresumedata(data.resume);
      }
    } catch (error) {
      if (isMounted) {
        console.error('Unable to load public resume:', error.message);
      }
    } finally {
      if (isMounted) {
        setisLoading(false);
      }
    }
  };

  void loadResume();

  return () => {
    isMounted = false;
  };
}, [resumeId]);
  return resumedata ?(
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>

<ResumePreview
    data={resumedata}
    template={resumedata.template}
    accentColor={resumedata.accent_color}
    className="py-4 bg-white"
  />
      </div>
      
    </div>
  ):(
<div>
{isLoading?<Loader/>:(
  <div className='flex flex-col items-center justify-center h-screen'>
    <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
    <a href='/' className='mt-6 bg-purple-500 hover:bg-purple-600 text-white
    rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-purple-400
    flex items-center transition-colors'>
      <ArrowLeftIcon className='mr-2 size-4'/>
      go to home page
    </a>
  </div>
)
}
</div>
  )
}

export default Preview
