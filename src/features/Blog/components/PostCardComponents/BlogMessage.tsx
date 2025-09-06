import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../../../utils'
import { t } from 'i18next'


interface BlogMessageProps {
  title: string
  content: string
  isArticle?: boolean
}

const BlogMessage: React.FC<BlogMessageProps> = ({ 
  title, 
  content, 
  isArticle = false, 
  
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    setHasClicked(true)
  }

  // Check if content exceeds 3 lines and needs a "see more" button
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(getComputedStyle(contentRef.current).lineHeight)
      const contentHeight = contentRef.current.scrollHeight
      // Assuming 3 lines of text (line-clamp-3)
      const threeLinesHeight = lineHeight * 3
      
      setShowToggle(contentHeight > threeLinesHeight)
    }
  }, [content])

  return (
    <div className="blog-message">
      <div className="text-[15px] text-neutral-50 font-semibold mb-2">{title}</div>
      <p
        ref={contentRef}
        className={cn(
          'text-neutral-100 text-[14px] leading-[20px] transition-all duration-300',
          isExpanded ? 'line-clamp-none' : 'line-clamp-3',
          'whitespace-pre-wrap'
        )}
      >
        {content}
      </p>
      {isArticle ? (
        <button
          onClick={handleToggle}
          disabled={hasClicked}
          className="text-primary-400  underline decoration-dotted underline-offset-4 text-[14px] font-medium mt-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("blog.Continuereading")}
        </button>
      ) : (
        showToggle && (
          <button onClick={handleToggle} className="text-primary-400 cursor-pointer text-[14px] font-medium mt-1">
            {isExpanded ? t('blog.seeLess') : t('blog.seeMore')}
          </button>
        )
      )}
    </div>
  )
}

export default BlogMessage