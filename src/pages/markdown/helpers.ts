import { Dispatch, SetStateAction } from 'react';

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const storageKey = 'markdown';

export const loadMarkdownFromSaved = async (
  setter: Dispatch<SetStateAction<string | undefined>>
): Promise<void> => {
  await sleep();
  const text = window.localStorage.getItem(storageKey) || '';
  setter(text);
};

export const saveMarkdown = async (text: string | undefined): Promise<void> => {
  await sleep();
  window.localStorage.setItem(storageKey, text || '');
};
