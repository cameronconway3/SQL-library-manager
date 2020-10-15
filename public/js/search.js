
// const bookRow = document.querySelectorAll(".bookRow");
// const prevButton = document.querySelector('.prev');
// const nextButton = document.querySelector('.next');

// let booksPerPage = 5;
// let pageLimit = Math.ceil(bookRow.length/booksPerPage);
// let currentPage = 1;

// // Put all the rows into an array
// let rows = [];
// for(let i = 0; i < bookRow.length; i++) {
//     rows.push(bookRow[i])
//     bookRow[i].style.display = 'none'
// }

// function paginationLogic(currentPage, booksPerPage, itemsToShow) {

//     let upperValue = currentPage * booksPerPage;
//     let lowerValue = (upperValue) - booksPerPage;
//     // console.log("Current Page - " + currentPage)
//     // console.log("Lower - " +lowerValue)
//     // console.log("Upper - " + upperValue)
//     if(currentPage == pageLimit) {
//         let leftToShow = (itemsToShow.length - lowerValue)
//         return itemsToShow.slice(lowerValue, (lowerValue + leftToShow));
//     } else {
//         return itemsToShow.slice(lowerValue, upperValue);
//     }
// }

// // On Load
// for(let i = 0; i < booksPerPage; i++) {
//     paginationLogic(currentPage, booksPerPage, rows)[i].style.display = 'block';
// }
// prevButton.style.display = "none"


// prevButton.addEventListener('click', () => {

//     let prevRows = [];

//     for(let i = 0; i < bookRow.length; i++) {
//         prevRows.push(rows[i])
//         bookRow[i].style.display = 'none'
//     }
//     currentPage--;

//     if(currentPage !== 1) {
//         prevButton.style.display = "block"
//         nextButton.style.display = "block"
//         for(let i = 0; i < booksPerPage; i++) {
//             paginationLogic(currentPage, booksPerPage, prevRows)[i].style.display = 'block';
//         }
//     } else {
//         for(let i = 0; i < booksPerPage; i++) {
//             paginationLogic(currentPage, booksPerPage, prevRows)[i].style.display = 'block';
//         }
//         prevButton.style.display = "none"
//         nextButton.style.display = "block"
//     }
//     console.log('Current Page: ' + currentPage);
//     console.log('Page Limit: ' + pageLimit);
// })


// nextButton.addEventListener('click', () => {

//     let nextRows = [];

//     // Hide all rows
//     for(let i = 0; i < bookRow.length; i++) {
//         nextRows.push(bookRow[i])
//         bookRow[i].style.display = 'none'
//     }
//     currentPage++;

//     if(currentPage < pageLimit) {

//         prevButton.style.display = "block"
//         nextButton.style.display = "block"
//         for(let i = 0; i < booksPerPage; i++) {
//             paginationLogic(currentPage, booksPerPage, nextRows)[i].style.display = 'block';
//         }
//     } else {
//         for(let i = 0; i < booksPerPage; i++) {
//             paginationLogic(currentPage, booksPerPage, nextRows)[i].style.display = 'block';
//         }
//         nextButton.style.display = "none"
//         prevButton.style.display = "block"
//     }
//     console.log('Current Page: ' + currentPage);
//     console.log('Page Limit: ' + pageLimit);
// })



