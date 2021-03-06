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
      if (i >= pageDisplay - 10 && i <= pageDisplay - 1) {
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
   let buttons;

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

         // adds active class to first a element
         document.querySelector("a").className = "active";
      }
   }

   buttons = document.querySelectorAll("a");
   
   // loops over pagination buttons and adds event listener
   for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", (e) => {
         // removes active class from other buttons and adds it to click target
         document.querySelector(".active").className = "";
         e.target.className = "active";

         // calls the show page function using list and number of clicked pagination button
         showPage(list, e.target.textContent);
      });
   }
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

   // creates a click event for the search button
   document.querySelector("button").addEventListener("click", () => {
      const query = input.value.toLowerCase();
      const pagination = document.querySelector(".pagination");
      const ul = document.createElement("ul");
      const page = document.querySelector(".page");
      let searchList;
      let match = false;

      ul.className = "search-list";
      page.appendChild(ul);

      // hides any existing student lists
      for (let i = 0; i < studentItem.length; i++) {
         studentItem[i].style.display = "none";
      }

      // removes any previous pagination if it exists
      if (pagination) {
         pagination.remove();
      }

      // loops over default student list to check for students that contain query term
      for (let i = 0; i < studentItem.length; i++) {
         studentItem[i].style.display = "none";
         if (studentItem[i].innerHTML.indexOf(query) !== -1) {
            match = true;

            // studentItem[i].style.display = "none";
            ul.appendChild(studentItem[i]);
         }
      }

      searchList = document.querySelectorAll(".search-list li");

      // if search field is empty string, reload original page
      // else if search contains a match call funcions with searchList
      // else if search contains no match display message to that effect
      if (query === "") {
         location.reload();
      } else if (match === true) {
         showPage(searchList, 1);
         appendPageLinks(searchList);
      } else if (match === false) {
         const div = document.createElement("div");
         const p = document.createElement("p")

         p.textContent = "Sorry, no students were found matching that search criteria."
         page.appendChild(div);
         div.appendChild(p);
      }
   });
}

// calls functions on page load
showPage(studentItem, 1);
appendPageLinks(studentItem);
search();
