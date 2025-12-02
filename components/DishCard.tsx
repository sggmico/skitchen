
import React from 'react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  showPrice?: boolean;
  orderMode?: boolean;
  quantity?: number;
  onAddToCart?: (dish: Dish) => void;
  onUpdateQuantity?: (dishId: string, quantity: number) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  dish,
  showPrice = true,
  orderMode = false,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity
}) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(dish);
    }
  };

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    if (onUpdateQuantity) {
      onUpdateQuantity(dish.id, Math.max(0, quantity + delta));
    }
  };

  return (
    <div className={`flex flex-col justify-center py-1 sm:py-1.5 group w-full overflow-hidden ${orderMode ? 'relative' : ''}`}>
      {/* Top Line: Name + Badge + Price */}
      <div className="flex items-baseline w-full">
        {/* Order Mode Checkbox/Indicator */}
        {orderMode && (
          <div className="mr-1.5 sm:mr-2 shrink-0 flex items-center relative -top-[1px]">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full border-2 border-gray-300 hover:border-baoding-red hover:bg-baoding-red/5 transition-all flex items-center justify-center group"
                title="添加到购物车"
              >
                <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-baoding-red opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            ) : (
              <div className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-baoding-red flex items-center justify-center relative cursor-pointer hover:bg-red-800 transition-colors">
                <span className="text-white text-[9px] sm:text-[10px] font-bold">
                  {quantity}
                </span>
              </div>
            )}
          </div>
        )}

        <h3 className={`font-serif font-bold text-baoding-dark whitespace-nowrap overflow-hidden text-ellipsis ${showPrice ? 'text-xs sm:text-sm lg:text-base' : 'text-xs sm:text-sm'}`}>
          {dish.name}
        </h3>

        {/* Popular Badge - Displayed immediately after name */}
        {dish.popular && (
          <span className="text-[8px] sm:text-[9px] bg-baoding-red text-white px-0.5 sm:px-1 rounded-sm font-serif whitespace-nowrap shrink-0 ml-0.5 sm:ml-1 self-center relative -top-[1px]">
            招牌
          </span>
        )}

        {/* Dot Leader - Only show if price is visible */}
        {showPrice && (
          <div className="flex-1 mx-0.5 sm:mx-1 border-b-2 border-dotted border-baoding-gold/40 relative -top-1 min-w-[10px]"></div>
        )}

        {/* Price */}
        {showPrice && (
          <div className="text-sm sm:text-base lg:text-lg font-bold text-baoding-red font-serif whitespace-nowrap shrink-0 ml-auto">
            <span className="text-[10px] sm:text-xs mr-0.5">¥</span>{dish.price}
          </div>
        )}
      </div>

      {/* Bottom Line: Description + Spicy + Quantity Controls */}
      <div className="flex items-center w-full mt-0.5">
        <p className="text-[9px] sm:text-[10px] text-stone-500 font-serif truncate flex-1">
          {dish.description}
          {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
             <span className="text-[9px] sm:text-[10px] ml-0.5 sm:ml-1 shrink-0 grayscale-[0.3]">
               {'🌶️'.repeat(dish.spicyLevel)}
             </span>
          )}
        </p>

        {/* Inline Quantity Controls (Only shown when quantity > 0) */}
        {orderMode && quantity > 0 && (
          <div className="flex items-center space-x-1 ml-2 shrink-0">
            <button
              onClick={(e) => handleQuantityChange(e, -1)}
              className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-baoding-red transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={(e) => handleQuantityChange(e, 1)}
              className="w-5 h-5 rounded-full bg-baoding-red hover:bg-red-800 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishCard;
