(()=>{
  // Forward a real learner selection to the host page's existing translator.
  // The host retains its translation, authentication, quota and card-saving logic.
  if(window.parent===window)return;
  let timer,lastText="",lastTime=0;
  function forward(){
    const selection=window.getSelection();
    const text=(selection?.toString()||"").trim();
    if(!text||text.length>240)return;
    const node=selection.anchorNode;
    const element=node?.nodeType===1?node:node?.parentElement;
    if(element?.closest("input,textarea,select,[contenteditable=true]"))return;
    const now=Date.now();
    if(text===lastText&&now-lastTime<700)return;
    let host,hostSelection;
    try{host=window.parent.document;hostSelection=window.parent.getSelection();}catch(_){return;}
    if(!window.parent.__translatorInit||!hostSelection||host.getElementById("cards-app"))return;
    const previous=[];
    for(let i=0;i<hostSelection.rangeCount;i++)previous.push(hostSelection.getRangeAt(i).cloneRange());
    const proxy=host.createElement("span");
    proxy.textContent=text;
    proxy.setAttribute("aria-hidden","true");
    proxy.style.cssText="position:fixed;left:-10000px;top:0;opacity:0;pointer-events:none;user-select:text;";
    host.body.appendChild(proxy);
    try{
      const range=host.createRange();range.selectNodeContents(proxy);
      hostSelection.removeAllRanges();hostSelection.addRange(range);
      proxy.dispatchEvent(new window.parent.MouseEvent("mouseup",{bubbles:true,view:window.parent}));
      lastText=text;lastTime=now;
    }finally{
      hostSelection.removeAllRanges();
      for(const range of previous)try{hostSelection.addRange(range);}catch(_){}
      proxy.remove();
    }
  }
  function schedule(){clearTimeout(timer);timer=setTimeout(forward,300);}
  document.addEventListener("mouseup",schedule);
  document.addEventListener("touchend",schedule,{passive:true});
  document.addEventListener("selectionchange",schedule);
})();