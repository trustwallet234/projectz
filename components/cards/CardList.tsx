"use client";

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { EncryptedCard } from '@/lib/types';
import { CardItem } from './CardItem';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardList() {
  const [cards, setCards] = useState<EncryptedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    
    const cardsRef = collection(db, 'cards');
    const cardsQuery = query(
      cardsRef,
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(cardsQuery, (snapshot) => {
      const cardsData: EncryptedCard[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        cardsData.push({
          id: doc.id,
          userId: data.userId,
          encryptedData: data.encryptedData,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });
      
      setCards(cardsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching cards:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Secure Cards</h2>
          <p className="text-muted-foreground">
            All data is encrypted and only viewable by you
          </p>
        </div>
        <Button onClick={() => router.push('/create-card')} className="group">
          <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
          New Card
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading your secure cards...</p>
        </div>
      ) : cards.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary/20 rounded-lg p-8 text-center"
        >
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">No Secure Cards Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first encrypted card to securely store your personal information.
          </p>
          <Button onClick={() => router.push('/create-card')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Card
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {cards.map((card) => (
              <CardItem 
                key={card.id} 
                card={card}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}