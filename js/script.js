const studentItem = document.getElementsByClassName("student-item");

// takes two arguments to determine which 10 students to display
showPage = (list, page) => {
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

// creates pagination buttons and adds an event listener to them
appendPageLinks = (list) => {
   // determines number of pages needed based on 10 students per page
   const numOfPages = Math.ceil(list.length / 10);
   const div = document.createElement("div");
   const ul = document.createElement("ul");
   const page = document.querySelector(".page");

   // adds pagination class name to new div and appends it to .page, then appends new ul to new div
   div.className = "pagination";
   page.appendChild(div);
   div.appendChild(ul);

   // creates pagination buttons when the list contains more than 10 students
   for (let i = 1; i <= numOfPages; i++) {
      if (numOfPages > 1) {
         const li = document.createElement("li");
         const a = document.createElement("a");

         a.textContent = i;
         ul.appendChild(li);
         li.appendChild(a);
      }
   }

   // sets active class on first pagination button
   document.querySelector("a").className = "active";

   // uses event bubbling to create a click event for the pagination buttons
   document.addEventListener("click", (e) => {
      // removes active class from previous a element and adds it to click target
      document.querySelector(".active").className = "";
      e.target.className = "active";
      // calls the show page function using list and number of clicked pagination button
      showPage(list, e.target.textContent);
   });
}

// calls functions on page load
showPage(studentItem, 1);
appendPageLinks(studentItem);
