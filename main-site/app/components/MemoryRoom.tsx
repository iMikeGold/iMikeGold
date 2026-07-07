"use client";

import { useMemo, useState } from "react";
import { memories } from "../data/memories";
import {
  getMemoriesForFolder,
  getMemoriesForObject,
  getRelevantMemories,
} from "../engine/memoryQuery";
import type { FolderName, MemoryObject, RoomObjectId } from "../types/memory";
import {
  IPad,
  MapObject,
  Monitor,
  Notebook,
  StudioSpeaker,
} from "./RoomObjects";

export function MemoryRoom() {
  const [selectedDate, setSelectedDate] = useState("2026-07-07");
  const [activeObject, setActiveObject] = useState<RoomObjectId>("monitor");
  const [activeFolder, setActiveFolder] = useState<FolderName>("Projects");
  const [selectedMemory, setSelectedMemory] = useState<MemoryObject>();
  const [mapOpen, setMapOpen] = useState(false);

  const relevantMemories = useMemo(
    () => getRelevantMemories(memories, selectedDate),
    [selectedDate],
  );

  const objectMemories = useMemo(
    () => getMemoriesForObject(memories, selectedDate, activeObject),
    [activeObject, selectedDate],
  );

  const folderMemories = useMemo(
    () => getMemoriesForFolder(memories, selectedDate, activeFolder),
    [activeFolder, selectedDate],
  );

  const selectedAudio =
    selectedMemory?.media?.kind === "audio" ? selectedMemory.media.href : undefined;

  function openMemory(memory: MemoryObject) {
    setSelectedMemory(memory);
    setActiveObject(memory.location.roomObject);
    if (memory.location.roomObject === "speakers") {
      setActiveFolder("Music");
    }
    if (memory.location.roomObject === "ipad") {
      setActiveObject("ipad");
    }
  }

  return (
    <main className="h-[100dvh] overflow-hidden bg-[#0e0d0c] text-[#f8f2e7]">
      <section className="relative h-full min-h-[620px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(230,189,104,0.2),transparent_36%),linear-gradient(180deg,#15120f_0%,#201a14_52%,#0b0908_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent,#332214_28%,#15100c)]" />
        <div className="absolute left-[7%] right-[7%] bottom-[9%] h-[18%] rounded-t-md bg-[#5b3925] shadow-[0_-18px_60px_rgba(0,0,0,0.38)]" />
        <div className="absolute left-[13%] right-[13%] bottom-[5%] h-[9%] rounded-md bg-[#69432c] shadow-xl" />

        <MapObject
          active={activeObject === "map" || mapOpen}
          onActivate={() => {
            setActiveObject("map");
            setMapOpen(true);
          }}
        />

        <Monitor
          active={activeObject === "monitor"}
          activeFolder={activeFolder}
          folderMemories={folderMemories}
          selectedDate={selectedDate}
          selectedMemory={selectedMemory}
          onActivate={() => setActiveObject("monitor")}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedMemory(undefined);
          }}
          onFolderSelect={(folder) => {
            setActiveFolder(folder);
            setActiveObject("monitor");
          }}
          onMemoryOpen={openMemory}
        />

        <StudioSpeaker
          active={activeObject === "speakers"}
          playing={Boolean(selectedAudio)}
          side="left"
          onActivate={() => {
            setActiveObject("speakers");
            setActiveFolder("Music");
          }}
        />
        <StudioSpeaker
          active={activeObject === "speakers"}
          playing={Boolean(selectedAudio)}
          side="right"
          onActivate={() => {
            setActiveObject("speakers");
            setActiveFolder("Music");
          }}
        />

        <IPad
          active={activeObject === "ipad"}
          selectedMemory={selectedMemory}
          onActivate={() => {
            setActiveObject("ipad");
            setActiveFolder("Videos");
          }}
        />
        <Notebook
          active={activeObject === "notebook"}
          onActivate={() => {
            setActiveObject("notebook");
            setActiveFolder("Writing");
          }}
        />

        <SignalOverlay
          activeObject={activeObject}
          memories={objectMemories.length ? objectMemories : relevantMemories}
          selectedMemory={selectedMemory}
          onOpenMemory={openMemory}
        />

        {mapOpen ? (
          <MapOverlay
            onClose={() => setMapOpen(false)}
            onSelect={(memory) => {
              setSelectedDate(memory.date);
              openMemory(memory);
              setMapOpen(false);
            }}
          />
        ) : null}

        {selectedAudio ? (
          <div className="absolute bottom-3 left-1/2 z-40 w-[min(520px,88vw)] -translate-x-1/2 rounded-md border border-[#f1cf8a]/20 bg-[#080604]/92 p-3 shadow-2xl shadow-black/60">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#e5b85d]">
              routing audio through studio speakers
            </p>
            <audio className="w-full" controls src={selectedAudio} />
          </div>
        ) : null}
      </section>
    </main>
  );
}

