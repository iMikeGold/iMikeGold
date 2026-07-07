export type MemoryType = "music" | "photo" | "video" | "writing" | "project" | "place";

export type RoomObjectId = "monitor" | "speakers" | "ipad" | "notebook" | "map";

export type FolderName = "Music" | "Photos" | "Videos" | "Writing" | "Projects" | "Places";

export type FileIcon = "APP" | "AUD" | "DOC" | "PIN" | "TXT" | "VID";

export type MemoryObject = {
  id: string;
  title: string;
  type: MemoryType;
  date: string;
  description: string;
  clue: string;
  tags: string[];
  importance: number;
  location: {
    roomObject: RoomObjectId;
    desktopFolder: FolderName;
  };
  media?: {
    label: string;
    href: string;
    kind: "image" | "audio" | "video" | "external";
  };
  icon: FileIcon;
  relationships: string[];
  revision: {
    version: string;
    updated: string;
    note: string;
  };
};
