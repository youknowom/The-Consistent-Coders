import React, { useState } from 'react';
import { Craft } from '../components/Craft';
import { CraftModal } from '../components/CraftModal';
import { Footer } from '../components/Footer';
import type { CraftCard } from '../types/index';

export const LearnPage: React.FC = () => {
  const [modalData, setModalData] = useState<CraftCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card: CraftCard) => {
    setModalData(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300);
  };

  return (
    <>
      <Craft onCardClick={handleCardClick} />
      <CraftModal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
      <Footer />
    </>
  );
};
