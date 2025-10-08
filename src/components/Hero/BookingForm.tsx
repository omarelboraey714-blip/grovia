"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, MapPin } from "lucide-react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    area: "",
    cuisine: "",
    deliveryTime: "asap",
  });

  const areas = [
    "المعادي",
    "مدينة نصر",
    "مصر الجديدة",
    "الشيخ زايد",
    "6 أكتوبر",
    "الدقي",
    "المهندسين",
    "الزمالك",
    "المقطم",
    "العبور",
  ];

  const cuisines = [
    "مصري",
    "سوري",
    "لبناني",
    "هندي",
    "صيني",
    "إيطالي",
    "أمريكي",
    "مشاوي",
    "حلويات",
    "مأكولات بحرية",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // معالجة الحجز
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        اطلب وجبتك الآن
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* اختيار المنطقة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            اختر منطقتك
          </label>
          <select
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            className="form-select"
            required
          >
            <option value="">اختر منطقتك</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* اختيار نوع المطبخ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 inline mr-2" />
            نوع المطبخ المفضل
          </label>
          <select
            value={formData.cuisine}
            onChange={(e) =>
              setFormData({ ...formData, cuisine: e.target.value })
            }
            className="form-select"
            required
          >
            <option value="">اختر نوع المطبخ</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* وقت التوصيل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            وقت التوصيل المفضل
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, deliveryTime: "asap" })}
              className={`p-3 border rounded-lg text-center transition-all ${
                formData.deliveryTime === "asap"
                  ? "border-primary-500 bg-primary-50 text-primary-500"
                  : "border-gray-300 hover:border-primary-300"
              }`}
            >
              أقرب وقت ممكن
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, deliveryTime: "schedule" })
              }
              className={`p-3 border rounded-lg text-center transition-all ${
                formData.deliveryTime === "schedule"
                  ? "border-primary-500 bg-primary-50 text-primary-500"
                  : "border-gray-300 hover:border-primary-300"
              }`}
            >
              تحديد وقت
            </button>
          </div>
        </div>

        {/* زر الطلب */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn-primary w-full text-lg py-4"
        >
          ابحث عن المطاعم المتاحة
        </motion.button>
      </form>

      {/* ضمان التوصيل */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <Clock className="w-5 h-5 text-primary-500" />
          <span className="text-sm font-medium text-primary-700">
            توصيل مضمون في 30 دقيقة أو أقل
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingForm;
