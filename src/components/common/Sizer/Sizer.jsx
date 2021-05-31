import { useState, useEffect } from 'react';

const Sizer = (props) => {
   const [size, setSize] = useState({
      height: document.body.clientHeight,
      width: document.body.clientWidth
   });

   useEffect(() => {
      const handleResize = () => {
         setSize({
            height: document.body.clientHeight,
            width: document.body.clientWidth
         })
      }
      window.addEventListener('resize', handleResize)
      return _ => {
         window.removeEventListener('resize', handleResize)
      }
   })
   return (
      <div>
         <h1>{size.width} x {size.height}</h1>
      </div>
   )
}

export default Sizer;

