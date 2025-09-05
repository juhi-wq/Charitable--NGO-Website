// Counter animation
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.dataset.target;
      const current = +counter.innerText.replace(/,/g, '');
      const increment = Math.ceil(target / 200);
      if(current < target){
        counter.innerText = (current + increment).toLocaleString('en-IN');
        setTimeout(update, 12);
      } else {
        counter.innerText = target.toLocaleString('en-IN');
      }
    };
    update();
  });

  // Donate modal payment method toggle
  const payMethod = document.getElementById('payMethod');
  const upiBox = document.getElementById('upiBox');
  const cardBox = document.getElementById('cardBox');
  if(payMethod){
    payMethod.addEventListener('change', (e)=>{
      upiBox.classList.toggle('d-none', e.target.value !== 'upi');
      cardBox.classList.toggle('d-none', e.target.value !== 'card');
    });
  }

  // Donate form (mock)
  const donateForm = document.getElementById('donateForm');
  if(donateForm){
    donateForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('donorName').value.trim();
      const email = document.getElementById('donorEmail').value.trim();
      const amount = document.getElementById('donorAmount').value;
      if(!name || !email || !amount || amount <= 0){
        alert('Please fill valid donation details.');
        return;
      }
      // Mock payment flow: show success, update counters (local)
      const modalEl = document.getElementById('donateModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if(modal) modal.hide();

      // transient success toast (native)
      alert(`Thank you ${name}! Your donation of ₹${amount} is received (demo).`);

      // optional: increase Meals Delivered counter roughly by amount*2 (demo)
      const mealsCounter = document.querySelector('[data-target="1200000"]');
      if(mealsCounter){
        const current = Number(mealsCounter.innerText.replace(/,/g,'')) || 1200000;
        const newTarget = current + Math.floor(amount * 2);
        mealsCounter.dataset.target = newTarget;
        // re-run counter quick update
        (function updateNow(){
          const target = +mealsCounter.dataset.target;
          const cur = +mealsCounter.innerText.replace(/,/g,'');
          if(cur < target){
            const inc = Math.ceil((target - cur) / 30);
            mealsCounter.innerText = (cur + inc).toLocaleString('en-IN');
            setTimeout(updateNow, 30);
          } else {
            mealsCounter.innerText = target.toLocaleString('en-IN');
          }
        })();
      }

      donateForm.reset();
    });
  }

  // Contact form simple handler
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you! Your message has been sent (demo).');
      contactForm.reset();
    });
  }
});

// HERO Slideshow
const slides = document.querySelectorAll(".hero-slides img");
let current = 0;

function changeSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(changeSlide, 3000); // change every 2 sec
