window.onload = startTabs;

function startTabs() {

  let tabs = document.querySelector('.tabs');
  let tabBorder = document.querySelector('.tab-selected-border');
  let tabsScroll = document.querySelector('.tabs-container');

  let isDown = false;
  let isMoved = false;
  let isLeaved = false;
  let startX;
  let scrollLeft;

  for (let c = 0; c < tabs.children.length; c++) {

    tabs.children[c].addEventListener("click", (e) => {
      if (isMoved) {        
        isMoved = false;
        return;
      }

      for (let i = 0; i < tabs.children.length; i++) {
        if (tabs.children[i].classList.contains("tab-selected")) {
          tabs.children[i].classList.remove("tab-selected");
          break;
        }
      }

      let parentPos = tabs.getBoundingClientRect(),
        childPos = tabs.children[c].getBoundingClientRect(),
        relativePos = {};

      relativePos.top = childPos.top - parentPos.top,
        relativePos.right = childPos.right - parentPos.right,
        relativePos.bottom = childPos.bottom - parentPos.bottom,
        relativePos.left = childPos.left - parentPos.left;

      tabs.children[c].classList.add("tab-selected");
      tabBorder.style.width = tabs.children[c].offsetWidth + "px";
      tabBorder.style.left = relativePos.left + "px";
    });

    tabs.children[c].addEventListener("mouseleave", (e) => {

      if(isDown){
        isMoved = false;
        isLeaved = true;
      }

    });
  }

  tabsScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - tabsScroll.offsetLeft;
    scrollLeft = tabsScroll.scrollLeft;
  });

  tabsScroll.addEventListener('mouseleave', () => {
    isDown = false;
  });

  tabsScroll.addEventListener('mouseup', () => {
    isDown = false;

    if(isLeaved){
      isMoved = false;
      isLeaved = false;      
    }
  });

  tabsScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tabsScroll.offsetLeft;
    const walk = (x - startX) * 1; //scroll-speed
    tabsScroll.scrollLeft = scrollLeft - walk;
    isMoved = true;
  });
}