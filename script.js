// Open modal
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

// Close modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modal if user clicks outside
window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};
