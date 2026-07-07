import Image from "next/image";
import type { MemoryObject, RoomObjectId } from "../types/memory";
import { formatDate } from "../engine/memoryQuery";
import { objectNames } from "./RoomObjects";

type MemoryRevealProps = {
  activeObject: RoomObjectId;
  memories: MemoryObject[];
  selectedDate: string;
};

const objectCopy: Record<RoomObjectId, string> = {
  monitor: "The machine is awake. Pick a folder and let the date decide what survived.",
  speakers: "Two speakers, one recovered signal. Music should feel found, not listed.",
  ipad: "A black glass surface for clips, video scraps, pictures, and future socials.",
  notebook: "The private layer: rough thoughts, page turns, lyric dust, unfinished systems.",
  map: "A physical route into places. Later, every pin can become a room.",
};

export function MemoryReveal({
  activeObject,
  memories,
  selectedDate,
}: MemoryRevealProps) {
  const feature = memories[0];

  return (
    <section className="pointer-events-none absolute inset-x-4 bottom-4 z-30 mx-auto max-w-3xl rounded-md border border-[#f1cf8a]/25 bg-[#100d0a]/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:bottom-6 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.28em] text-[#e2b85f]">
            {objectNames[activeObject]} unlocked
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#f8f2e7]">
            {feature?.title ?? "Nothing recovered yet"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#d7c5a3]">
            {feature?.clue ?? objectCopy[activeObject]}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#9f8f74]">
            {formatDate(selectedDate)}
            {feature ? ` / ${feature.type}` : " / empty state"}
          </p>
        </div>

        <div className="min-h-24 w-full rounded-sm border border-[#f1cf8a]/15 bg-black/30 p-3 sm:w-52">
          {activeObject === "speakers" ? <Waveform /> : null}
          {activeObject === "map" ? <MiniMap /> : null}
          {activeObject === "ipad" ? <MediaPreview /> : null}
          {activeObject === "notebook" ? <NotebookLines /> : null}
          {activeObject === "monitor" ? (
            <div className="grid grid-cols-2 gap-2">
              {memories.slice(0, 4).map((memory) => (
                <span
                  key={memory.id}
                  className="rounded-sm bg-[#e5b85d]/15 px-2 py-2 text-xs text-[#f5d182]"
                >
                  {memory.location.desktopFolder}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Waveform() {
  return (
    <div className="flex h-24 items-center justify-center gap-1">
      {[28, 52, 36, 76, 44, 62, 30, 70, 38, 54, 26].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-2 rounded-full bg-[#e5b85d]"
          style={{ height }}
        />
      ))}
    </div>
  );
}

function MiniMap() {
  return (
    <div className="relative h-24 overflow-hidden rounded-sm bg-[#8e7444]">
      <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_44%,#2b2118_44%_50%,transparent_50%),linear-gradient(70deg,transparent_0_57%,rgba(255,236,182,0.34)_57%_60%,transparent_60%)]" />
      <span className="absolute left-[58%] top-[45%] h-4 w-4 rounded-full border border-[#17110d] bg-[#e5b85d]" />
      <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.22em] text-[#17110d]">
        route found
      </span>
    </div>
  );
}

function MediaPreview() {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-[#efe4cf]">
      <Image
        src="/assets/gold-alien-music-lover"
        alt="Recovered media preview"
        width={92}
        height={92}
        className="object-contain"
      />
      <span className="absolute bottom-2 right-2 rounded-sm bg-[#17110d] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#e5b85d]">
        clip
      </span>
    </div>
  );
}

function NotebookLines() {
  return (
    <div className="h-24 rounded-sm bg-[#d7c39c] p-3 text-[#17110d]">
      <span className="mb-3 block h-3 w-24 rounded-sm bg-[#17110d]/60" />
      <span className="mb-2 block h-px bg-[#8f7241]" />
      <span className="mb-2 block h-px bg-[#8f7241]" />
      <span className="block h-px w-2/3 bg-[#8f7241]" />
    </div>
  );
}
