
import { heart, thumb, clap } from "../../../../assets/icons";

const BlogReactionStats = () => {
  return (
  <div className="flex items-center justify-between py-5">
      {/* React Button */}
      <button className="flex items-center space-x-2 text-neutral-50 hover:text-primary-500 transition-colors">
        <div className="flex">
              <img
                      src={heart}
                      alt='heart'
                      className='w-5 h-5 rounded-full shadow-md transform transition-transform relative z-50 -ml-1'
                    />
                    <img
                      src={thumb}
                      alt='thumb'
                      className='w-5 h-5 rounded-full shadow-md transform transition-transform relative z-30 -ml-2'
                    />
                    <img
                      src={clap}
                      alt='hand'
                      className='w-5 h-5 rounded-full shadow-md transform transition-transform relative z-20 -ml-2'
                    />
        </div>
        <span className="text-sm font-medium">5</span>
      </button>

      {/* Comment Button */}
      <button className="flex items-center space-x-2 text-neutral-50 hover:text-primary-500 transition-colors">
       <span>6</span>
        <span className="text-sm font-medium">Comments</span>
      </button>
    </div>
  )
}

export default BlogReactionStats