import  ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import   MinimalTemplate from './templates/MinimalTemplate'
import  ModernTemplate from './templates/ModernTemplate'


const ResumePreview = ({data, template, accentColor, className = ""}) => {
  const renderTemplate =()=>{
    switch (template) {
      case "modern":
        return<ModernTemplate data={data} accentColor={accentColor}/>;
        

     case "minimal":
         return<MinimalTemplate data={data} accentColor={accentColor}/>;
        

         case "minimal-image":
         return<MinimalImageTemplate data={data} accentColor={accentColor}/>;
        

      default:
        return<ClassicTemplate data={data} accentColor={accentColor}/>;
        
    }


  }
  return (
    <div className='w-full overflow-x-auto bg-gray-100'>
        <div id='resume_preview' 
        className={`mx-auto w-full border border-gray-200 bg-white shadow-sm print:shadow-none print:border-none ${className}`}>
{renderTemplate()}
        </div>
    </div>
  )
}

export default ResumePreview
