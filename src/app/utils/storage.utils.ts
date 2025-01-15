// src/app/utils/storage.util.ts
export const saveUrlsToStorage = (urls: any[]) => {
    localStorage.setItem('urls', JSON.stringify(urls));
  };
  
  export const loadUrlsFromStorage = (): any[] => {
    const urls = localStorage.getItem('urls');
    return urls ? JSON.parse(urls) : [];
  };

  // src/app/utils/storage.util.ts
export const exportUrls = () => {
    const urls = loadUrlsFromStorage();
    const data = JSON.stringify(urls);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urls.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  export const importUrls = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const urls = JSON.parse(reader.result as string);
      saveUrlsToStorage(urls);
      window.location.reload(); // Refresh to reflect changes
    };
    reader.readAsText(file);
  };