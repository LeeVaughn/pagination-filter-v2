/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentItem = document.getElementsByClassName("student-item");


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
// takes two arguments to determine which 10 students to display
function showPage(list, page) {
   // creates a variable to simplify the if statement in the for loop
   const pageDisplay = page * 10;

   // loops through the students in the list argument
   for (let i = 0; i < list.length; i++) {
      // hides all of the students in the list
      list[i].style.display = "none";
      // displays the appropriate 10 students based on the page argument
      if (i >= pageDisplay - 10 && i <= pageDisplay -1) {
         list[i].style.display = "";
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
   // determines number of pages needed to display all students
   const numOfPages = Math.ceil(list.length / 10);
   // creates a div to contain pagination data
   const pagination = `
      <div class="pagination">
         <ul>
         </ul>
      </div>
   `
   // selects div with class name of page
   const page = document.querySelector(".page");
   page.appendChild(pagination);

}





// calls functions on page load
showPage(studentItem, 1);
appendPageLinks(studentItem);
