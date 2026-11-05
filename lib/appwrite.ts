import { Client, Databases, Storage, Account } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const restaurantsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_RESTAURANTS_COLLECTION_ID;
const menuCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID;

const client = new Client();
if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

export function getAppwriteConfig() {
  const resolvedRestaurantsCollectionId =
    restaurantsCollectionId || collectionId;
  const resolvedMenuCollectionId = menuCollectionId || collectionId;

  if (
    !endpoint ||
    !projectId ||
    !databaseId ||
    !resolvedRestaurantsCollectionId ||
    !resolvedMenuCollectionId
  ) {
    throw new Error(
      'Missing Appwrite configuration. Set NEXT_PUBLIC_APPWRITE_ENDPOINT, ' +
        'NEXT_PUBLIC_APPWRITE_PROJECT, NEXT_PUBLIC_APPWRITE_DATABASE_ID, ' +
        'NEXT_PUBLIC_APPWRITE_RESTAURANTS_COLLECTION_ID, and ' +
        'NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID.'
    );
  }

  return {
    databaseId,
    restaurantsCollectionId: resolvedRestaurantsCollectionId,
    menuCollectionId: resolvedMenuCollectionId,
  };
}

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { client };
