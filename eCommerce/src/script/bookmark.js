export let bookmarkList = [];
const resultsPerPage = 5;

class bookmark {
    _divOverlay = document.querySelector('.bookmark__overlay');
    _list = document.querySelector('.bookmark__list');
    _panagationDiv = document.querySelector('.panagation__buttons');
    _openBtn = document.querySelector('.bookmarks');
    _closeBtn = document.querySelector('.close__bokmark');

    constructor(){
       [this._openBtn, this._closeBtn].forEach(btn=>btn.addEventListener('click', this._toggleDIV.bind(this)));

       const thisClass = this;

       this._panagationDiv.addEventListener('click', function(e){
        const btn = e.target.closest('.panagation__book__btn');
        if(!btn) return;

        const goto = +btn.dataset.goto; // page

        thisClass._insertInBookmarkDOM(goto);

       });
    }

    _enableBookmark(fn){
        this._buttons = document.querySelectorAll('.bookmark__btn');

        this._buttons.forEach(btn=>btn.addEventListener('click', fn));
    }

    _setLocalStorage(){
        localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
    }

    _getLocalStorage(){
        const bookmark = localStorage.getItem('bookmark');
        bookmark ? bookmarkList = JSON.parse(bookmark) : '';
    }

    _generateBookmarkHTML(product){
        return `
        <li data-inlist="${product.id}">
        <img src="${product.image}" alt="">
        <div class="bookmark__desc">
            <div class="left">
                <h4 class="bookmark__title">${product.title}</h4>
                <p class="bookmark__price">${product.price} $</p>
            </div>
            <button class="unbookmark__btn" data-unbookmark="${product.id}"><i class="fa-solid fa-bookmark"></i></button>
        </div>
    </li>
        `
    }

    _unbookmarkBTN(){
        this._unbookmarkBtns = document.querySelectorAll('.unbookmark__btn');
        this._unbookmarkBtns.forEach(btn=>btn.addEventListener('click', this._removeFromBookmarkList.bind(this)));
    }

    _removeFromBookmarkList(e){
        const btn = e.target.closest('.unbookmark__btn');
        const bookmarkProductID = +btn.dataset.unbookmark;
        const div = document.querySelector(`[data-inlist="${bookmarkProductID}"]`);



        const indexOf = bookmarkList.findIndex(product=>product.id===bookmarkProductID);

        bookmarkList.splice(indexOf, 1);

        div.remove();

        this._setLocalStorage();

        this._insertInBookmarkDOM();

        document.querySelector(`[data-bookmark="${bookmarkProductID}"]`).innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    }

    getBookmarkList(page){
        const firstIndex = (page-1) *  resultsPerPage;
        const lastIndex = page*resultsPerPage;

        return bookmarkList.slice(firstIndex, lastIndex);
    }


    _generatePanigationBookmark(page){
        const numOfPages = Math.ceil(bookmarkList.length/resultsPerPage); 

        console.log(typeof page, typeof numOfPages);


        if(page===1 & numOfPages>1){
            return `
            <button class="panagation__bookmark__right panagation__book__btn" data-goto="${page+1}"><i class="fa-solid fa-right-long"></i>${page+1}</button>
            `
        }

        if(page<numOfPages){
            return `
            <button class="panagation__bookmark__left panagation__book__btn" data-goto="${page-1}"><i class="fa-solid fa-left-long"></i>${page-1}</button>
            <button class="panagation__bookmark__right panagation__book__btn" data-goto="${page+1}"><i class="fa-solid fa-right-long"></i>${page+1}</button>
            `
        }

        if(page===numOfPages && numOfPages>1){
            return `
            <button class="panagation__bookmark__left panagation__book__btn" data-goto="${page-1}"><i class="fa-solid fa-left-long"></i>${page-1}</button>
            `
        }

        return '';
    }

    _clearList(){
        this._list.innerHTML = '';
    }


    _insertInBookmarkDOM(page=1){

        this._clearList();

        const bookmarkProducts =  this.getBookmarkList(page);

        if(bookmarkProducts.length===0){
            this._list.innerHTML = 'Empty!';
        } else {
            bookmarkProducts.forEach(bookmark=>{
                const html = this._generateBookmarkHTML(bookmark);
    
                this._list.insertAdjacentHTML('afterbegin', html);
            });
        }
   
        // Create panagation navigation from number of products
        this._panagationDiv.innerHTML = this._generatePanigationBookmark(page);

        // enable unbookmark
        this._unbookmarkBTN();
    };

    _toggleDIV(){
        this._divOverlay.classList.toggle('transform');
    }
}


export default new bookmark();
