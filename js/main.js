//navbar white bg 
document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector(".navigation-wrap");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            nav.classList.add("scroll-on");
        } else {
            nav.classList.remove("scroll-on");
        }
    });

});


//nav hide
document.addEventListener("click", function (event) {

  const nav = document.querySelector(".navbar");
  const toggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.querySelector(".navbar-collapse");

  // if menu is open
  if (navCollapse.classList.contains("show")) {

    // click is NOT inside navbar and NOT the toggler button
    if (!nav.contains(event.target) && !toggler.contains(event.target)) {
      navCollapse.classList.remove("show");
    }
  }
});


// counter design
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration){
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if(current == end){
                    clearInterval(timer);
                }
            }, step);
    }

    counter("count1", 0, 1287, 3000);
    counter("count2", 100, 5786, 2500);
    counter("count3", 0, 1440, 3000);
    counter("count4", 0, 7110, 3000);
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Add to cart
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = count;
}

document.querySelectorAll("#explore-food .main-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const card = this.closest(".card");

    const name = card.querySelector("h4").innerText;
    const price = parseInt(card.querySelector("span").innerText.replace("₹", ""));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert("Added to cart 🛒");
  });
});

updateCartCount();

  



// Place Order
// function placeOrder() {
//   const email = localStorage.getItem("userEmail");

//   if (!email) {
//     alert("Please login first");
//     window.location.href = "login.html";
//     return;
//   }

//   // 🔥 ALWAYS GET FRESH CART
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   fetch("http://localhost:5000/order", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       items: cart,
//       total,
//     }),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       alert("Order placed!");
//       localStorage.removeItem("cart"); // 🔥 important
//     });
// }