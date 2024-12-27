import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col text-5xl">
      <h1 className="font-medium">Welcome to Dream & Do Digital</h1>
      <div className="flex w-full gap-4 mt-8">
        <div className="basis-1/3 border-2 border-red-600 h-96">
          <div className="flex flex-col gap-4 px-4">
            <div>
              <span className="text-lg">🎯 Ugens målsætninger:</span>
              <ul className="list-disc list-inside text-sm">
                <li>🏃 Løb 10 km</li>
                <li>📚 Læs 100 sider</li>
                <li>🍎 Spis sundt</li>
              </ul>
            </div>

            <div>
              <span className="text-lg">🏋️ Ugens udfordringer:</span>
              <ul className="list-disc list-inside text-sm">
                <li>📱 Ingen sociale medier</li>
                <li>📺 Ingen TV</li>
                <li>🍭 Ingen slik</li>
              </ul>
            </div>
            <span className="text-base"></span>
          </div>
        </div>
        <div className="basis-2/3 border-2 border-indigo-600 h-96"></div>
      </div>
    </section>
  );
}
