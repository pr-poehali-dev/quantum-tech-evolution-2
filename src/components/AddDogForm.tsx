import { useState, useEffect } from "react";

const DOGS_URL = "https://functions.poehali.dev/e8e9e0ab-94ff-454a-aeda-6ae853bbb39c";

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

interface Dog {
  id: number;
  name: string;
  breed: string;
  age: string;
  district: string;
  owner_name: string;
  about: string;
  created_at: string;
}

interface FormData {
  name: string;
  breed: string;
  age: string;
  district: string;
  about: string;
  ownerName: string;
}

const EMPTY: FormData = { name: "", breed: "", age: "", district: "", about: "", ownerName: "" };

export default function AddDogForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogsLoading, setDogsLoading] = useState(true);

  const fetchDogs = async () => {
    setDogsLoading(true);
    const res = await fetch(DOGS_URL);
    const raw = await res.json();
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    setDogs(data.dogs || []);
    setDogsLoading(false);
  };

  useEffect(() => { fetchDogs(); }, []);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Укажи кличку";
    if (!form.breed.trim()) e.breed = "Укажи породу";
    if (!form.age.trim()) e.age = "Укажи возраст";
    if (!form.district) e.district = "Выбери район";
    if (!form.ownerName.trim()) e.ownerName = "Укажи своё имя";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const res = await fetch(DOGS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, breed: form.breed, age: form.age, district: form.district, owner_name: form.ownerName, about: form.about }),
    });
    setLoading(false);
    if (res.ok) { setSubmitted(true); fetchDogs(); }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="add-dog" className="bg-neutral-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Форма */}
          <div>
            <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Анкета питомца</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              Расскажи о своей собаке
            </h2>
            <p className="text-neutral-500 mb-8">
              Заполни форму — и другие собачники Екатеринбурга смогут найти тебя по району.
            </p>

            {submitted ? (
              <div className="bg-black text-white p-8">
                <div className="text-4xl mb-4">🐾</div>
                <h3 className="text-xl font-bold mb-2">Отлично, {form.ownerName}!</h3>
                <p className="text-neutral-300 mb-4">
                  Анкета <strong className="text-white">{form.name}</strong> добавлена.
                  Собачники из района <strong className="text-white">{form.district}</strong> уже видят вас!
                </p>
                <a
                  href="https://t.me/+8L340jCF1h04NjMy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-neutral-200 transition-colors duration-300 cursor-pointer mb-3"
                >
                  Перейти в общий чат
                </a>
                <button
                  onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                  className="block border border-white text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
                >
                  Добавить ещё собаку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Кличка *" placeholder="Барон" value={form.name} error={errors.name} onChange={(v) => handleChange("name", v)} />
                  <Field label="Порода *" placeholder="Лабрадор" value={form.breed} error={errors.breed} onChange={(v) => handleChange("breed", v)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Возраст *" placeholder="2 года" value={form.age} error={errors.age} onChange={(v) => handleChange("age", v)} />
                  <div className="flex flex-col gap-1">
                    <label className="text-sm uppercase tracking-wide text-neutral-600">Район *</label>
                    <select
                      value={form.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                      className={`border px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm ${errors.district ? "border-red-500" : "border-neutral-300"}`}
                    >
                      <option value="">Выбери район</option>
                      {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}
                  </div>
                </div>
                <Field label="Твоё имя *" placeholder="Как тебя зовут?" value={form.ownerName} error={errors.ownerName} onChange={(v) => handleChange("ownerName", v)} />
                <div className="flex flex-col gap-1">
                  <label className="text-sm uppercase tracking-wide text-neutral-600">О собаке</label>
                  <textarea
                    value={form.about}
                    onChange={(e) => handleChange("about", e.target.value)}
                    placeholder="Характер, любимые места для прогулок..."
                    rows={3}
                    className="border border-neutral-300 px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-8 py-4 uppercase text-sm tracking-wide font-medium hover:bg-neutral-800 transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Сохраняем..." : "Добавить собаку"}
                </button>
              </form>
            )}
          </div>

          {/* Список анкет */}
          <div>
            <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Наше сообщество</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              Собаки Екатеринбурга
            </h2>
            <p className="text-neutral-500 mb-8">
              {dogs.length > 0
                ? `${dogs.length} ${dogWord(dogs.length)} уже в сообществе`
                : "Будь первым — добавь свою собаку!"}
            </p>

            {dogsLoading ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-neutral-200 animate-pulse" />)}
              </div>
            ) : dogs.length === 0 ? (
              <div className="border border-neutral-200 p-8 text-center text-neutral-400">
                <div className="text-4xl mb-2">🐾</div>
                Пока никого нет. Стань первым!
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[540px] overflow-y-auto pr-1">
                {dogs.map((dog) => (
                  <div key={dog.id} className="border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-neutral-900 text-lg">{dog.name}</span>
                      <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 shrink-0 ml-2">📍 {dog.district}</span>
                    </div>
                    <p className="text-sm text-neutral-500">{dog.breed}, {dog.age}</p>
                    {dog.about && <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{dog.about}</p>}
                    <p className="text-xs text-neutral-400 mt-2">Хозяин: {dog.owner_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function dogWord(n: number) {
  if (n % 100 >= 11 && n % 100 <= 19) return "собак";
  if (n % 10 === 1) return "собака";
  if (n % 10 >= 2 && n % 10 <= 4) return "собаки";
  return "собак";
}

function Field({ label, placeholder, value, error, onChange }: {
  label: string; placeholder: string; value: string; error?: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm uppercase tracking-wide text-neutral-600">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`border px-4 py-3 bg-white text-neutral-900 focus:outline-none focus:border-black transition-colors duration-200 text-sm ${error ? "border-red-500" : "border-neutral-300"}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
