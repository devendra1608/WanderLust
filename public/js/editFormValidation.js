document.addEventListener("DOMContentLoaded" , () => {
  const form = document.getElementById("listingForm");
  if(!form) return;

  form.addEventListener("submit", function (e) {
    let isValid = true;
    isValid &= check("title","Title is required");
    isValid &= check("description","Description is required");
    isValid &= check("image","Image URL is required");
    isValid &= check("price","Price is required");
    isValid &= check("country","Country is required");
    isValid &= check("location","Location is required");

    if(!isValid){
      e.preventDefault();
    }
  });

  function check(id, message){
    const input = document.getElementById(id);
    const group = input.parentElement;
    const error = group.querySelector(".error-msg");

    if(!input.value.trim()){
      group.classList.add("error");
      error.textContent = message;
      return false;
    }

    group.classList.remove("error");
    error.textContent = "";
    return true;
  }

  document.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => {
      el.parentElement.classList.remove("error");
    });
  });
});