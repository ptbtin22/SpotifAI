export type RecentlyPlayedItem = {
  track: {
    id: string;
    name: string;
    album: {
      images: { url: string; width: number; height: number }[];
    };
    artists: { name: string }[];
  };
  played_at: string;
};

export type UserProfile = {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
};
