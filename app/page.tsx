import DayView from "@/components/DayView";

export default function Home() {
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="font-medium text-5xl">Welcome to Dream & Do Digital</h1>
        <div className="flex w-full gap-4 mt-8">
          <div className="basis-1/2 border-2 border-blue-500 h-96">
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
          <div className="basis-1/2 justify-items-center">
            <DayView />
          </div>
        </div>
      </section>
    </>
  );
}
