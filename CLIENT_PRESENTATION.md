# Client Presentation: Serviced Offices in London

**Prepared for:** innateaiconsulting.com  
**Project:** Next.js frontend replacement for legacy .NET CMS  
**Page:** Serviced Offices in London (listing + filtering)

---

## What we built

A single, fast, and professional webpage that helps your visitors find the right office space in London.  
The page displays **12 real office listings** (from your data) and lets users **filter** by:

- Area (e.g., Bloomsbury, Shoreditch, Canary Wharf)
- Office type (Serviced Office, Coworking, Managed Office)
- Minimum number of desks
- Monthly budget per desk (with option to include “POA” listings)

Each office **card** shows the key information a business needs to make a decision:

- Office name and exact location (area + borough)
- Type of space, total desks, price per desk (or POA)
- Key amenities (first 3 listed)
- Availability date and full address
- Advisor name and phone number – **direct call to action**

---

## Why this helps your business

| Business goal | How the page delivers |
|---------------|----------------------|
| Convert visitors into enquiries | Clear “Call [advisor]” button on every card + a **mid‑page conversion block** encouraging users to speak to an expert |
| Perform well in search (SEO) | Next.js with server rendering, semantic HTML, fast loading images (when added), and structured data ready |
| Show professionalism | Clean, responsive design matching the polish of **knightfrank.co.uk/office-space** and **freeofficefinder.com** |
| Reduce friction | Instant filtering – no page reloads. Visitors can narrow down options in seconds |

---

## Highlights of the design

- **Hero header** – large headline and short intro, branded gradient background.
- **Featured offices** – three listings (Bloomsbury Hub, Canary Wharf Tower Suite, Kings Cross Innovation Hub) are **visually highlighted** with a gold border and a “⭐ Featured” badge. This draws attention to your most premium or high‑margin spaces.
- **Expandable FAQ** – four common questions about serviced offices in London. Saves your team time and builds trust.
- **Mobile friendly** – the layout works perfectly on phones, tablets, and desktops.

---

## What about images?

Your JSON includes `image_url` fields, but no actual images were provided.  
**Decision:** Rather than showing broken images or relying on unreliable external placeholders, each card uses a **clean gradient placeholder** with the office name and area.  

This approach:
- Looks modern and intentional (similar to WeWork or Spaces)
- Loads instantly, no network requests
- Keeps the page visually consistent and professional

If you supply real office photos later, they can be swapped in within minutes.

---

## Technical summary (for your internal team)

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components (Card, Select, Slider, Accordion, Button, Input)
- **Filtering:** Client‑side, real‑time – no backend required
- **Deployment ready:** Works on Vercel, Netlify, or any Node.js hosting

---

## Next steps (if you wish to continue)

1. **Add your own office images** – place them in `/public/images/` and update `image_url` in the JSON.
2. **Connect the “Call” buttons** – they currently show advisor phone numbers; you can link them to a CRM or dialer.
3. **Deploy live** – one‑click deploy to Vercel from the GitHub repository.
4. **Add analytics** – track which filters and offices get the most interest.

---

## Time & quality

This page was built in approximately **75 minutes** with a focus on:
- Accurate filtering logic
- Polished, responsive UI
- Clear communication of value to the visitor

The code is clean, fully typed, and ready for production.

---

**Thank you for the opportunity. I look forward to your feedback.**

James Dennis  
Git Repository: (https://github.com/JamesDennisOrg/serviced-offices-london) 