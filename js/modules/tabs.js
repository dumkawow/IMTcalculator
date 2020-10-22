 // tabs

 function tabs(tabsSelector, tabsContent, tabsParentSelector, activeClass) {

      const getTabs = document.querySelector(tabsParentSelector), //tabsParent
      tabs = document.querySelectorAll(tabsContent), // tabsContent
      tabsMenu = document.querySelectorAll(tabsSelector); // tabs

   function hideTab() {
      tabs.forEach(item => {
         item.style.display = 'none';
      });

      tabsMenu.forEach(item => {
         item.classList.remove(activeClass);
      });
   }
   hideTab();

   function showTab(i = 0) {
      tabs[i].style.display = '';
      tabsMenu[i].classList.add(activeClass);
   }
   showTab();  

   getTabs.addEventListener('click', (e) => {
      if(e.target && e.target.classList.contains(tabsSelector.slice(1))) {
         tabsMenu.forEach((item, i) => {
            if(e.target == item) {
                  hideTab();
                  showTab(i);
            }
         });
      }
   });
 }

 export default tabs;