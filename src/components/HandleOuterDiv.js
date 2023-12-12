import { useEffect } from 'react';

export function handleOuterDiv(offset) {
  useEffect(() => {
    let div = document.getElementsByClassName('outer')[0];
    let divP = div.childNodes[0];
    divP.style = '';
    let viewportBottom = document.documentElement.clientHeight;
    let diff = viewportBottom - div.getBoundingClientRect().top;
    // console.log("B1:", viewportBottom)
    // console.log("B2:", div.getBoundingClientRect().top)
    if (diff < offset) {
      divP.style = 'display: hidden; margin: 0;';
    } else {
      let height = 'height: calc(' + diff.toString() + 'px + 10vw)';
      let str = 'flex-grow: 1; ' + height;
      divP.style = str;
    }
  });
}
