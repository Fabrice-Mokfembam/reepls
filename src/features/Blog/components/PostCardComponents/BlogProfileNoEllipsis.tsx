import { CheckCircle } from 'lucide-react'
import React from 'react'
import avatarSrc from '../../../../assets/images/maleAuth.png'
import type { Article } from '../../../../models/datamodels'
interface Articleprobs{
  article: Article
}

const BlogProfileNoEllipsis:React.FC<Articleprobs> = ({article}) => {
    

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <img src={avatarSrc} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div className='flex flex-col '>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-neutral-50">STARUTH</span>
            {<CheckCircle size={16} className="text-primary-400" />}
            <span className="text-primary-400 px-2 text-sm">following</span>
          </div>
          <p className="text-neutral-100 text-sm">Web Developer</p>
          <p className="text-neutral-200 text-sm">6 days ago</p>
        </div>
      </div>
    
    </div>
  )
}

export default BlogProfileNoEllipsis