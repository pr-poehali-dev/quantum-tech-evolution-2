export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/fb10dc73-fb41-4f59-a8db-841262551e0c/files/060e4a68-2b2b-4007-844f-d07190b644a8.jpg"
          alt="Портреты собак"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Расскажи о своей собаке</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Размести анкету питомца — и соседние собачники из твоего района уже смогут познакомиться с тобой.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-semibold text-neutral-900">Кличка и порода</p>
              <p className="text-neutral-500 text-sm">Укажи имя и породу — пусть все знают, кто гуляет в твоём дворе</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎂</span>
            <div>
              <p className="font-semibold text-neutral-900">Возраст</p>
              <p className="text-neutral-500 text-sm">Щенок или взрослый пёс — найди компанию по возрасту для совместных прогулок</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold text-neutral-900">Район Екатеринбурга</p>
              <p className="text-neutral-500 text-sm">ВИЗ, Уралмаш, Ботаника, Центр — общайся с собачниками своего района в чате</p>
            </div>
          </div>
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Добавить свою собаку
        </button>
      </div>
    </div>
  );
}