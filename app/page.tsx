import OfficeListings from '../components/officeListings';
import listingsData from './data/listings.json' with { type: 'json' };
import type { Office } from '../types/office';

export default function Home() {
  const offices = listingsData as Office[];

  return (
    <main>
      {/* Header section */}
      <section className="bg-linear-to-r from-slate-900 to-slate-700 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Serviced Offices in London</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          Discover flexible, high‑quality office spaces across London’s most sought‑after areas. Filter by budget, desks, area, and office type.
        </p>
      </section>

      {/* Listing component with filters */}
      <OfficeListings offices={offices} />
    </main>
  );
}