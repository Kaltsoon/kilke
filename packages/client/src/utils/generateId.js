const maxRunningId = 10000;

let runningId = 0;

const generateId = prefix => {
  const idPrefix = prefix ? `${prefix}-` : '';

  runningId = (runningId + 1) % maxRunningId;

  return `${idPrefix}${Date.now().toString(36)}${runningId.toString(36)}`;
};

export default generateId;
