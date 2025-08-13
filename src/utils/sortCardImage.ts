export const sortCardImages = (images: string[] | undefined, cardNum: string): string[] => {
  const cleanCardNum = cardNum.replace('#', '');
  const expectedMainImage = `https://en.onepiece-cardgame.com/images/cardlist/card/${cleanCardNum}.png?250509`;

  if (!images || images.length === 0) {
    return [expectedMainImage];
  }

  if (images.includes(expectedMainImage)) {
    return [expectedMainImage, ...images.filter(img => img !== expectedMainImage)];
  }

  // Falls das erwartete Bild nicht in images ist, an den Anfang setzen
  return [expectedMainImage, ...images];
};
