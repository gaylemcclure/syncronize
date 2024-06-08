import React, { useEffect, useRef, useState } from "react";


const useElement = (options) => {
  const [onScreen, setOnScreen] = useState(false);
  const imageContainer = useRef(null);
  
//When the image first appears on the screen
  const handleAppear = (enters) => {
    console.log(enters)
    const [entry] = enters;
    if (entry.isIntersecting)
      setOnScreen(true);
  };

  //To repeat if user re-enters the screen
  const handleAppearRepeating = (enters) => {
    const [entry] = enters;
    setOnScreen(entry.isIntersecting);
  };

  //Callback function 
  const callBack = options.reappear ? handleAppearRepeating : handleAppear;

  useEffect(() => {
    const imageContainerCurrent = imageContainer.current

    //Using JS IntersectionObserver to show when element is in screen
    const observer = new IntersectionObserver(callBack, options);
    console.log(observer)
    if (imageContainerCurrent)
      observer.observe(imageContainerCurrent);

    return () => {
      if (imageContainerCurrent) {
        observer.unobserve(imageContainerCurrent);
      }
    };
  }, [imageContainer, options, callBack]);

  return [imageContainer, onScreen];
};


const ScrollAnimation = ({ children, reappear, threshold = 0.5 }) => {
  const [imageContainer, onScreen] = useElement({
    threshold: threshold,
    reappear: reappear,
  });

  console.log(onScreen)

  return (
    <>
      <div ref={imageContainer} className={`transition ${onScreen ? "translate-x-0 opacity-100 blur-none " : "opacity-0 blur-lg -translate-x-20"}  motion-reduce:transition-none motion-reduce:hover:transform-none`}>
        {children}
      </div>
    </>
  );
}



export default ScrollAnimation;