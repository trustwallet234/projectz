"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CardData, EncryptedCard } from '@/lib/types';
import { decryptObject } from '@/lib/crypto';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export interface CardItemProps {
  card: EncryptedCard;
  onDelete: (id: string) => void;
}

export function CardItem({ card, onDelete }: CardItemProps) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const toggleDecrypt = () => {
    if (!isDecrypted) {
      try {
        const decrypted = decryptObject<CardData>(card.encryptedData);
        setCardData(decrypted);
        setIsDecrypted(true);
      } catch (error) {
        console.error('Failed to decrypt card:', error);
        toast({
          title: "Decryption Error",
          description: "Failed to decrypt this card. The encryption key might be incorrect.",
          variant: "destructive",
        });
      }
    } else {
      setIsDecrypted(false);
      setCardData(null);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'cards', card.id));
      onDelete(card.id);
      toast({
        title: "Card Deleted",
        description: "The card has been permanently deleted",
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: "Error",
        description: "Failed to delete the card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const createdAt = card.createdAt instanceof Date 
    ? formatDistanceToNow(card.createdAt, { addSuffix: true })
    : 'recently';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-secondary/30 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              {isDecrypted ? cardData?.fullName : '••••••••••••••••'}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleDecrypt}>
                    {isDecrypted ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isDecrypted ? 'Hide sensitive data' : 'Decrypt and view'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-muted-foreground">Created {createdAt}</p>
        </CardHeader>
        <CardContent className="pt-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{isDecrypted ? cardData?.phoneNumber : '••••••••••••'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{isDecrypted ? cardData?.email : '••••••••••••'}</p>
              </div>
            </div>

            <CollapsibleContent>
              <div className="mt-4 pt-2 border-t space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm">{isDecrypted ? cardData?.address : '••••••••••••'}</p>
                </div>
                {isDecrypted && cardData?.notes && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm mt-1 whitespace-pre-wrap">{cardData.notes}</p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
            
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-2 w-full">
                {isOpen ? "Show Less" : "Show More"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
        <CardFooter className="bg-secondary/10 flex justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            {isDecrypted ? "Decrypted" : "Encrypted"}
          </p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDelete}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}