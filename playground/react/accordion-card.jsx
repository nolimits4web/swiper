import React from 'react';
import { AccordionCard } from 'swiper/react';
import 'swiper/css';

const cards = [
  {
    title: "Craftsmanship",
    details: "A century of heritage, exquisite craftsmanship, each piece is a masterpiece of artistry."
  },
  {
    title: "Innovation",
    details: "Blending contemporary aesthetics with tradition to create timeless classics."
  },
  {
    title: "Premium Materials",
    details: "Carefully selected global materials ensuring supreme quality and luxury experience."
  }
];

export default function AccordionCardDemo() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>AccordionCard Demo</h1>
      
      {/* Basic Usage */}
      <section>
        <h2>Basic Usage</h2>
        <AccordionCard 
          cards={cards}
          containerWidth="100%"
          cardHeight={300}
        />
      </section>

      {/* Custom Styling */}
      <section style={{ marginTop: '4rem' }}>
        <h2>Custom Styling</h2>
        <AccordionCard 
          cards={cards}
          containerWidth="100%"
          cardHeight={400}
          cardColor="#2c3e50"
          cardTextColor="#ffffff"
          detailTextColor="#333333"
          animationDuration={1}
        />
      </section>

      {/* Custom Rendering */}
      <section style={{ marginTop: '4rem' }}>
        <h2>Custom Rendering</h2>
        <AccordionCard 
          cards={[
            {
              title: "Luxury Collection",
              details: "Discover our exclusive collection of handcrafted masterpieces."
            },
            {
              title: "Limited Edition",
              details: "Unique pieces with numbered editions for the discerning collector."
            },
            {
              title: "Bespoke Service",
              details: "Tailored solutions to create your perfect, one-of-a-kind piece."
            }
          ]}
          containerWidth="100%"
          cardHeight={350}
          renderCard={(card, index) => (
            <div key={index} style={{ 
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1rem',
                color: '#2c3e50'
              }}>{card.title}</h3>
              <p style={{
                color: '#666',
                lineHeight: 1.6
              }}>{card.details}</p>
            </div>
          )}
        />
      </section>

      {/* Responsive Layout */}
      <section style={{ marginTop: '4rem' }}>
        <h2>Responsive Layout</h2>
        <AccordionCard 
          cards={cards}
          containerWidth="90%"
          cardHeight={350}
          cardColor="#1a1a1a"
          cardTextColor="#ffffff"
          detailTextColor="#ffffff"
          animationDuration={0.6}
        />
      </section>
    </div>
  );
} 