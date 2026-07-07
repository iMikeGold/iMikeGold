import Image from "next/image";
import { useState } from "react";
import { folderNames } from "../data/memories";
import { formatDate } from "../engine/memoryQuery";
import type { FileIcon, FolderName, MemoryObject } from "../types/memory";

type BootState = "off" | "booting" | "login" | "desktop";

type ComputerOSProps = {
  activeFolder: FolderName;
  folderMemories: MemoryObject[];
  selectedDate: string;
  selectedMemory?: MemoryObject;
  onDateChange: (date: string) => void;
  onFolderSelect: (folder: FolderName) => void;
  onMemoryOpen: (memory: MemoryObject) => void;
};

const desktopWallpaper =
  "radial-gradient(circle at 15% 10%, rgba(229,184,88,0.24), transparent 36%), linear-gradient(135deg, #111922, #07090d 68%)";

const fileTypeStyles: Record<FileIcon, { bg: string; label: string; mark: string }> = {
  APP: { bg: "bg-[#e5b85d]", label: "text-[#f5d182]", mark: "APP" },
  AUD: { bg: "bg-[#4fd1c5]", label: "text-[#b7fff7]", mark: "AUD" },
  DOC: { bg: "bg-[#f0eee4]", label: "text-[#f8f2e7]", mark: "DOC" },
  PIN: { bg: "bg-[#f97316]", label: "text-[#fed7aa]", mark: "PIN" },
  TXT: { bg: "bg-[#c4b5fd]", label: "text-[#ede9fe]", mark: "TXT" },
  VID: { bg: "bg-[#fb7185]", label: "text-[#ffe4e6]", mark: "VID" },
};

