    document.addEventListener('DOMContentLoaded', () => {
      let vanityBag = [];
      const GIFT_THRESHOLD = 120;

      const jgOverlay = document.getElementById('jgOverlay');
      const vanityDrawer = document.getElementById('vanityDrawer');
      const bagNavLink = document.querySelector('.bag-nav-link');
      const vanityItemsList = document.getElementById('vanityItemsList');
      const vanitySubtotal = document.getElementById('vanitySubtotal');
      const giftStatusText = document.getElementById('giftStatusText');
      const giftBarFill = document.getElementById('giftBarFill');

      function openVanity(e) {
        if (e) e.preventDefault();
        vanityDrawer.classList.add('open');
        jgOverlay.classList.add('open');
      }

      function closeVanity() {
        vanityDrawer.classList.remove('open');
        jgOverlay.classList.remove('open');
      }

      if (bagNavLink) bagNavLink.addEventListener('click', openVanity);
      document.getElementById('closeVanityBtn').addEventListener('click', closeVanity);
      jgOverlay.addEventListener('click', closeVanity);

      function renderVanityBag() {
        if (bagNavLink) {
          bagNavLink.textContent = `Vanity Bag (${vanityBag.length})`;
        }

        let subtotal = 0;
        vanityBag.forEach(item => {
          subtotal += item.price;
        });

        vanitySubtotal.textContent = `$${subtotal}`;

        // Update $120 Silk Travel Pouch Progress Bar
        const progressPct = Math.min((subtotal / GIFT_THRESHOLD) * 100, 100);
        giftBarFill.style.width = `${progressPct}%`;

        if (subtotal >= GIFT_THRESHOLD) {
          giftStatusText.innerHTML = 'Unlocked! <strong>Free Silk Travel Pouch</strong> added to your order';
        } else {
          const remaining = GIFT_THRESHOLD - subtotal;
          giftStatusText.innerHTML = `Add <strong>$${remaining}</strong> more for a Free Silk Travel Pouch`;
        }

        if (vanityBag.length === 0) {
          vanityItemsList.innerHTML = '<p style="color:#78625C; text-align:center; margin-top:2rem;">Your Glow With Jadex vanity bag is currently empty.</p>';
          return;
        }

        vanityItemsList.innerHTML = vanityBag.map((item, index) => `
          <div class="vanity-item">
            <div>
              <div class="vanity-item-name">${item.name}</div>
              <div class="vanity-item-price">$${item.price}</div>
            </div>
            <button class="jg-remove-btn" onclick="removeVanityItem(${index})">Remove</button>
          </div>
        `).join('');
      }

      window.removeVanityItem = function(index) {
        vanityBag.splice(index, 1);
        renderVanityBag();
      };

      document.querySelectorAll('.add-bag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = btn.getAttribute('data-name');
          const price = parseInt(btn.getAttribute('data-price'), 10);

          vanityBag.push({ name, price });
          renderVanityBag();

          const originalText = btn.textContent;
          btn.textContent = 'Added to Vanity ✓';
          btn.style.backgroundColor = '#B07D62';
          btn.style.color = '#FFFFFF';
          btn.style.borderColor = '#B07D62';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 950);
        });
      });

      document.getElementById('jgCheckoutBtn').addEventListener('click', () => {
        if (vanityBag.length === 0) {
          alert('Add a skincare bestseller to your Vanity Bag first!');
          return;
        }
        alert('Thank you for glowing with GLOW WITH JADEX!');
        vanityBag = [];
        renderVanityBag();
        closeVanity();
      });
    });