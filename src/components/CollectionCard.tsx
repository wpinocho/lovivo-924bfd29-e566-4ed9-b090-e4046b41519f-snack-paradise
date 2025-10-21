import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white border-2 border-carnales-orange/20 hover:border-carnales-orange hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-gradient-carnales-soft overflow-hidden relative group">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              <span className="text-6xl">🌽</span>
            </div>
          )}
          
          {collection.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-carnales-yellow text-carnales-purple text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                ⭐ Destacado
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-carnales-orange font-black text-xl mb-2 line-clamp-1">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-gradient-to-r from-carnales-orange to-carnales-yellow text-white font-bold hover:shadow-lg transition-all"
            onClick={() => onViewProducts(collection.id)}
          >
            Ver Productos 🌽
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}