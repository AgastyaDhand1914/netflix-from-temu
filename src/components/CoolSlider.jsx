import React, { useEffect, useRef, useState } from 'react';
import ListItem from './ListItem';
import './coolslider.css';

function CoolSlider({ titles }) {
  const leftSidelinedRef = useRef(null);
  const rightSidelinedRef = useRef(null);

  const [Index, SetIndex] = useState(0);

  useEffect(() => {
    const left_Sidelined = leftSidelinedRef.current;
    const right_Sidelined = rightSidelinedRef.current;

    if (left_Sidelined && right_Sidelined) {
      left_Sidelined.style.transform = 'translateX(220px) scale(0.8)';
      right_Sidelined.style.transform = 'translateX(-220px) scale(0.8)';
    }
  }, [Index]);

  const NextSlideClick = () => {
    const Index_temp = (Index + 1) % titles.length;
    SetIndex(Index_temp);
  };

  const PrevSlideClick = () => {
    const Index_temp = Index <= 0 ? titles.length - 1 : (Index - 1) % titles.length;
    SetIndex(Index_temp);
  };

  return (
    <div id="main-slider-cont">
      <div id="main-prev" onClick={PrevSlideClick}>↶</div>
      <div id="slider-details-cont">
        <div id="left-sidelined" className="sidelined" ref={leftSidelinedRef}>
          {titles && (
            <ListItem title={titles[Index === 0 ? titles.length - 1 : Index - 1]} />
          )}
        </div>
        <div id="main-slider-detail">
          {titles && <ListItem title={titles[Index]} />}
        </div>
        <div id="right-sidelined" className="sidelined" ref={rightSidelinedRef}>
          {titles && (
            <ListItem title={titles[Index === titles.length - 1 ? 0 : Index + 1]} />
          )}
        </div>
      </div>
      <div id="main-next" onClick={NextSlideClick}>↷</div>
    </div>
  );
}

export default CoolSlider;