type SignalOverlayProps = {
  activeObject: RoomObjectId;
  memories: MemoryObject[];
  selectedMemory?: MemoryObject;
  onOpenMemory: (memory: MemoryObject) => void;
};

function SignalOverlay({
  activeObject,
  memories,
  selectedMemory,
  onOpenMemory,
}: SignalOverlayProps) {
  if (activeObject === "monitor") {
    return null;
  }

  const feature = selectedMemory ?? memories[0];

  return (
    <div className="absolute left-1/2 top-[8%] z-40 w-[min(560px,88vw)] -translate-x-1/2 rounded-md border border-[#f1cf8a]/25 bg-[#100d0a]/92 p-4 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#e5b85d]">
            signal recovered
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            {feature?.title ?? "Nothing answering yet"}
          </h2>
        </div>
        {memories[0] ? (
          <button
            className="rounded-sm border border-[#f1cf8a]/20 px-2 py-1 text-xs text-[#d7c5a3]"
            onClick={() => onOpenMemory(memories[0])}
          >
            refocus
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-[#d7c5a3]">
        {feature?.clue ?? "The object reacts, but the archive has no close match for this date."}
      </p>
    </div>
  );
}

type MapOverlayProps = {
  onClose: () => void;
  onSelect: (memory: MemoryObject) => void;
};

function MapOverlay({ onClose, onSelect }: MapOverlayProps) {
  const placeMemories = memories.filter((memory) => memory.type === "place");

  return (
    <div className="absolute inset-0 z-50 bg-[#100d0a]/82 p-4 backdrop-blur-sm">
      <div className="relative h-full overflow-hidden rounded-md border border-[#f1cf8a]/30 bg-[#8e7444] shadow-2xl">
        <button
          className="absolute right-4 top-4 z-20 rounded-sm bg-[#17110d] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#e5b85d]"
          onClick={onClose}
        >
          close
        </button>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_38%,rgba(43,33,24,0.85)_38%_42%,transparent_42%),linear-gradient(68deg,transparent_0_58%,rgba(255,235,174,0.28)_58%_60%,transparent_60%),linear-gradient(115deg,transparent_0_48%,rgba(43,33,24,0.55)_48%_51%,transparent_51%)]" />
        <div className="absolute left-6 top-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#17110d]">
            Time map
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-[#17110d]">
            pick a coordinate
          </h2>
        </div>
        {placeMemories.map((memory, index) => (
          <button
            key={memory.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#17110d] bg-[#e5b85d] px-3 py-2 text-xs font-semibold text-[#17110d] shadow-xl"
            style={{
              left: `${index === 0 ? 56 : 34}%`,
              top: `${index === 0 ? 48 : 38}%`,
            }}
            onClick={() => onSelect(memory)}
          >
            {memory.title}
          </button>
        ))}
      </div>
    </div>
  );
}
