# Serviced Offices in London – Next.js Listing Page

A high‑performance, filterable office listing page built for a UK business replacing their legacy CMS.  

---

## Project overview

This page displays 12 serviced offices, coworking spaces, and managed offices across London.  
Users can filter by area, office type, minimum desks, monthly budget, and choose to include POA listings.  
Each listing card shows key decision‑making information, and three featured offices are visually highlighted.

---

## Tech stack

- **Next.js 16.2.4 (App Router) – server‑rendered React framework  
- **TypeScript** – type safety and better developer experience  
- **Tailwind CSS v4 – utility‑first styling  
- **shadcn/ui 4.1.2 – accessible, unstyled components (Select, Card, Button, Input, Slider)  
- **pnpm** – fast, disk‑efficient package manager  

---

## Features implemented

### Core requirements
- [x] One page: “Serviced Offices in London”  
- [x] 12 office listings from provided `listings.json`  
- [x] Each card shows: name, area, type, price per desk (or POA), total desks, key amenities, availability date, address, advisor name & phone  
- [x] Filtering by: area, office type, minimum desks, budget range, and “Include POA” toggle  
- [x] Page header with headline and short intro  
- [x] Mid‑page conversion block encouraging contact  
- [x] FAQ section (4 questions, expandable using shadcn Accordion)

### Additional polish
- **Featured offices** – three listings (`ws-001`, `ws-003`, `ws-006`) have a gold border and “⭐ Featured” badge  
- **Responsive design** – grid layout adapts from 1 column (mobile) to 3 columns (desktop)  
- **Image handling** – because no actual images were supplied, each card uses a clean gradient placeholder with the office name and area. This ensures 100% visual consistency and avoids broken links.  
- **Full‑width form controls** – all filters use `w-full` for a professional, balanced layout.  
- **Results counter** – shows how many offices match the current filters.

---

## Getting started

```bash
# Clone the repository
git clone https://github.com/your-username/serviced-offices-london.git
cd serviced-offices-london

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open http://localhost:3000 to see the page.

---

## Deployment

The site is optimised for static export or server deployment.
We recommend Vercel (one‑click deploy from GitHub).
https://vercel.com/button

---

## AI tools used

Deepseek – generated filter logic, component structure, TypeScript interfaces, and this README.

GitHub Copilot – suggested amenity formatting and fallback image logic. (Minimal)

---

## Time spent

Approximately 75 minutes – focusing on clean UX, accurate filtering, and a polished interface.
Quality of thinking and attention to detail were prioritised over speed.
Given more time I would have enhanced the color theme.

---

## Assumptions & decisions

Images – no real images were supplied. Rather than showing broken next/image errors, we used gradient placeholders with office name + area. This is visually consistent, accessible, and matches modern design standards (e.g., WeWork, Spaces).

Budget filter – based on price_per_desk (monthly). Offices with null price are included only when “Include POA” is checked.

Desks filter – min. desks refers to total desks in the office (user can see at a glance if it fits their team size).

Featured offices – highlighted with a gold border and badge to improve conversion on premium listings.

Accordion – uses shadcn’s Base UI implementation; the first FAQ item is open by default for discoverability.

## Browser support

Tested in the latest versions of Chrome, Firefox, Safari, and Edge. Fully responsive.

## Next steps (if this were a live project)

Add real office photography and optimise with next/image

Implement the “Enquire” / “Call” buttons to connect to a CRM or booking system

Add Google Maps integration for each address

Paginate or lazy‑load if more than 12 listings

Add analytics to track filter usage and conversion events

---

## Contact

For questions about this exercise, please refer to the original brief.