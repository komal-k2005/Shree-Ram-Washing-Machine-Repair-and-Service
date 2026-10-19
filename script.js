/**
 * Shree Ram Enterprises - Appliance Repair & Services
 * Interactive Client-Side Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic'
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        } else {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        }
      }
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Sticky Navbar Styling on Scroll
  const mainNav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNav?.classList.add('shadow-lg', 'bg-slate-900/95');
      mainNav?.classList.remove('bg-slate-900/85');
    } else {
      mainNav?.classList.remove('shadow-lg', 'bg-slate-900/95');
      mainNav?.classList.add('bg-slate-900/85');
    }
  });

  // 4. Interactive WhatsApp Booking State
  const bookingState = {
    appliance: 'Washing Machine',
    slot: 'Morning (8:30 AM – 12:00 PM)',
    name: '',
    phone: '',
    address: '',
    issue: ''
  };

  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const addressInput = document.getElementById('cust-address');
  const issueInput = document.getElementById('cust-issue');
  const previewBox = document.getElementById('whatsapp-preview-text');
  const submitBtn = document.getElementById('submit-whatsapp-btn');
  const applianceChips = document.querySelectorAll('.chip-btn');
  const slotButtons = document.querySelectorAll('.slot-btn');

  // Format and update preview message
  function updateWhatsAppPreview() {
    const name = nameInput?.value.trim() || '[Your Name]';
    const phone = phoneInput?.value.trim() || '[Your Phone]';
    const address = addressInput?.value.trim() || '[Your Pune Address / Landmark]';
    const issue = issueInput?.value.trim() || 'General service & inspection';

    const formattedMessage = 
`*New Service Request - Shree Ram Enterprises*
----------------------------------------
*Customer Name:* ${name}
*Contact Number:* ${phone}
*Appliance Type:* ${bookingState.appliance}
*Preferred Time:* ${bookingState.slot}
*Service Address:* ${address}
*Issue Description:* ${issue}
----------------------------------------
Please confirm the technician arrival time (60-90 Mins). Thank you!`;

    if (previewBox) {
      previewBox.innerText = formattedMessage;
    }

    if (submitBtn) {
      const waUrl = `https://wa.me/919604064825?text=${encodeURIComponent(formattedMessage)}`;
      submitBtn.setAttribute('href', waUrl);
    }
  }

  // Appliance Chip Selection
  applianceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      applianceChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      bookingState.appliance = chip.getAttribute('data-appliance') || 'Washing Machine';
      updateWhatsAppPreview();
    });
  });

  // Slot Button Selection
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookingState.slot = btn.getAttribute('data-slot') || 'Morning (8:30 AM – 12:00 PM)';
      updateWhatsAppPreview();
    });
  });

  // Input Event Listeners
  nameInput?.addEventListener('input', updateWhatsAppPreview);
  phoneInput?.addEventListener('input', updateWhatsAppPreview);
  addressInput?.addEventListener('input', updateWhatsAppPreview);
  issueInput?.addEventListener('input', updateWhatsAppPreview);

  // Initial WhatsApp Preview Rendering
  updateWhatsAppPreview();

  // 5. Pre-select Appliance from Service Cards
  window.selectApplianceAndScroll = function(applianceName) {
    const targetChip = Array.from(applianceChips).find(
      chip => chip.getAttribute('data-appliance')?.toLowerCase() === applianceName.toLowerCase()
    );
    if (targetChip) {
      applianceChips.forEach(c => c.classList.remove('active'));
      targetChip.classList.add('active');
      bookingState.appliance = targetChip.getAttribute('data-appliance') || applianceName;
      updateWhatsAppPreview();
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6. Pre-select Area Tag Pills
  const areaPills = document.querySelectorAll('.area-pill');
  areaPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const areaName = pill.getAttribute('data-area') || pill.innerText.trim();
      if (addressInput) {
        addressInput.value = `${areaName}, Pune`;
        updateWhatsAppPreview();
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
      addressInput?.focus();
    });
  });

  // 7. Commercial FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
