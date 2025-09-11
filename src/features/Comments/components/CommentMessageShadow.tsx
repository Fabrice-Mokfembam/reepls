import React from 'react';

const CommentMessageShadow: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {[1, 2].map((_, idx) => (
        <div
          key={idx}
          className="rounded-lg p-4 animate-pulse"
          style={{
            backgroundColor: 'var(--color-neutral-500)',
            color: 'var(--color-neutral-800)',
          }}
        >
          <div className="flex items-center space-x-4 mb-2">
            <div
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: 'var(--color-neutral-600)' }}
            />
            <div
              className="h-4 rounded w-24"
              style={{ backgroundColor: 'var(--color-neutral-600)' }}
            />
            <div
              className="ml-auto h-3 rounded w-12"
              style={{ backgroundColor: 'var(--color-neutral-600)' }}
            />
          </div>
          <div
            className="h-5 rounded w-full"
            style={{ backgroundColor: 'var(--color-neutral-600)' }}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentMessageShadow;
