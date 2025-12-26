export interface StorageSummary {
  message: string;
  items: unknown[];
}

export const StorageService = {
  list(): StorageSummary {
    return {
      message: 'Storage module scaffold ready. Implement your logic here.',
      items: [],
    };
  },
};
