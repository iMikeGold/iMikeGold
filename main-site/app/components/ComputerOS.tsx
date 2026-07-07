import Image from "next/image";
import { useState } from "react";
import { folderNames } from "../data/memories";
import { formatDate } from "../engine/memoryQuery";
import type { FolderName, MemoryObject } from "../types/memory";

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

      <div
        className="grid min-h-0 flex-1 grid-cols-[92px_1fr] sm:grid-cols-[124px_1fr]"
        style={{ background: desktopWallpaper }}
      >
        <nav className="grid content-start gap-1 overflow-y-auto border-r border-[#f1cf8a]/15 p-2 sm:gap-2 sm:p-3">
          {folderNames.map((folder) => (
            <button
              key={folder}
              className={`flex h-[32px] flex-col items-center justify-center rounded-sm border px-1 text-center text-[9px] transition sm:h-[48px] sm:text-[10px] ${
                folder === activeFolder
                  ? "border-[#e5b85d] bg-[#e5b85d]/20 text-[#f5d182]"
                  : "border-white/10 bg-black/20 text-[#d7c5a3] hover:border-[#f1cf8a]/35"
              }`}
              onClick={() => onFolderSelect(folder)}
            >
              <span className="text-[11px] leading-none sm:text-base">▣</span>
              <span className="truncate">{folder}</span>
            </button>
          ))}
        </nav>

        <div className="grid min-w-0 grid-rows-[1fr_auto] gap-3 p-3">
          <div className="grid auto-rows-[62px] grid-cols-2 gap-2 overflow-auto pr-1 sm:auto-rows-[74px] sm:grid-cols-3">
            {folderMemories.map((memory) => (
              <button
                key={memory.id}
                className={`rounded-sm border p-2 text-left transition hover:-translate-y-0.5 ${
                  selectedMemory?.id === memory.id
                    ? "border-[#e5b85d] bg-[#e5b85d]/15"
                    : "border-[#f1cf8a]/15 bg-black/25 hover:border-[#f1cf8a]/45"
                }`}
                onClick={() => onMemoryOpen(memory)}
              >
                <span className="mb-1 inline-flex rounded-sm bg-[#e5b85d] px-1.5 py-0.5 text-[10px] font-bold text-[#17110d]">
                  {memory.icon}
                </span>
                <span className="line-clamp-2 block text-xs font-semibold text-[#f8f2e7]">
                  {memory.title}
                </span>
              </button>
            ))}
            {!folderMemories.length ? (
              <div className="col-span-2 rounded-sm border border-dashed border-[#f1cf8a]/20 bg-black/20 p-3 text-xs leading-5 text-[#b8a98b] sm:col-span-3">
                Empty drawer. Move through time or pick another folder.
              </div>
            ) : null}
          </div>

          <div className="min-h-[76px] rounded-sm border border-[#f1cf8a]/15 bg-black/30 p-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#e5b85d]">
              Selected file
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-[#f8f2e7]">
              {selectedMemory?.clue ?? "Choose a file. Hardware in the room will react."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
