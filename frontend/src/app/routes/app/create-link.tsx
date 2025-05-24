import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createLink } from "../../../lib/links";

const createLinkSchema = z.object({
  title: z.string().min(1, "Titel krävs"),
  targetUrl: z.string().url("Måste vara en giltig URL"),
  price: z.number().min(1, "Priset måste vara minst 1 kr"),
  swishNumber: z
    .string()
    .regex(
      /^07\d{8}$/,
      "Ogiltigt Swish-nummer (börja med 07 och ha 10 siffror)",
    ),
});

type CreateLinkSchema = z.infer<typeof createLinkSchema>;

const CreateLinkPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = async (data: CreateLinkSchema) => {
    try {
      await createLink(
        data.title,
        data.targetUrl,
        data.price,
        data.swishNumber,
      );
      navigate(`/home`);
    } catch (err) {
      console.error(err);
      alert("Kunde inte skapa länken.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Skapa en ny länk
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Fyll i formuläret nedan för att generera din betallänk
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-700 mb-1">
              Titel
            </label>
            <input
              type="text"
              id="title"
              placeholder="Ex: CV-mall i Notion"
              {...register("title")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="targetUrl"
              className="block text-sm text-gray-700 mb-1"
            >
              Länk till innehåll
            </label>
            <input
              type="url"
              id="targetUrl"
              placeholder="https://notion.so/…"
              {...register("targetUrl")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.targetUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.targetUrl.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm text-gray-700 mb-1">
              Pris (kr)
            </label>
            <input
              type="number"
              id="price"
              placeholder="Ex: 49"
              {...register("price", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="swishNumber"
              className="block text-sm text-gray-700 mb-1"
            >
              Ditt Swish-nummer
            </label>
            <input
              type="tel"
              id="swishNumber"
              placeholder="0701234567"
              {...register("swishNumber")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.swishNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.swishNumber.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Skapa länk
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLinkPage;
