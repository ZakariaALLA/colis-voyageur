import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

export default function RatingReview() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Rating submitted:', { rating, comment });
    alert('Évaluation envoyée avec succès!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" data-testid="text-rating-title">{t.rating.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-3 block">{t.rating.rateTransporter}</Label>
            <div className="flex gap-2" data-testid="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  data-testid={`star-${star}`}
                >
                  <Star
                    className={`h-12 w-12 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-rating-value">
                Note sélectionnée: {rating}/5
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="comment">{t.rating.comment}</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience..."
              rows={5}
              className="mt-2"
              data-testid="textarea-comment"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/500 caractères
            </p>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={rating === 0}
            data-testid="button-submit-rating"
          >
            {t.rating.submit}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
