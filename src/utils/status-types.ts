export const StatusTypes = {
  CREATED: "created",
  IN_PROGRESS: "pending",
  DONE: "done",
  CANCELED: "canceled",
};

export const StatusTypesLabel = {
  [StatusTypes.CREATED]: "Создан",
  [StatusTypes.IN_PROGRESS]: "Готовится",
  [StatusTypes.DONE]: "Выполнен",
  [StatusTypes.CANCELED]: "Отменен",
};
