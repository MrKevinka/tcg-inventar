export const sortCardImages = (images: string[] | undefined, cardNum: string): string[] => {
  if (!images) return [];

  const cleanCardNum = cardNum.replace('#', '');
  const expectedMainImage = `https://en.onepiece-cardgame.com/images/cardlist/card/${cleanCardNum}.png?250509`;

  if (images.includes(expectedMainImage)) {
    return [expectedMainImage, ...images.filter(img => img !== expectedMainImage)];
  }

  return images;
};
