import React from 'react';
import { Jobs } from '../components/Jobs';
import { Fame } from '../components/Fame';
import { Footer } from '../components/Footer';

export const JobsPage: React.FC = () => {
  return (
    <>
      <Jobs />
      <Fame />
      <Footer />
    </>
  );
};
