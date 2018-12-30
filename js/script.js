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
      // if click target is an a element do this
      if (e.target.nodeName === "A") {
         // removes active class from previous a element and adds it to click target
         document.querySelector(".active").className = "";
         e.target.className = "active";
         // calls the show page function using list and number of clicked pagination button
         showPage(list, e.target.textContent);
      }
   });
}

// creates and appends search elements
search = () => {
   const div = document.createElement("div");
   const input = document.createElement("input");
   const button = document.createElement("button");
   const pageHeader = document.querySelector(".page-header");
   
   div.className = "student-search";
   input.placeholder = "Search for students...";
   button.textContent = "Search";
   pageHeader.appendChild(div);
   div.appendChild(input);
   div.appendChild(button);

   // uses event bubbling to create a click event for the search button
   document.addEventListener("click", (e) => {
      // if click target is button element do this
      if (e.target.nodeName === "BUTTON") {
         const query = input.value.toLowerCase();
         // might not need this, creates nodeList vs HTML Collection
         // const studentItem = document.querySelectorAll(".student-item");
         const ul = document.createElement("ul");
         const page = document.querySelector(".page");
         let searchList;
         let match = false;

         ul.className = "search-list";
         page.appendChild(ul);

         for (let i = 0; i < studentItem.length; i++) {
            studentItem[i].style.display = "none";
         }

         const pagination = document.querySelectorAll(".pagination li");

         for (let i = 0; i < pagination.length; i++) {
            pagination[i].style.display = "none";
         }

         for (let i = 0; i < studentItem.length; i++) {
            if (studentItem[i].innerHTML.indexOf(query) !== -1) {
               match = true;

               studentItem[i].style.display = "block";
               ul.appendChild(studentItem[i]);
            }
         }

         // searchList = document.getElementsByClassName("search-list");
         searchList = document.querySelectorAll(".search-list li");
         console.log(searchList);
         console.log(searchList.length);

         if (match === true) {
            console.log("calling functions");
            showPage(searchList, 1);
            appendPageLinks(searchList);
         }
      }
   });
}

// calls functions on page load
showPage(studentItem, 1);
appendPageLinks(studentItem);
search();
