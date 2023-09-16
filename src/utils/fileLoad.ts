export const loadTextFile = async (path: string, callBack: (data: string) => void): Promise<void> => {
    try {
        const response = await fetch(path);
        const data = await response.text();
        callBack(data);
    } catch (error) {
        throw error;
    }
} 