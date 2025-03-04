import { StylesConfig } from "react-select";
export const selectStyles: StylesConfig = {
  input: (base) => ({
    ...base,
    color: "#e5e7eb", // Цвет вводимого текста
    caretColor: "#fff", // Цвет каретки (мигающей полоски)
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 111111,
  }),
  control: (base) => ({
    ...base,
    minHeight: 40,
    borderColor: "#4b5563",
    backgroundColor: "#374151",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "#3b82f6" // Цвет выбранного элемента
      : isFocused
      ? "#1f2937" // Цвет при наведении
      : "#374151", // Базовый цвет списка
    color: "#e5e7eb", // Цвет текста
    "&:hover": {
      backgroundColor: "#1f2937",
      color: "#f3f4f6",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#374151",
    zIndex: 9999, // Чтобы меню не перекрывалось
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#9EA0A3", // Темный фон выбранного значения
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1F2937", // Цвет текста выбранного значения
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ef4444", // Красная кнопка удаления
      color: "white",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af", // Серый цвет плейсхолдера
  }),
  singleValue: (base) => ({
    ...base,
    color: "#e5e7eb", // Цвет выбранного текста
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "150px", // Высота списка (подгони под себя)
    overflowY: "auto", // Скролл при переполнении
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4b5563", // Цвет скролла
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#6b7280", // Цвет скролла при ховере
    },
  }),
};
