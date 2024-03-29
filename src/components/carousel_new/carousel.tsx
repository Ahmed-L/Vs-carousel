import React, { HTMLAttributes } from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
import './carousel_new.css'
import clsx from 'clsx'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean
  autoplayInterval?: number
  classNames?: string
  carouselContainerClassNames?:string
  PaginationClassNames?: string
  paginationActiveClassNames?: string
  showIndicator?: boolean
  rightIndicatorClassNames?: string
  leftIndicatorClassNames?: string
  children?: any
  showItemsPerRow?: number
  slideby?: number
  showPagination?: boolean
  paginationPosition?: 'top' | 'bottom'
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref) => {
    const {
      classNames = '',
      autoplay = true,
      autoplayInterval = 1000,
      paginationPosition = 'bottom',
      showPagination = true,
      showIndicator=true,
      leftIndicatorClassNames='left-arrow',
      rightIndicatorClassNames='right-arrow',
      PaginationClassNames='dot',
      paginationActiveClassNames='dot active',
      carouselContainerClassNames = " h-1/2 w-1/2 m-auto relative",
      ...restProps
    } = props

    let { children, showItemsPerRow = 1, slideby = 1 } = props
    if (showItemsPerRow > children.length && children.length > 1) {
      showItemsPerRow = children.length - 1
      console.log('show > items, add more items')
    } else if (showItemsPerRow === children.length) {
      showItemsPerRow = children.length === 1 ? 1 : children.length
    }
    const carousel_content = useRef<any>(null)
    // const element = carousel_content?.current

    const disableTransition = () => {
    const element = carousel_content?.current
      if (element !== null) {
        element.style.transition = 'none'
        if (transitionChanged === 1) {
          element.style.transform = `translateX(-${showItemsPerRow * (100 / showItemsPerRow)}%)`
        } else if (transitionChanged === -1) {
          element.style.transform = `translateX(-${
            (length - showItemsPerRow) * (100 / showItemsPerRow)
          }%)`
        }
      }
    }
    const enableTransition = () => {
    const element = carousel_content?.current
      if (element) {
        element.style.transition = 'all 250ms linear'
        element.style.transform = `translateX(-${currentIndex * (100 / showItemsPerRow)}%)`
      }
    }

    const [currentIndex, setCurrentIndex] = useState(showItemsPerRow + 1)
    const [length, setLength] = useState(children.length + showItemsPerRow + showItemsPerRow)
    // const [touchPosition, setTouchPosition] = useState(null)
    const [transitionChanged, setTransitionChanged] = useState(0)
    const [activeDot, setActiveDot] = useState(0)

    let infinite_scrollable_children = []
    if (children.length > 1) {
      if (children.length - 1 - showItemsPerRow >= 0) {
        infinite_scrollable_children.push(
          children.slice(children.length - 1 - showItemsPerRow, children.length),
        )
      } else {
        const extras = children.length - 1 - showItemsPerRow
        infinite_scrollable_children.push(children.slice(extras, 0))
        infinite_scrollable_children.push(children.slice(0, children.length))
      }
      infinite_scrollable_children.push(...children)
      if (children.length - 1 - showItemsPerRow >= 0) {
        infinite_scrollable_children.push(children.slice(0, showItemsPerRow + 1))
      } else {
        const extras = children.length - 1 - showItemsPerRow
        infinite_scrollable_children.push(children.slice(0, showItemsPerRow + 1))
        infinite_scrollable_children.push(children.slice(0, Math.abs(extras)))
      }
    } else {
      infinite_scrollable_children.push(children)
      infinite_scrollable_children.push(children)
      infinite_scrollable_children.push(children)
    }

    useEffect(() => {
      setLength(children.length + showItemsPerRow + showItemsPerRow)
    }, [children])

    useEffect(() => {
      setActiveDot(currentIndex - 1 - showItemsPerRow)
    }, [currentIndex])

    useEffect(() => {
    const element = carousel_content?.current
      if (transitionChanged === 1 && element) {
        element.style.transform = `translateX(-${
          (currentIndex + slideby) * (100 / showItemsPerRow)
        }%)`
        setTimeout(() => {
          console.log('TIMEOUT CALLED')
          disableTransition()
          setTransitionChanged(0)
          setCurrentIndex(showItemsPerRow + 1)
        }, 250)
      } else if (transitionChanged === -1 && element) {
        element.style.transform = `translateX(-${
          ((currentIndex - slideby) % length) * (100 / showItemsPerRow)
        }%)`
        setTimeout(() => {
          disableTransition()
          setTransitionChanged(0)
          setCurrentIndex(length + 1 - showItemsPerRow - slideby)
        }, 350)
      }
    }, [transitionChanged])

    const next = () => {
      if (transitionChanged === 0) {
        enableTransition()
      }
      if (currentIndex <= length - showItemsPerRow - slideby) {
        setCurrentIndex((prevState) => prevState + slideby)
      } else {
        setTransitionChanged((prev) => prev + 1)
      }
      console.log(currentIndex + slideby)
    }

    const prev = () => {
      if (transitionChanged === 0) {
        enableTransition()
      }
      if (currentIndex - slideby >= showItemsPerRow + 1) {
        setCurrentIndex((prevState) => (prevState - slideby) % length)
      } else {
        setTransitionChanged((prev) => prev - 1)
      }
      console.log(Math.abs(currentIndex - slideby))
    }

    useEffect(() => {
      let intervalId: NodeJS.Timeout
      if (autoplay) {
        intervalId = setInterval(() => {
          next()
        }, autoplayInterval)
      }
      return () => {
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    }, [next, autoplay, autoplayInterval])

    return (
      <div className={carouselContainerClassNames}>
        <div className="carousel-wrapper">
          {showIndicator && <button onClick={prev} className={clsx(leftIndicatorClassNames)}>
            &lt;
          </button>}
          <div
            className="carousel-content-wrapper bg-white"
          >
            <div
              ref={carousel_content}
              id="transition_div"
              className={`h-full carousel-content show-${showItemsPerRow} bg-red-700 flex flex-wrap flex-col justify-center items-center `} //h-{calc(100/${rows})%}
              style={{
                transform: `translateX(-${currentIndex * (100 / showItemsPerRow)}%)`,
              }}
            >
              {infinite_scrollable_children}
            </div>
          </div>
          {showIndicator && <button onClick={next} className={clsx(rightIndicatorClassNames)}>
            &gt;
          </button>}
        </div>
        {showPagination && (
          <div className={`carousel-dots-${paginationPosition}`}>
            {children.length &&
              children.map((_: any, index: number) => (
                <button
                  key={index}
                  className={index === activeDot ? clsx(paginationActiveClassNames) : clsx(PaginationClassNames)}
                  onClick={() => {
                    enableTransition()
                    console.log('clicked: ', index)
                    console.log('currentIndex: ', currentIndex - showItemsPerRow - 1)
                    setCurrentIndex(index + 1 + showItemsPerRow)
                  }}
                />
              ))}
          </div>
        )}
      </div>
    )
  },
)
