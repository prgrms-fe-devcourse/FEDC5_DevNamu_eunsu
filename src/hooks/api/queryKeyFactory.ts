export const authKeys = {
  userInfo: (token: string) => [token] as const,
};

export const channelsKeys = {
  allChannels: ["channels"] as const,
  channelById: (id: string) => [...channelsKeys.allChannels, id] as const,
};

export const threadKeys = {
  threadsByChannelId: (id: string | undefined) => ["threads", id] as const,
};

export const myThreadKeys = {};
