import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api'
import pdfToText from'react-pdftotext'


function Dashboard() {

const {user,token}=useSelector(state=>state.auth)
const [isLoading , setIsLoading]= useState(false)
const [isLoadingResumes, setIsLoadingResumes] = useState(true)
  
  const colors =["#9333ea","#d97706","#dc2626","#0284c7","#16a34a"]
  const[allResumes, setAllResumes]=useState([])
  const [showcreateresume,setshowcreateresume ]=useState(false)
  const [showuploadresume,setshowuploadresume ]=useState(false)
  const[title ,settitle]=useState('')
   const[resume ,setresume]=useState(null)
    const[editresumeid ,seteditresumeid]=useState('')
const navigate= useNavigate()


    const createresume=async(event)=>{
      
     try {
      event.preventDefault()
      const {data}= await api.post('/api/resume/create', {title} ,{headers:{
        Authorization: token }})
      setAllResumes([...allResumes,data.resume])
      settitle('')
      setshowcreateresume(false)
      navigate(`/app/builder/${data.resume._id}`)


     } catch (error) {
      toast.error(error?.response?.data?.message||error.message )
      
     }
    }




     
    const uploadresume=async(event)=>{
      event.preventDefault()
      setIsLoading(true)
     try {
      
const resumeText = await pdfToText(resume)
const {data}= await api.post('/api/ai/upload-resume', {title,resumeText} ,{headers:{
        Authorization: token }})
        settitle('')
        setresume(null)
        setshowuploadresume(false)
        navigate(`/app/builder/${data.resume._id}`)

     } catch (error) {
       toast.error(error?.response?.data?.message||error.message )
     }
     setIsLoading(false)
    }

    const edittitle=async(event)=>{
      try {
        event.preventDefault()
    const {data}= await api.put(`/api/resume/update`,{resumeId:editresumeid,resumeData:{title}},{
      headers:{
        Authorization: token }})
        setAllResumes(allResumes.map(resume=>
          resume._id===editresumeid?{...resume,title}:resume))
          settitle('')
          seteditresumeid('')
          toast.success(data.message)}
        
       catch (error) {
        toast.error(error?.response?.data?.message||error.message )
      }
     
    }


    const deleteresume=async(resumeid)=>{
      try {
        const confirm =window.confirm('Are you sure you want to delete this resume?')
      if(confirm){
        const{data} = await api.delete(`/api/resume/delete/${resumeid}`,{headers:{
        Authorization: token }})
        setAllResumes(allResumes.filter(resume=>resume._id !== resumeid))
        toast.success(data.message)
      }
      } catch (error) {
         toast.error(error?.response?.data?.message||error.message )
     
      }


    }

    useEffect(() => {
      let isMounted = true;

      const loadAllResumes = async () => {
        try {
          const { data } = await api.get('/api/users/resumes', {
            headers: { Authorization: token },
          });
          if (isMounted) {
            setAllResumes(data.resumes);
          }
        } catch (error) {
          if (isMounted) {
            toast.error(error?.response?.data?.message || error.message);
          }
        } finally {
          if (isMounted) {
            setIsLoadingResumes(false);
          }
        }
      };

      void loadAllResumes();

      return () => {
        isMounted = false;
      };
    }, [token]);



  return (
    <div>
     <div className='max-w-7xl  mx-auto px-4 py-8'>
      <p className='text-2xl  font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700
      bg-clip-text text-transparent sm:hidden'>Welcome, {user?.name || 'there'}</p>
      <div className='grid grid-cols-2 gap-3 sm:flex sm:gap-4'>
        
        <button type="button" onClick={()=>setshowcreateresume(true)} className='w-full bg-white sm:max-w-44 min-h-40 sm:h-48 flex flex-col items-center
        justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300
        group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <PlusIcon className=' size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white  rounded-full '/>
          <p className='text-sm hover:text-indigo-500 transition-all '>Create Resume </p></button>
            <button type="button" onClick={()=>{setshowuploadresume(true)}} className='w-full bg-white sm:max-w-44 min-h-40 sm:h-48 flex flex-col items-center
        justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300
        group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <UploadCloudIcon className=' size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white  rounded-full '/>
          <p className='text-sm hover:text-purple-500 transition-all '>Uploade Resume </p></button>
      </div>






      <hr className=' border-slate-300 my-6 sm:w-[305px]'/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {allResumes.map((resume,index)=>{
          const basecolor = colors[index % colors.length];
          return(
          <article key={resume._id} className='relative min-h-40 rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md' style={{background:`linear-gradient(135deg, ${basecolor}10,${basecolor}40)`,borderColor:basecolor+'40'}}>
              <button type="button" onClick={()=>navigate(`/app/builder/${resume._id}`)} aria-label={`Edit ${resume.title}`} className='flex w-full flex-col items-start gap-3 rounded-lg p-2 text-left'>
                <FilePenLineIcon className='size-7' style={{color:basecolor}}/>
                <span className='font-medium' style={{color:basecolor}}>{resume.title}</span>
                <span className='text-xs text-slate-500'>
                  Updated {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'recently'}
                </span>
              </button>
              <div className='absolute right-3 top-3 flex gap-1'>
                <button type="button" aria-label={`Rename ${resume.title}`} onClick={()=>{seteditresumeid(resume._id); settitle(resume.title)}} className='rounded-md p-2 text-slate-700 transition hover:bg-white/70'>
                  <PencilIcon className='size-4'/>
                </button>
                <button type="button" aria-label={`Delete ${resume.title}`} onClick={()=>deleteresume(resume._id)} className='rounded-md p-2 text-slate-700 transition hover:bg-white/70 hover:text-red-600'>
                  <TrashIcon className='size-4'/>
                </button>
              </div>
            </article>
          )

        })}
      </div>
      {!isLoadingResumes && allResumes.length === 0 && (
        <div className='mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
          <FilePenLineIcon className='mx-auto size-9 text-slate-400'/>
          <h2 className='mt-3 font-semibold text-slate-800'>Your resumes will appear here</h2>
          <p className='mt-1 text-sm text-slate-500'>Create a resume or upload a PDF to get started.</p>
        </div>
      )}
      {isLoadingResumes && (
        <p role="status" className='mt-6 text-sm text-slate-500'>Loading your resumes…</p>
      )}








      {showcreateresume&&(
        <form onSubmit={createresume} onClick={()=>{setshowcreateresume(false)}} className='fixed inset-0 bg-black/70 background-blur bg-opacity-50 z-10 flex items-center justify-center '>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-xl w-[calc(100%-2rem)] max-w-sm p-6'>
            <button type="button" aria-label="Close dialog" onClick={()=>{setshowcreateresume(false);settitle('')}} className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
              <XIcon className="size-5"/>
            </button>
            <h2 className='text-xl font-bold mb-4 pr-8'>Create a new resume</h2>
            <input onChange={(e)=>settitle(e.target.value)}  value={title} type='text' placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>
            <button type="submit" className='w-full bg-purple-600 py-2 text-white rounded-lg hover:bg-purple-700 transition-colors'>Create resume</button>
          </div>

        </form>
      )}











      {showuploadresume &&(
        <form onSubmit={uploadresume } onClick={()=>{setshowuploadresume(false)}} className='fixed inset-0 bg-black/70 background-blur bg-opacity-50 z-10 flex items-center justify-center '>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-xl w-[calc(100%-2rem)] max-w-sm p-6'>
            <button type="button" aria-label="Close dialog" onClick={()=>{setshowuploadresume(false);settitle('');setresume(null)}} className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
              <XIcon className="size-5"/>
            </button>
            <h2 className='text-xl font-bold mb-4 pr-8'>Upload a resume</h2>
            <input type='text'onChange={(e)=>settitle(e.target.value)}  value={title} placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>
            <div>
              <label htmlFor='resume-input' className='block text-sm text-slate-700'>
              Select resume File 
              <div className="felx flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4  py-10 my-4 hover:border-purple-700 cursor-pointer transition-colors">
{resume?(<p className='text-purple-700'>{resume.name}</p>):(
<>
<UploadCloud className='size-14 stroke-2'/>
<p>Uplode Resume</p>
</>
)}
              </div>

              </label>
              <input type='file' id='resume-input' accept='.pdf,application/pdf' required hidden onChange={(e)=>{setresume(e.target.files[0])}}></input>
            </div>
            
            
            <button disabled={isLoading} className=' w-full flex items-center justify-center gap-2 bg-purple-600 py-2 text-white rounded hover:bg-purple-700 transition-colors ' >
              {isLoading&&<LoaderCircleIcon className='animate-spin size-4  text-white'/>}
              {
isLoading?'Uploading...':'Upload Resume'
              }
              
            </button>
          </div>

        </form>

      )}
      {editresumeid &&(
        <form onSubmit={edittitle} onClick={()=>{seteditresumeid('')}} className='fixed inset-0 bg-black/70 background-blur bg-opacity-50 z-10 flex items-center justify-center '>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-xl w-[calc(100%-2rem)] max-w-sm p-6'>
            <button type="button" aria-label="Close dialog" onClick={()=>{seteditresumeid('');settitle('')}} className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
              <XIcon className="size-5"/>
            </button>
            <h2 className='text-xl font-bold mb-4 pr-8'>Edit resume title</h2>
            <input onChange={(e)=>settitle(e.target.value)}  value={title} type='text' placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>
            <button type="submit" className='w-full bg-purple-600 py-2 text-white rounded-lg hover:bg-purple-700 transition-colors'>Update title</button>
          </div>

        </form>
      )}


      </div>
    </div>
  )
}

export default Dashboard
