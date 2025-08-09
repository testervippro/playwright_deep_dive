const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.get("/form.html", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/", (_req, res) => {
  //https://qaexpertise.com/playwright/an-in-depth-understanding-of-getbyrole-in-playwright/?utm_source=chatgpt.com
  //const locator = page.locator('selector').nth(n)\
  // await page.locator('div.card').locator('button.submit').click();
  // https://playwright.dev/docs/api/class-locator#locator-all

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Locator Test</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/paginationjs/dist/pagination.css" />
    <style>
      body { font-family: sans-serif; padding: 20px; }
      div.role-box { margin-bottom: 8px; }
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider {
        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc; transition: .4s; border-radius: 24px;
      }
      .slider:before {
        position: absolute; content: ""; height: 18px; width: 18px;
        left: 4px; bottom: 3px; background-color: white;
        transition: .4s; border-radius: 50%;
      }
      input:checked + .slider { background-color: #2196F3; }
      input:checked + .slider:before { transform: translateX(26px); }
      #dragZone, #dropZone {
        width: 100px; height: 100px; text-align: center;
        line-height: 100px; margin-top: 10px;
      }
      #dragZone { background: #ccc; cursor: move; }
      #dropZone { background: #eee; }
    </style>
  </head>
  <body>
    <!-- getByRole -->
    <button role="button">Click Me</button>
    <label><input type="checkbox" /> Subscribe</label>

    <!-- Host Element -->
    <x-details role="button" aria-expanded="true" aria-controls="inner-details">
      <div>Title</div>
    </x-details>

    <script>
      class XDetails extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: 'open' });
          const content = document.createElement('div');
          content.id = 'inner-details';
          content.textContent = 'Details Shadow DOM';
          shadow.appendChild(content);
        }
      }
      customElements.define('x-details', XDetails);
    </script>

    <ul>
      <li><h3>Locator Filter Product 1</h3><button>Add to cart</button></li>
      <li><h3>Locator Product 2</h3><button>Add to cart</button></li>
    </ul>

    <label for="fruits">Dropdown List Choose a fruit:</label>
    <select id="fruits" name="fruits">
      <option value="apple">🍎 Apple</option>
      <option value="banana">🍌 Banana</option>
      <option value="cherry">🍒 Cherry</option>
      <option value="mango">🥭 Mango</option>
    </select>

    <br /><br />
    <label for="fruits">Data-testid  Choose a fruit:</label>
    <li data-testid='apple'>apple</li>
    <li data-testid='banana'>banana</li>
    <li data-testid='orange'>orange</li>

    <ul>
      <li><div>John</div><div><button>Say hello</button></div></li>
      <li><div>Mary</div><div><button>Say hello</button></div></li>
      <li><div>John</div><div><button>Say goodbye</button></div></li>
      <li><div>Mary</div><div><button>Say goodbye</button></div></li>
    </ul>

    <p>Hello World</p>
    <label for="username">Username:</label>
    <input id="username" name="username" type="text" />
    <input placeholder="Enter your email" />
    <img src="logo.png" alt="Company Logo" />
    <div title="Info tooltip">Hover over me</div>
    <div data-testid="login-button">Login</div>

    <!-- Date Picker -->
    <h2>Select a Date</h2>
    <input type="text" id="datepicker" placeholder="Choose date" />
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script>
      flatpickr("#datepicker", {
        dateFormat: "Y-m-d",
        minDate: "today",
        defaultDate: "today",
        onChange: function (selectedDates, dateStr) {
          alert("You selected: " + dateStr);
        }
      });
    </script>

    <!-- New UI Elements -->
    <h2>Extra Controls</h2>

    <!-- Color Picker -->
    <label for="colorPicker">Choose Color:</label>
    <input type="color" id="colorPicker" />

 <!-- Range Input -->
<label for="rangeInput">Volume: <span id="rangeValue">50</span></label>
<input type="range" id="rangeInput" min="0" max="100" value="50" />

<script>
  const rangeInput = document.getElementById("rangeInput");
  const rangeValue = document.getElementById("rangeValue");

  rangeInput.addEventListener("input", () => {
    rangeValue.textContent = rangeInput.value;
  });
