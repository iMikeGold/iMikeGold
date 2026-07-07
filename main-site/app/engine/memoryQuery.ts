import type { FolderName, MemoryObject, RoomObjectId } from "../types/memory";

function daysBetween(a: Date, b: Date) {
  const day = 1000 * 60 * 60 * 24;
  return (
    Math.abs(
      Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) -
        Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()),
    ) / day
  );
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function scoreMemory(memory: MemoryObject, selectedDate: string) {
  const selected = new Date(`${selectedDate}T00:00:00`);
  const memoryDate = new Date(`${memory.date}T00:00:00`);
  const distance = daysBetween(selected, memoryDate);
  const sameDay = selectedDate.slice(5) === memory.date.slice(5);
  const sameMonth = selectedDate.slice(5, 7) === memory.date.slice(5, 7);

  return (
    memory.importance * 2 -
    distance / 24 +
    (sameDay ? 22 : 0) +
    (sameMonth ? 5 : 0)
  );
}

export function getRelevantMemories(
  memories: MemoryObject[],
  selectedDate: string,
  limit?: number,
) {
  const ranked = [...memories]
    .map((memory) => ({ memory, score: scoreMemory(memory, selectedDate) }))
    .filter(({ score }) => score > -12)
    .sort(
      (a, b) =>
        b.score - a.score || b.memory.date.localeCompare(a.memory.date),
    )
    .map(({ memory }) => memory);

  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

export function getMemoriesForObject(
  memories: MemoryObject[],
  selectedDate: string,
  roomObject: RoomObjectId,
) {
  return getRelevantMemories(memories, selectedDate).filter(
    (memory) => memory.location.roomObject === roomObject,
  );
}

export function getMemoriesForFolder(
  memories: MemoryObject[],
  selectedDate: string,
  folder: FolderName,
) {
  return getRelevantMemories(memories, selectedDate).filter(
    (memory) => memory.location.desktopFolder === folder,
  );
}
