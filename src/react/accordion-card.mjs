import React, { useState, useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.mjs';
import { SwiperContext } from './context.mjs';

/**
 * AccordionCard Component
 * A modern card component with smooth flip animation for content display
 */
const AccordionCard = ({
  cards = [],
  containerWidth = '100%',
  cardHeight = 400,
  cardColor = '#1a1a1a',
  detailWidth = 300,
  cardTextColor = '#ffffff',
  detailTextColor = '#ffffff',
  animationDuration = 0.8,
  className = '',
  renderCard,
}) => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const containerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;
    // Initialize container styles
    const container = containerRef.current;
    container.style.width = containerWidth;
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    container.style.gap = '2rem';
    container.style.padding = '1rem';
  }, [containerWidth]);

  // Handle card flip animation
  const handleCardClick = (cardIndex) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  // Default card rendering function
  const defaultRenderCard = (card, index) => {
    const isFlipped = flippedCards.has(index);
    
    return (
      <div
        key={index}
        className="accordion-card-wrapper"
        style={{
          perspective: '1000px',
          padding: '1rem',
        }}
      >
        {/* Card container with flip animation */}
        <div
          className={`accordion-card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
          style={{
            position: 'relative',
            width: '100%',
            height: `${cardHeight}px`,
            cursor: 'pointer',
            transformStyle: 'preserve-3d',
            transition: `transform ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
            transform: isFlipped ? 'rotateY(180deg)' : '',
          }}
        >
          {/* Inner container for 3D effect */}
          <div
            className="accordion-card-inner"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front face of the card */}
            <div
              className="accordion-card-front"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: cardColor,
                color: cardTextColor,
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {card.title}
              </h3>
            </div>
            {/* Back face of the card */}
            <div
              className="accordion-card-back"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: 'white',
                color: detailTextColor,
                transform: 'rotateY(180deg)',
              }}
            >
              <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                {card.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`accordion-container ${className}`}>
      {cards.map((card, index) => (
        renderCard ? renderCard(card, index) : defaultRenderCard(card, index)
      ))}
    </div>
  );
};

export { AccordionCard }; 