export function ComputerOS({
  activeFolder,
  folderMemories,
  selectedDate,
  selectedMemory,
  onDateChange,
  onFolderSelect,
  onMemoryOpen,
}: ComputerOSProps) {
  const [bootState, setBootState] = useState<BootState>("off");
  const [password, setPassword] = useState("");

  if (bootState === "off") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-sm bg-[#020202]">
        <button
          className="group flex flex-col items-center gap-4 text-[#e5b85d] outline-none"
          onClick={(event) => {
            event.stopPropagation();
            setBootState("booting");
            window.setTimeout(() => setBootState("login"), 900);
          }}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e5b85d]/50 bg-[#e5b85d]/10 text-2xl shadow-[0_0_36px_rgba(229,184,88,0.28)] transition group-hover:bg-[#e5b85d]/20">
            ⏻
          </span>
          <span className="text-xs uppercase tracking-[0.28em]">
            Power
          </span>
        </button>
        <span className="absolute bottom-4 right-5 h-2 w-2 rounded-full bg-[#33251a]" />
      </div>
    );
  }

  if (bootState === "booting") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 rounded-sm bg-[#050505] text-[#e5b85d]">
        <Image
          src="/assets/images/gold-alien-music-lover"
          alt="Memory Bank OS logo"
          width={86}
          height={86}
          className="rounded-full bg-white"
          priority
        />
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.28em]">Memory Bank OS</p>
          <p className="mt-2 text-xs text-[#9f8f74]">initialising archive...</p>
        </div>
      </div>
    );
  }

  if (bootState === "login") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-sm bg-[#080a0d] p-6 text-center">
        <Image
          src="/assets/images/gold-alien-music-lover"
          alt="Memory Bank OS profile"
          width={74}
          height={74}
          className="rounded-full bg-white"
          priority
        />
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#e5b85d]">
            Memory Bank OS
          </p>
          <p className="mt-2 text-xs text-[#b8a98b]">curious user login</p>
        </div>
        <form
          className="flex w-full max-w-xs flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setBootState("desktop");
          }}
        >
          <input
            aria-label="Computer password"
            className="rounded-sm border border-[#f1cf8a]/25 bg-black/50 px-3 py-2 text-center text-sm text-[#f8f2e7] outline-none focus:border-[#e5b85d]"
            placeholder="enter anything"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="rounded-sm bg-[#e5b85d] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#17110d]">
            Log on
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-[#f1cf8a]/20 bg-[#101820]">
      <div className="flex items-center justify-between border-b border-[#f1cf8a]/20 bg-[#d9b563] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#17110d] sm:text-xs">
        <span>Memory Bank OS</span>
        <label className="flex items-center gap-2">
          <span className="hidden sm:inline">{formatDate(selectedDate)}</span>
          <input
            aria-label="Time Machine date"
            className="w-[7.8rem] rounded-sm border border-[#17110d]/20 bg-[#f6d98f] px-2 py-1 text-[11px] text-[#17110d] outline-none"
            max="2026-07-07"
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
            onInput={(event) =>
              onDateChange((event.target as HTMLInputElement).value)
            }
          />
        </label>
      </div>

      <div className="min-h-0 flex-1" style={{ background: desktopWallpaper }}>
        <div className="grid h-full min-h-0 grid-rows-[auto_1fr_minmax(48px,72px)] gap-2 p-2 sm:gap-3 sm:p-3">
          <nav className="flex gap-2 overflow-x-auto border-b border-[#f1cf8a]/15 pb-2">
            {folderNames.map((folder) => (
              <button
                key={folder}
                className={`grid h-[58px] w-[58px] flex-none place-items-center rounded-sm outline-none transition sm:h-[66px] sm:w-[70px] ${
                  folder === activeFolder
                    ? "bg-[#e5b85d]/15 text-[#f5d182]"
                    : "text-[#d7c5a3] hover:bg-white/5"
                }`}
                onClick={() => onFolderSelect(folder)}
                title={folder}
              >
                <span
                  className={`grid h-7 w-9 place-items-center rounded-[3px] border border-[#f1cf8a]/25 ${
                    folder === activeFolder ? "bg-[#e5b85d]" : "bg-[#d6a84f]"
                  } text-[10px] font-bold text-[#17110d] shadow-lg`}
                >
                  DIR
                </span>
                <span className="block max-w-full truncate px-1 text-[10px] leading-tight">
                  {folder}
                </span>
              </button>
            ))}
          </nav>

          <div className="min-h-0 overflow-y-auto pr-1">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-x-3 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(82px,1fr))]">
            {folderMemories.map((memory) => (
              <button
                key={memory.id}
                className={`grid min-w-0 justify-items-center rounded-sm p-1 text-center outline-none transition ${
                  selectedMemory?.id === memory.id
                    ? "bg-[#e5b85d]/15"
                    : "hover:bg-white/5"
                }`}
                onClick={() => onMemoryOpen(memory)}
                title={memory.title}
              >
                <span
                  className={`relative grid h-10 w-9 place-items-center rounded-[4px] border border-white/20 ${fileTypeStyles[memory.icon].bg} text-[9px] font-black text-[#17110d] shadow-lg sm:h-12 sm:w-11`}
                >
                  <span className="absolute right-0 top-0 h-3 w-3 rounded-bl-sm bg-white/50" />
                  {fileTypeStyles[memory.icon].mark}
                </span>
                <span
                  className={`mt-1 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-[10px] leading-tight ${fileTypeStyles[memory.icon].label}`}
                >
                  {memory.title}
                </span>
              </button>
            ))}
            {!folderMemories.length ? (
              <div className="col-span-full rounded-sm border border-dashed border-[#f1cf8a]/20 bg-black/20 p-3 text-xs leading-5 text-[#b8a98b]">
                Empty drawer. Move through time or pick another folder.
              </div>
            ) : null}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto rounded-sm border border-[#f1cf8a]/15 bg-black/30 p-2 sm:p-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#e5b85d] sm:text-[10px]">
              Selected file
            </p>
            <p className="mt-1 text-xs leading-5 text-[#f8f2e7] sm:text-sm">
              {selectedMemory?.clue ??
                "Choose a file. Hardware in the room will react."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
