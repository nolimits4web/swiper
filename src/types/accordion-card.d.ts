interface CardType {
  title: string;
  details: string;
}

interface AccordionCardProps {
  /**
   * Array of card data
   */
  cards: CardType[];
  
  /**
   * Container width
   * @default '100%'
   */
  containerWidth?: string;
  
  /**
   * Card height in pixels
   * @default 400
   */
  cardHeight?: number;
  
  /**
   * Card background color
   * @default '#1a1a1a'
   */
  cardColor?: string;
  
  /**
   * Detail content width in pixels
   * @default 300
   */
  detailWidth?: number;
  
  /**
   * Card text color
   * @default '#ffffff'
   */
  cardTextColor?: string;
  
  /**
   * Detail text color
   * @default '#ffffff'
   */
  detailTextColor?: string;
  
  /**
   * Animation duration in seconds
   * @default 0.8
   */
  animationDuration?: number;
  
  /**
   * Custom class name for container
   */
  className?: string;
  
  /**
   * Custom render function for cards
   * @param card The card data object
   * @param index The index of the card
   * @returns React node
   */
  renderCard?: (card: CardType, index: number) => React.ReactNode;
}

export { AccordionCardProps, CardType }; 