</script>


    <!-- Radio Buttons -->
    <fieldset>
      <legend>Choose One:</legend>
      <label><input type="radio" name="option" value="1" /> Option 1</label>
      <label><input type="radio" name="option" value="2" /> Option 2</label>
    </fieldset>

    <!-- Toggle Switch -->
    <label class="switch">
      <input type="checkbox" id="toggleSwitch" />
      <span class="slider"></span>
    </label>

    <!-- Drag & Drop -->
    <h3>Drag and Drop</h3>
    <div id="dragZone" draggable="true">Drag me</div>
    <div id="dropZone">Drop here</div>

  <h2>📥 Download test.txt</h2>
  <button onclick="downloadTextFile()">Download test.txt</button>

  <h2>📤 Upload a .txt file</h2>
  <input type="file" id="fileInput" accept=".txt" />
  <pre id="fileContent" style="background:#f0f0f0; padding:10px;"></pre>

  <script>
    // DOWNLOAD
    function downloadTextFile() {
      const content = "This is the content of test.txt";
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "test.txt";
      a.click();

      URL.revokeObjectURL(url);
    }

    // UPLOAD
    document.getElementById("fileInput").addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("fileContent").textContent = e.target.result;
      };
      reader.readAsText(file);
    });
  </script>

  
   <h2>🌲 Tree Structured Checkboxes</h2>
  <ul>
    <li>
      <label><input type="checkbox" onchange="toggleChildren(this)"> Fruits</label>
      <ul>
        <li>
          <label><input type="checkbox" onchange="toggleChildren(this)"> Citrus</label>
          <ul>
            <li><label><input type="checkbox" onchange="toggleChildren(this)"> Orange</label></li>
            <li><label><input type="checkbox" onchange="toggleChildren(this)"> Lemon</label></li>
          </ul>
        </li>
        <li><label><input type="checkbox" onchange="toggleChildren(this)"> Banana</label></li>
        <li><label><input type="checkbox" onchange="toggleChildren(this)"> Mango</label></li>
      </ul>
    </li>
    <li>
      <label><input type="checkbox" onchange="toggleChildren(this)"> Vegetables</label>
      <ul>
        <li><label><input type="checkbox" onchange="toggleChildren(this)"> Carrot</label></li>
        <li>
          <label><input type="checkbox" onchange="toggleChildren(this)"> Leafy</label>
          <ul>
            <li><label><input type="checkbox" onchange="toggleChildren(this)"> Spinach</label></li>
            <li><label><input type="checkbox" onchange="toggleChildren(this)"> Kale</label></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <button onclick="showChecked()">Show Checked Items</button>
  <pre id="result" style="background:#eef; padding:10px;"></pre>

  <script>
    function toggleChildren(checkbox) {
      const li = checkbox.closest("li");
      if (!li) return;

      // Toggle all child checkboxes
      const children = li.querySelectorAll("input[type='checkbox']");
      children.forEach(child => {
        if (child !== checkbox) child.checked = checkbox.checked;
      });

      // Update parent checkboxes if needed
      updateParentState(checkbox);
    }

    function updateParentState(childCheckbox) {
      let parentLi = childCheckbox.closest("ul")?.closest("li");
      while (parentLi) {
        const parentCheckbox = parentLi.querySelector("input[type='checkbox']");
        const childCheckboxes = parentLi.querySelectorAll("ul > li input[type='checkbox']");
        const checked = Array.from(childCheckboxes).filter(cb => cb.checked).length;
        const all = childCheckboxes.length;

        if (checked === all) {
          parentCheckbox.checked = true;
          parentCheckbox.indeterminate = false;
        } else if (checked > 0) {
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = true;
        } else {
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = false;
        }

        parentLi = parentLi.closest("ul")?.closest("li");
      }
    }


  </script>

<h2>Employee Table</h2>

  <table id="employeeTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice Smith</td>
        <td>Engineer</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>Bob Johnson</td>
        <td>Manager</td>
        <td>Chicago</td>
      </tr>
      <tr>
        <td>Clara Evans</td>
        <td>Designer</td>
        <td>Los Angeles</td>
      </tr>
    </tbody>
  </table>

<br />
<br />



  <h1>Welcome</h1>
  <p>Click the link below to visit OpenAI:</p>

  <a href="https://www.openai.com" target="_blank">Visit OpenAI</a>



<br />
<br />

