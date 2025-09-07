import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Article, MediaItem } from '../../../../models/datamodels';

interface BlogImageryProps {
  media: MediaItem[];
  article: Article;
}




const BlogImagery: React.FC<BlogImageryProps> = ({ media, article }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Create media array with thumbnail as first item if it exists
  const displayMedia = useMemo(() => {
    if (!article.thumbnail) return media;
    
    // Filter out the thumbnail if it already exists in media to avoid duplicates
    const filteredMedia = media.filter(item => item.url !== article.thumbnail);
    return [
      { url: article.thumbnail, type: 'image' as const, alt: 'Article thumbnail' },
      ...filteredMedia
    ];
  }, [media, article.thumbnail]);

  const openModal = useCallback((index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; 
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % displayMedia.length);
  }, [displayMedia.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + displayMedia.length) % displayMedia.length);
  }, [displayMedia.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, goToNext, goToPrev]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const swipeDistance = touchStart - touchEnd;
    const swipeThreshold = 50; // Minimum swipe distance to trigger navigation
    
    if (swipeDistance > swipeThreshold) {
      goToNext(); // Swipe left -> next
    } else if (swipeDistance < -swipeThreshold) {
      goToPrev(); // Swipe right -> previous
    }
    
    setIsSwiping(false);
  };

  // Click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (displayMedia.length === 0) {
    return null;
  }

  return (
    <>
      {/* Thumbnail Gallery */}
      <div 
        className="relative z-0 w-full max-w-full my-4 mx-auto overflow-hidden rounded-lg bg-gray-100 shadow-md"
        ref={carouselRef}
      >
        <div className="relative aspect-video w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
            </div>
          )}
          
          {displayMedia.map((mediaItem, index) => (
            <div
              key={`${mediaItem.url}-${index}`}
              className={`absolute inset-0 transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div 
                className="h-full w-full cursor-pointer"
                onClick={() => openModal(index)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {mediaItem.type === 'image' ? (
                  <img
                    src={mediaItem.url}
                    alt={mediaItem.alt || `Blog visual ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onLoad={handleImageLoad}
                    onError={() => setIsLoading(false)}
                  />
                ) : (
                  <video
                    src={mediaItem.url}
                    className="h-full w-full object-cover"
                    controls
                    muted
                    autoPlay={false}
                    loop
                    playsInline
                    controlsList="nodownload"
                    preload="metadata"
                    onLoadedData={handleImageLoad}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {displayMedia.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {displayMedia.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
            {displayMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div 
            className="relative h-full w-full max-w-6xl"
            ref={modalRef}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-50 rounded-full bg-black/70 p-2 text-white transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            <div className="flex h-full items-center justify-center p-4">
              <div className="relative h-full w-full max-h-[90vh]">
                {displayMedia.map((mediaItem, index) => (
                  <div
                    key={`modal-${mediaItem.url}-${index}`}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    {mediaItem.type === 'image' ? (
                      <img
                        src={mediaItem.url}
                        alt={mediaItem.alt || `Blog visual ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <video
                        src={mediaItem.url}
                        className="max-h-full max-w-full object-contain"
                        controls
                        autoPlay={index === activeIndex}
                        muted
                        loop
                        playsInline
                        controlsList="nodownload"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Navigation */}
            {displayMedia.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>

                {/* Modal Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                  {displayMedia.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-3 w-3 rounded-full transition-all ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute left-4 top-4 z-50 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
              {activeIndex + 1} / {displayMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogImagery;