window.alert ("Read the instructions as needed. By EliteCronax")

//  ______ _ _ _        _____                            
// |  ____| (_) |      / ____|                           
// | |__  | |_| |_ ___| |     _ __ ___  _ __   __ ___  __
// |  __| | | | __/ _ \ |    | '__/ _ \| '_ \ / _` \ \/ /
// | |____| | | ||  __/ |____| | | (_) | | | | (_| |>  < 
// |______|_|_|\__\___|\_____|_|  \___/|_| |_|\__,_/_/\_\
//                                                       
                                                       

// PLEASE BE SURE TO NOT GO BELOW 50 IN THE "const" MIN/MAX COMMAND!!1!
// Note: the lower the number, the higher the WPM.

const minDelay = 60; // Over here, 60 is the best as it works fine and doesn't crash the website
const maxDelay = 60; 



const keyOverrides = {
  [String.fromCharCode(160)]: ' '    // convert hardspace to normal space
};

function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els
    .map(el => {
      // get letter to type from each letter DOM element
      if (el.firstChild?.classList?.contains('_enter')) {
        // special case: ENTER
        return '\n';
      }
      let text = el.textContent[0];
      return text;
    })
    .map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c); // convert special characters
  return chrs;
}

function recordKey(chr) {
  // send it straight to the internal API
  window.core.record_keydown_time(chr);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function autoPlay(finish) {
  const chrs = getTargetCharacters();
  for (let i = 0; i < chrs.length - (!finish); ++i) {
    const c = chrs[i];
    recordKey(c);
    //console.log(c, c.charCodeAt());
    await sleep(Math.random() * (maxDelay - minDelay) + minDelay);
  }
}

autoPlay(true);