<!-- Input Field -->
  <label for="username1">Username:</label>
  <input type="text" id="username1" value="admin" />

  <!-- Alert Button -->
  <button id="showBtn">Show Username</button>

  <script>
    document.getElementById("showBtn").addEventListener("click", function () {
      const username = document.getElementById("username1").value;
      alert("Username: " + username);
    });
  </script>


  

    <!-- Pagination -->
    <h2>Item List with Pagination</h2>
    <ul id="item-list"></ul>
    <div id="pagination-container"></div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/paginationjs/dist/pagination.min.js"></script>
    <script>
      $(document).ready(function () {
        var data = Array.from({ length: 50 }, (_, i) => 'Item ' + (i + 1));
        $('#pagination-container').pagination({
          dataSource: data,
          pageSize: 5,
          callback: function (data) {
            $('#item-list').html(data.map(item => '<li>' + item + '</li>').join(''));
          }
        });

        // Drag and Drop
        const dragZone = document.getElementById("dragZone");
        const dropZone = document.getElementById("dropZone");
        dragZone.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", "dragged");
        });
        dropZone.addEventListener("dragover", (e) => e.preventDefault());
        dropZone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropZone.textContent = "Dropped!";
          dropZone.style.background = "#cfc";
        });
      });
    </script>
    <p>The form below is inside an iframe:</p>

  <iframe src="form.html" width="500" height="300" style="border: 1px solid #ccc;"></iframe>


<h1>Student Registration Form</h1>
  <form id="registrationForm">
    <label>First Name: <input type="text" id="firstName" required></label><br><br>
    <label>Last Name: <input type="text" id="lastName" required></label><br><br>
    <label>Email: <input type="email" id="email" required></label><br><br>

    <label>Gender:</label>
    <label><input type="radio" name="gender" value="Male"> Male</label>
    <label><input type="radio" name="gender" value="Female"> Female</label>
    <label><input type="radio" name="gender" value="Other"> Other</label><br><br>

    <label>Mobile: <input type="tel" id="mobile" maxlength="10" required></label><br><br>
    <label>Date of Birth: <input type="date" id="dob" required></label><br><br>

    <label>Subjects: <input type="text" id="subjects"></label><br><br>

    <label>Hobbies:</label>
    <label><input type="checkbox" value="Sports" class="hobby"> Sports</label>
    <label><input type="checkbox" value="Reading" class="hobby"> Reading</label>
    <label><input type="checkbox" value="Music" class="hobby"> Music</label><br><br>

    <label>Picture: <input type="file" id="picture"></label><br><br>

    <label>Current Address:</label><br>
    <textarea id="address" rows="3" cols="30"></textarea><br><br>

    <label>State: 
      <select id="state">
        <option value="">Select State</option>
        <option value="State A">State A</option>
        <option value="State B">State B</option>
      </select>
    </label><br><br>

    <label>City: 
      <select id="city">
        <option value="">Select City</option>
        <option value="City X">City X</option>
        <option value="City Y">City Y</option>
      </select>
    </label><br><br>

    <button type="submit">Submit</button>
  </form>

  <h2>Submitted Information:</h2>
  <pre id="output"></pre>

  <script>
    document.getElementById("registrationForm").addEventListener("submit", function (e) {
      e.preventDefault();

      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var email = document.getElementById("email").value;
      var gender = document.querySelector("input[name='gender']:checked");
      var mobile = document.getElementById("mobile").value;
      var dob = document.getElementById("dob").value;
      var subjects = document.getElementById("subjects").value;
      var hobbies = document.querySelectorAll(".hobby:checked");
      var picture = document.getElementById("picture").files[0];
      var address = document.getElementById("address").value;
      var state = document.getElementById("state").value;
      var city = document.getElementById("city").value;

      var hobbiesList = [];
      for (var i = 0; i < hobbies.length; i++) {
        hobbiesList.push(hobbies[i].value);
      }

      var output = "Name: " + firstName + " " + lastName + "\n";
      output += "Email: " + email + "\n";
      output += "Gender: " + (gender ? gender.value : "") + "\n";
      output += "Mobile: " + mobile + "\n";
      output += "Date of Birth: " + dob + "\n";
      output += "Subjects: " + subjects + "\n";
      output += "Hobbies: " + hobbiesList.join(", ") + "\n";
      output += "Picture: " + (picture ? picture.name : "None") + "\n";
      output += "Address: " + address + "\n";
      output += "State: " + state + "\n";
      output += "City: " + city + "\n";

      document.getElementById("output").textContent = output;
    });
  </script>
   
  

  </body>
  </html>
`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
