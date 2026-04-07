'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Office } from '@/types/office';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star } from 'lucide-react';

interface OfficeListingsProps {
  offices: Office[];
}

// Get unique areas and types from data
const getUniqueAreas = (offices: Office[]) => ['All', ...new Set(offices.map(o => o.area).filter(Boolean))];
const getUniqueTypes = (offices: Office[]) => ['All', ...new Set(offices.map(o => o.type))];

// Helper to format price
const formatPrice = (price: number | null) => {
  if (price === null) return 'POA';
  return `£${price.toLocaleString()}/desk/month`;
};

export default function OfficeListings({ offices }: OfficeListingsProps) {
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [minDesks, setMinDesks] = useState(1);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 1000]);
  const [includePOA, setIncludePOA] = useState(true);

  // Calculate max price from non-null values for slider
  const maxPrice = useMemo(() => {
    const prices = offices.map(o => o.price_per_desk).filter((p): p is number => p !== null);
    return prices.length ? Math.max(...prices, 1000) : 1000;
  }, [offices]);

  const filteredOffices = useMemo(() => {
    return offices.filter(office => {
      // Area filter
      if (selectedArea !== 'All' && office.area !== selectedArea) return false;
      // Type filter
      if (selectedType !== 'All' && office.type !== selectedType) return false;
      // Desks filter
      if (office.desks < minDesks) return false;
      // Budget filter
      if (office.price_per_desk !== null) {
        if (office.price_per_desk < budgetRange[0] || office.price_per_desk > budgetRange[1]) return false;
      } else {
        if (!includePOA) return false;
      }
      return true;
    });
  }, [offices, selectedArea, selectedType, minDesks, budgetRange, includePOA]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter bar */}
      <div className="bg-card p-4 rounded-lg shadow-lg border mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Area filter */}
        <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <Select 
                value={selectedArea} 
                onValueChange={(val) => setSelectedArea(val ?? 'All')}
            >
                <SelectTrigger className="w-full rounded-md">
                <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent className="rounded-md">
                {getUniqueAreas(offices).map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            {/* Office type filter */}
            <div>
            <label className="block text-sm font-medium mb-1">Office type</label>
            <Select 
                value={selectedType} 
                onValueChange={(val) => setSelectedType(val ?? 'All')}
            >
                <SelectTrigger className="w-full rounded-md">
                <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-md">
                {getUniqueTypes(offices).map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            {/* Min desks - remains as Input (shadcn) - fine */}
            <div>
                <label className="block text-sm font-medium mb-1">Min. desks</label>
                <Input
                type="number"
                min={1}
                value={minDesks}
                onChange={e => setMinDesks(Number(e.target.value))}
                className='rounded-md w-30'
                />
            </div>

            {/* Budget slider & POA checkbox - unchanged */}
            <div>
                <label className="block text-sm font-medium mb-1">Budget per desk (monthly)</label>
                <div className="flex items-center gap-2">
                <span className="text-xs w-8">£{budgetRange[0]}</span>
                <Slider
                    min={0}
                    max={maxPrice}
                    step={50}
                    value={[budgetRange[0], budgetRange[1]]}
                    onValueChange={(value) => {
                    if (Array.isArray(value) && value.length === 2) {
                        setBudgetRange([value[0], value[1]]);
                    }
                    }}
                    className="flex-1"
                />
                <span className="text-xs w-8">£{budgetRange[1]}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                <input
                    type="checkbox"
                    id="includePOA"
                    checked={includePOA}
                    onChange={e => setIncludePOA(e.target.checked)}
                />
                <label htmlFor="includePOA" className="text-sm">Include POA (price on application)</label>
                </div>
            </div>
            </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600 mb-4">Showing {filteredOffices.length} of {offices.length} offices</p>

      {/* Listing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffices.map(office => {
        const fallbackImage = `https://picsum.photos/seed/${office.id}/600/400`;
        
        return (
            <Card 
            key={office.id} 
            className={`relative flex flex-col h-full hover:shadow-lg transition-shadow ${
                office.featured ? 'border-yellow-400 border-2 shadow-md' : ''
            }`}
            >
            {/* Featured badge */}
            {office.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                ⭐ Featured
                </div>
            )}
            
            <CardHeader>
                <CardTitle className="text-xl">{office.name}</CardTitle>
                <p className="text-sm text-gray-500">{office.area} · {office.borough}</p>
            </CardHeader>
            
            <CardContent className="flex-1">
                {/* Image with fallback */}
                <div className="relative h-40 w-full bg-linear-to-br from-blue-500 to-indigo-600 rounded-md mb-3 flex items-center justify-center text-white text-center p-4">
                    <div>
                        <p className="font-bold text-lg">{office.name}</p>
                        <p className="text-sm opacity-90">{office.area}</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                <p><span className="font-medium">Type:</span> {office.type}</p>
                <p><span className="font-medium">Price:</span> {formatPrice(office.price_per_desk)}</p>
                <p><span className="font-medium">Total desks:</span> {office.desks}</p>
                <p><span className="font-medium">Amenities:</span> {office.amenities.slice(0, 3).join(', ')}</p>
                <p><span className="font-medium">Available from:</span> {new Date(office.available_from).toLocaleDateString('en-GB')}</p>
                {office.address && <p className="text-sm text-gray-600">{office.address}</p>}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                <p className="text-sm">Advisor: {office.advisor.name}</p>
                <Button className="w-full mt-2" variant="default">
                    Call {office.advisor.phone}
                </Button>
                </div>
            </CardContent>
            </Card>
        );
        })}
      </div>

      {/* Mid-page conversion block */}
      <div className="my-12 bg-blue-50 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-semibold">Not seeing the perfect space?</h2>
        <p className="mt-2">Speak to one of our expert advisors – we know every office on this list and many more.</p>
        <Button className="mt-4" size="lg">020 7946 0000</Button>
      </div>

      {/* FAQ section */}
        <Accordion defaultValue={['item-1']}>
            <AccordionItem value="item-1">
                <AccordionTrigger>What is a serviced office?</AccordionTrigger>
                <AccordionContent>
                A serviced office is a fully furnished, managed workspace with flexible terms – usually including reception, IT, utilities, and cleaning. You pay a single monthly fee per desk or per office.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How does pricing work in London?</AccordionTrigger>
                <AccordionContent>
                Most providers charge a monthly fee per desk. Prices vary by area, building quality, and included amenities. In central London, expect £350–£800 per desk/month. Some premium spaces are POA.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Can I rent for just 3 months?</AccordionTrigger>
                <AccordionContent>
                Yes – many coworking and managed offices offer rolling monthly contracts. Serviced offices typically ask for 6–12 months but can negotiate shorter terms.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>What&#39;s the difference between Serviced Office, Coworking, and Managed Office?</AccordionTrigger>
                <AccordionContent>
                <strong>Serviced Office</strong> – private, lockable suite with full service (reception, IT, cleaning). <strong>Coworking</strong> – open plan, shared desks or dedicated desk. <strong>Managed Office</strong> – a private office but with fewer services (you might arrange cleaning/IT separately).
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
}