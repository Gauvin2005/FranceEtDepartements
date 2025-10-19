import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Department } from '@/types';

interface DepartmentCardProps {
  department: Department;
  isFaceUp?: boolean;
  isRevealed?: boolean;
  onClick?: () => void;
}

export function DepartmentCard({
  department,
  isFaceUp = false,
  isRevealed = false,
  onClick,
}: DepartmentCardProps) {
  return (
    <motion.div
      className="relative w-32 h-48 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
        {isFaceUp || isRevealed ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 p-3 flex flex-col items-center justify-between">
            <div className="text-xs font-semibold text-blue-800">N° {department.numero}</div>
            <div className="flex-1 flex items-center justify-center">
              {department.blason && (
                <div className="relative w-16 h-16">
                  <Image
                    src={department.blason}
                    alt={`Blason ${department.nom}`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">{department.nom}</div>
              <div className="text-xs text-gray-600">{department.prefecture}</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-white text-4xl font-bold opacity-20">?</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

