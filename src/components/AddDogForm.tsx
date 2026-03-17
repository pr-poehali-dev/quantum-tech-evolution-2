import { useState } from "react";

const DISTRICTS = [
  "Центр",
  "Уралмаш",
  "Эльмаш",
  "ВИЗ",
  "Ботаника",
  "Юго-Западный",
  "Химмаш",
  "Синарский",
  "Пионерский",
  "Компрессорный",
  "Старая Сортировка",
  "Новая Сортировка",
  "Шарташ",
  "Берёзовский (пригород)",
];

interface FormData {
  name: string;
  breed: string;
  age: string;
  district: string;
  about: string;
  ownerName: string;
}

const EMPTY: FormData = {
  name: "",
  breed: "",
  age: "",
  district: "",
  about: "",
  ownerName: "",
};

export default function AddDogForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Укажи кличку";
    if (!form.breed.trim()) e.breed = "Укажи породу";
    if (!form.age.trim()) e.age = "Укажи возраст";
    if (!form.district) e.district = "Выбери район";
    if (!form.ownerName.trim()) e.ownerName = "Укажи своё имя";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="add-dog" className="bg-neutral-50 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Анкета питомца</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
          Расскажи о своей собаке
        </h2>
        <p className="text-neutral-500 mb-10 text-lg">
          Заполни форму — и другие собачники Екатеринбурга смогут найти тебя по району.
        </p>

        {submitted ? (
          <div className="bg-black text-white p-10 text-center">
            <div className="text-5xl mb-4">🐾</div>
            <h3 className="text-2xl font-bold mb-2">Отлично, {form.ownerName}!</h3>
            <p className="text-neutral-300 text-lg">
              Анкета <strong className="text-white">{form.name}</strong> добавлена.
              Собачники из района <strong className="text-white">{form.district}</strong> уже могут увидеть вас!
            </p>
            <button
              onClick={() => { setForm(EMPTY); setSubmitted(false); }}
              className="mt-8 border border-white text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              Добавить ещё одну собаку
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Кличка *"
                placeholder="Например: Барон"
                value={form.name}
                error={errors.name}
                onChange={(v) => handleChange("name", v)}
              />
              <Field
                label="Порода *"
                placeholder="Например: Лабрадор"
                value={form.breed}
                error={errors.breed}
                onChange={(v) => handleChange("breed", v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Возраст *"
                placeholder="Например: 2 года"
                value={form.age}
                error={errors.age}
                onChange={(v) => handleChange("age", v)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm uppercase tracking-wide text-neutral-600">Район *</label>
                <select
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  className={`border px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm ${
                    errors.district ? "border-red-500" : "border-neutral-300"
                  }`}
                >
                  <option value="">Выбери район</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}
              </div>
            </div>

            <Field
              label="Твоё имя *"
              placeholder="Как тебя зовут?"
              value={form.ownerName}
              error={errors.ownerName}
              onChange={(v) => handleChange("ownerName", v)}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm uppercase tracking-wide text-neutral-600">Расскажи о собаке</label>
              <textarea
                value={form.about}
                onChange={(e) => handleChange("about", e.target.value)}
                placeholder="Характер, привычки, любимые места для прогулок..."
                rows={4}
                className="border border-neutral-300 px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-4 uppercase text-sm tracking-wide font-medium hover:bg-neutral-800 transition-colors duration-300 cursor-pointer w-full sm:w-fit"
            >
              Добавить собаку
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm uppercase tracking-wide text-neutral-600">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`border px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
