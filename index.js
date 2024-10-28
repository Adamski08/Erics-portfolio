       // It's a literal object for header nav setting
       const HeaderElems = (function() {
        let instance;
        let bHeaderElems = [
            ["#b-header", "Home"],
            ["#b-about", "About me"],
            ["#b-skills", "Skills"],
            ["#b-experience", "Experience"],
            ["#b-projects", "Projects"],
            ["#b-contact", "Contact"]

        ]
        let bHeaderNavItems = document.getElementsByClassName("b-header__item-items")[0];
        let bHeaderResponsiveNavItems  = document.getElementsByClassName("b-header__item-items_responsive")[0];
        let bHeaderElemsSize = bHeaderElems.length;
        
        function createInstance() {
            if (!instance) {
                instance = {
                    bHeaderElems: bHeaderElems,
                    bHeaderNavItems: bHeaderNavItems,
                    bHeaderElemsSize: bHeaderElemsSize,
                };
            }
            return instance;

        }
        function changeConfig(key, value) {
            instance[key] = value;
        }

        function navItemsRemoveHTML() {
            bHeaderNavItems.innerHTML = "";
        }

        function responsiveNavItemsRemoveHTML() {
            bHeaderResponsiveNavItems.innerHTML = "";
        }

        function checkWindowWidthSM() {
            return window.innerWidth < 576;
        }

        function createNavItems() {
            for (let i=0; i < bHeaderElemsSize; i++) {
                let aElem = document.createElement("a");
                aElem.setAttribute("class", "b-header__nav-item");
                aElem.setAttribute("href", bHeaderElems[i][0]);
                aElem.textContent = bHeaderElems[i][1];
                bHeaderNavItems.appendChild(aElem);
            }
        }

        function createNavItemsResponsive() {
            for (let i=0; i < bHeaderElemsSize; i++) {
                let aElem = document.createElement("a");
                aElem.setAttribute("class", "b-header__nav-item .b-header__item_responsive");
                aElem.setAttribute("href", bHeaderElems[i][0]);
                aElem.textContent = bHeaderElems[i][1];
                bHeaderResponsiveNavItems.appendChild(aElem);
            }
        }

        function createBarElement() {
            let barEl = document.createElement("div");
            barEl.state = {
                isClicked: false,
            }

            barEl.classList = "fa-solid fa-bars fa-2x";
            bHeaderNavItems.appendChild(barEl);
            bHeaderNavItems.appendChild(bHeaderResponsiveNavItems);
            responsiveNavItemsRemoveHTML();
            createNavItemsResponsive();
            barEl.addEventListener("click", function () {  
                barEl.state.isClicked = !barEl.state.isClicked;
                bHeaderResponsiveNavItems.style.display = barEl.state.isClicked ? "flex" : "none";
            })
        }


        return {
            createInstance: createInstance,
            changeConfig: changeConfig,
            navItemsRemoveHTML: navItemsRemoveHTML,
            checkWindowWidthSM: checkWindowWidthSM,
            createNavItems: createNavItems,
            createBarElement: createBarElement
        }
     })();

    
    function initializeHeaderElems() {
        let headerInstance = HeaderElems.createInstance();
        return headerInstance;
    }

    window.addEventListener("load", function () {
        const instanceHeaderElems = initializeHeaderElems();
             
        if (!HeaderElems.checkWindowWidthSM()) {
            HeaderElems.navItemsRemoveHTML();
            HeaderElems.createNavItems();
            
        } else {
            HeaderElems.navItemsRemoveHTML();
            HeaderElems.createBarElement();
            
        }
        
        window.addEventListener("resize", function (e) {
            const instanceHeaderElems = initializeHeaderElems();
            
            
            if (!HeaderElems.checkWindowWidthSM()) {
                HeaderElems.navItemsRemoveHTML();
                HeaderElems.createNavItems();
                
            } else {
                HeaderElems.navItemsRemoveHTML();
                HeaderElems.createBarElement();
                
            }
        });
    }); 