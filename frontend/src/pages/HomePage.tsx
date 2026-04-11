import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Footer />
    </>
  );
};
