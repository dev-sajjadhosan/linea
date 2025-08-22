export const WebsitePreview = () => (
  <div className="w-full max-w-4xl p-10 text-center bg-gray-50 rounded-xl shadow-md border">
    <h1
      id="hero-title"
      onClick={() => onPick('hero-title')}
      style={{ fontFamily: activeFont, ...elementStyles['hero-title'] }}
      className={`${selectableClass('hero-title')} text-5xl font-bold`}
    >
      {elementStyles['hero-title']?.showIcon && (
        <Leaf className="inline-block mr-2 -mt-1" />
      )}
      {elementText['hero-title']}
    </h1>

    <p
      id="hero-subtitle"
      onClick={() => onPick('hero-subtitle')}
      style={{ fontFamily: activeFont, ...elementStyles['hero-subtitle'] }}
      className={`${selectableClass(
        'hero-subtitle',
      )} mt-3 text-lg text-zinc-700`}
    >
      {elementStyles['hero-subtitle']?.showIcon && (
        <Leaf className="inline-block mr-2 -mt-1" />
      )}
      {elementText['hero-subtitle']}
    </p>

    <button
      id="hero-btn"
      onClick={() => onPick('hero-btn')}
      style={{ fontFamily: activeFont, ...elementStyles['hero-btn'] }}
      className={`${selectableClass(
        'hero-btn',
      )} mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg`}
    >
      {elementStyles['hero-btn']?.showIcon && (
        <Leaf className="inline-block mr-2 -mt-1" />
      )}
      {elementText['hero-btn']}
    </button>
  </div>
)
