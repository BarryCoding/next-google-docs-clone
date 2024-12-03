'use client'

import { cn } from '@/lib/utils'
import { UnfoldHorizontalIcon } from 'lucide-react'
import { useRef, useState } from 'react'

const DEFAULT_MARGIN = 57 // COOL 1px border, 56px padding
const PAGE_WIDTH = 816
const MINIMUM_SPACE = 100
// const markers = Array.from({ length: 83 }, (_, i) => i)
const markers = Array.from({ length: 817 }, (_, i) => i)

export const Ruler = () => {
  // TODO: store
  const [leftMargin, setLeftMargin] = useState(DEFAULT_MARGIN)
  const [rightMargin, setRightMargin] = useState(DEFAULT_MARGIN)

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const rulerRef = useRef<HTMLDivElement>(null)

  // TODO: the edge conditions!!! notes
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rulerRef.current) return

    const container = rulerRef.current.querySelector('#ruler-container')
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const relativeX = e.clientX - containerRect.left
    const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX))

    if (isDraggingLeft) {
      const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE
      const newLeftPosition = Math.min(rawPosition, maxLeftPosition)
      console.log(`🔎 🔍 ~ handleMouseMove ~ newLeftPosition:`, newLeftPosition)
      setLeftMargin(newLeftPosition)
    }

    if (isDraggingRight) {
      const maxRightPosition = PAGE_WIDTH - leftMargin - MINIMUM_SPACE
      const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
      const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)
      console.log(`🔎 🔍 ~ handleMouseMove ~ constrainedRightPosition:`, constrainedRightPosition)
      setRightMargin(constrainedRightPosition)
    }
  }

  const handleMouseUpOrLeave = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(DEFAULT_MARGIN)
  }

  const handleRightDoubleClick = () => {
    setRightMargin(DEFAULT_MARGIN)
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className='relative mx-auto flex h-6 w-[816px] select-none items-end border-b border-gray-300 print:hidden'
    >
      <div id='ruler-container' className='relative h-full w-full'>
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={() => setIsDraggingLeft(true)}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={() => setIsDraggingRight(true)}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              return (
                <div key={marker} className='absolute bottom-0' style={{ left: `${marker}px` }}>
                  {marker % 100 === 0 && (
                    <>
                      <div className='absolute bottom-0 h-2 w-[1px] bg-neutral-500' />
                      <span className='absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500'>
                        {marker / 100}
                      </span>
                    </>
                  )}
                  {marker % 50 === 0 && marker % 100 !== 0 && (
                    <div className='absolute bottom-0 h-1.5 w-[1px] bg-neutral-500' />
                  )}
                  {marker % 50 !== 0 && marker % 10 === 0 && (
                    <div className='absolute bottom-0 h-1 w-[1px] bg-neutral-500' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number
  isLeft: boolean
  isDragging: boolean
  onMouseDown: () => void
  onDoubleClick: () => void
}

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
  return (
    <div
      className={cn(
        'group absolute top-0 z-[5] h-full w-6 cursor-ew-resize',
        isLeft ? '-ml-3' : '-mr-3',
      )}
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <UnfoldHorizontalIcon className='absolute left-1/2 top-0 h-full -translate-x-1/2 transform text-blue-500' />
      <div
        className='absolute left-1/2 top-4 -translate-x-1/2 transform'
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  )
}
