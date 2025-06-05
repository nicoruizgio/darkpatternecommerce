import { Star } from 'lucide-react';

export default function Testimonials({ testimonial }) {
  if (!testimonial) return null;

  return (
    <div className="w-full bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 mt-14">
      <div className="flex items-start mb-3">
        <p className="text-gray-700 italic flex-1">{testimonial.testimonial}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            {testimonial.name.charAt(0)}
          </div>
          <span className="font-medium">{testimonial.name}</span>
        </div>

        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>
    </div>
  );
}