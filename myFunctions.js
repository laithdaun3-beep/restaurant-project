function toggleDetails(id) {
  $("#" + id).toggle();
}

function showForm() {

  let selected = $(".meal-check:checked").length;

  if (selected === 0) {
    alert("Please select at least one meal");
    return;
  }

  $("#orderForm").show();
}

function submitOrder() {

  if ($(".meal-check:checked").length === 0) {
    alert("Please select at least one meal!");
    return;
  }

  let name = $("#name").val();
  let nid = $("#nid").val();
  let birth = $("#birth").val();
  let mobile = $("#mobile").val();
  let email = $("#email").val();

let nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
if (name !== "" && !nameRegex.test(name)) {
  alert("Invalid name (letters only)");
  return;
}

if (nid === "") {
  alert("National ID is required");
  return;
}

if (nid.length !== 11 || isNaN(nid)) {
  alert("National ID must be 11 digits");
  return;
}

let cityCode = parseInt(nid.substring(0, 2));
if (cityCode < 1 || cityCode > 14) {
  alert("Invalid governorate code");
  return;
}

if (birth !== "") {
}

let mobileRegex = /^(093|094|095|096)\d{7}$/;
if (mobile !== "" && !mobileRegex.test(mobile)) {
  alert("Invalid mobile number");
  return;
}

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (email !== "" && !emailRegex.test(email)) {
  alert("Invalid email");
  return;
}

  let selectedMeals = [];
  let total = 0;

  $(".meal-check:checked").each(function () {
    let nameMeal = $(this).closest("tr").find("td:nth-child(3)").text();
    let price = parseInt($(this).data("price"));

    selectedMeals.push(nameMeal);
    total += price;
  });

  let finalTotal = total + (total * 0.05);

  let win = window.open("", "", "width=500,height=500");

win.document.write(`
  <html>
  <head>
    <title>Order Summary</title>
    <style>
      body {
        font-family: Arial;
        background-color: #f4f6f8;
        text-align: center;
        padding: 20px;
        color: #2c3e50;
      }

      h2 {
        color: #1f2d3d;
      }

      .meal {
        background: white;
        margin: 10px auto;
        padding: 10px;
        width: 70%;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      }

      .total {
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #007a99;
      }
    </style>
  </head>

  <body>

    <h2>Selected Meals</h2>
`);

selectedMeals.forEach(meal => {
  win.document.write(`<div class="meal">${meal}</div>`);
});

win.document.write(`
    <div class="total">Total: ${total}</div>
    <div class="total">With Tax (5%): ${finalTotal}</div>
  </body>
  </html>
`);
}