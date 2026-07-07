import Image from "next/image";
import type { FolderName, MemoryObject, RoomObjectId } from "../types/memory";
import { ComputerOS } from "./ComputerOS";

type ObjectProps = {
  active: boolean;
  onActivate: () => void;
};

type MonitorProps = ObjectProps & {
  activeFolder: FolderName;
  folderMemories: MemoryObject[];
  selectedDate: string;
  selectedMemory?: MemoryObject;
  onDateChange: (date: string) => void;
  onFolderSelect: (folder: FolderName) => void;
  onMemoryOpen: (memory: MemoryObject) => void;
};

type SpeakerProps = ObjectProps & {
  side: "left" | "right";
  playing: boolean;
};

type IPadProps = ObjectProps & {
  selectedMemory?: MemoryObject;
};

const activeGlow = "ring-2 ring-[#f1cf8a] ring-offset-2 ring-offset-[#181410]";

export function Monitor({
  active,
  activeFolder,
  folderMemories,
  selectedDate,
  selectedMemory,
  onActivate,
  onDateChange,
  onFolderSelect,
  onMemoryOpen,
}: MonitorProps) {
  return (
    <div
      className={`absolute left-1/2 top-[24%] z-30 h-[31%] w-[84%] min-w-[310px] max-w-[860px] -translate-x-1/2 rounded-[18px] border-[10px] border-[#111] bg-[#050505] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.75)] transition sm:top-[18%] sm:h-[48%] sm:w-[62%] ${
        active ? activeGlow : ""
      }`}
      onClick={onActivate}
    >
      <div className="h-full overflow-hidden rounded-md border border-[#f1cf8a]/20 bg-black">
        <ComputerOS
          activeFolder={activeFolder}
          folderMemories={folderMemories}
          selectedDate={selectedDate}
          selectedMemory={selectedMemory}
          onDateChange={onDateChange}
          onFolderSelect={onFolderSelect}
          onMemoryOpen={onMemoryOpen}
        />
      </div>
      <div className="absolute left-1/2 top-full h-[6vh] w-[8%] min-w-12 -translate-x-1/2 bg-[#111]" />
      <div className="absolute left-1/2 top-[calc(100%+5vh)] h-3 w-[30%] -translate-x-1/2 rounded-full bg-[#151515]" />
    </div>
  );
}

export function StudioSpeaker({ active, playing, side, onActivate }: SpeakerProps) {
  const sideClass =
    side === "left"
      ? "left-[2%] sm:left-[8%] md:left-[10%]"
      : "right-[2%] sm:right-[8%] md:right-[10%]";

  return (
    <button
      aria-label={`Open ${side} speaker`}
      className={`absolute ${sideClass} top-[34%] z-20 h-[24%] w-[15%] min-w-[58px] max-w-[130px] rounded-md border border-[#f1cf8a]/25 bg-[#0d0d0d] p-2 shadow-2xl outline-none transition hover:-translate-y-1 hover:border-[#f1cf8a] sm:h-[29%] ${
        active ? activeGlow : ""
      }`}
      onClick={onActivate}
    >
      <span
        className={`mx-auto mt-2 block aspect-square w-[72%] rounded-full border-[9px] border-[#2d2924] bg-[#050505] shadow-inner shadow-black ${
          playing ? "shadow-[0_0_28px_rgba(229,184,88,0.45)]" : ""
        }`}
      />
      <span
        className={`mx-auto mt-[18%] block h-2 w-[18%] rounded-full ${
          playing ? "bg-[#e5b85d]" : "bg-[#4a3724]"
        }`}
      />
      <span className="sr-only">Speaker hardware</span>
    </button>
  );
}

export function IPad({ active, selectedMemory, onActivate }: IPadProps) {
  const isMedia =
    selectedMemory?.media?.kind === "image" || selectedMemory?.media?.kind === "video";

  return (
    <button
      aria-label="Open iPad display"
      className={`absolute bottom-[11%] right-[8%] z-[25] h-[18%] w-[28%] max-w-[310px] rotate-1 rounded-[18px] border-[8px] border-[#202020] bg-[#050505] p-2 shadow-xl outline-none transition hover:rotate-0 hover:border-[#f1cf8a] sm:right-[13%] sm:h-[20%] sm:w-[24%] ${
        active ? activeGlow : ""
      }`}
      onClick={onActivate}
    >
      <span className="relative flex h-full items-center justify-center overflow-hidden rounded-md border border-[#f1cf8a]/20 bg-[#efe4cf]">
        {isMedia && selectedMemory?.media ? (
          <Image
            src={selectedMemory.media.href}
            alt={selectedMemory.title}
            width={260}
            height={160}
            priority
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <Image
            src="/assets/images/gold-alien-music-lover"
            alt="iPad media preview"
            width={180}
            height={120}
            priority
            className="h-full w-full object-contain p-3"
          />
        )}
      </span>
    </button>
  );
}

export function Notebook({ active, onActivate }: ObjectProps) {
  return (
    <button
      aria-label="Open notebook"
      className={`absolute bottom-[10%] left-[15%] z-[25] h-[18%] w-[27%] max-w-[300px] -rotate-3 rounded-sm border border-[#f1cf8a]/30 bg-[#d7c39c] p-4 text-left text-[#17110d] shadow-2xl outline-none transition hover:rotate-0 hover:border-[#f1cf8a] sm:left-[18%] sm:h-[19%] ${
        active ? activeGlow : ""
      }`}
      onClick={onActivate}
    >
      <span className="block border-b border-[#8f7241] pb-2 text-sm font-semibold">
        Notebook
      </span>
      <span className="mt-2 line-clamp-2 block text-xs">
        torn pages, unfinished ideas
      </span>
    </button>
  );
}

export function MapObject({ active, onActivate }: ObjectProps) {
  return (
    <button
      aria-label="Open wall map"
      className={`absolute left-[6%] right-[6%] top-[6%] z-10 h-[30%] rounded-sm border border-[#c99f57]/25 bg-[#8e7444]/65 p-3 shadow-xl outline-none transition hover:border-[#f1cf8a] sm:left-[13%] sm:right-[13%] sm:h-[26%] ${
        active ? activeGlow : ""
      }`}
      onClick={onActivate}
    >
      <span className="relative block h-full overflow-hidden rounded-sm border border-[#d7b77a]/25 bg-[#8e7444]/75">
        <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_38%,rgba(43,33,24,0.8)_38%_42%,transparent_42%),linear-gradient(68deg,transparent_0_58%,rgba(255,235,174,0.26)_58%_60%,transparent_60%),linear-gradient(115deg,transparent_0_48%,rgba(43,33,24,0.55)_48%_51%,transparent_51%)]" />
        <span className="absolute left-[52%] top-[46%] h-4 w-4 rounded-full border border-[#17110d] bg-[#e5b85d]" />
        <span className="absolute left-[30%] top-[34%] h-3 w-3 rounded-full border border-[#17110d] bg-[#e5b85d]/80" />
        <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.24em] text-[#f5d182]">
          wall map
        </span>
      </span>
    </button>
  );
}

export const objectNames: Record<RoomObjectId, string> = {
  monitor: "Monitor",
  speakers: "Speakers",
  ipad: "iPad",
  notebook: "Notebook",
  map: "Map",
};
