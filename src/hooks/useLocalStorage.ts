// import { useState, useEffect } from "react";

// export type useLocalStorageStateProps<T> = {
//   initialState: T;
//   key: string;
// };
// export function useLocalStorageState<T>(
//   initialState: T,
//   key: string
// ): [T, React.Dispatch<React.SetStateAction<T>>] {
//   const [value, setValue] = useState<T>(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialState;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue];
// }
