import { SectionType } from "@/app/(protected)/board/_types/section";
import { TaskType } from "@/app/(protected)/board/_types/task";

export const handleDrop = (el: Element, items: SectionType[] | TaskType[]) => {
  let midId = el.id.split("section-")[1];
  let beforeId = el.previousElementSibling?.id.split("section-")[1];
  let afterId = el.nextElementSibling?.id.split("section-")[1];
  //const midSection = items.find((item) => item.id === +midId);
  const beforeSection = beforeId
    ? items.find((item) => item.id === Number(beforeId))
    : null;
  const afterSection = afterId
    ? items.find((item) => item.id === Number(afterId))
    : null;

  if (beforeSection && afterSection) {
    return (+beforeSection.priority + +afterSection.priority) / 2;
  }
  if (beforeSection && !afterSection) {
    return +beforeSection.priority + 1000;
  } else if (!beforeSection && afterSection) {
    return +afterSection.priority - 1000;
  } else {
    return 100000;
  }
};

export const handleTaskDrop = (el: Element, items: TaskType[]) => {
  //let midId = el.id.split("task-")[1];
  let beforeId = el.previousElementSibling?.id.split("task-")[1];
  let afterId = el.nextElementSibling?.id.split("task-")[1];

  const beforeTask = beforeId
    ? items.find((item) => item.id === Number(beforeId))
    : null;
  const afterTask = afterId
    ? items.find((item) => item.id === Number(afterId))
    : null;

  if (beforeTask && afterTask) {
    return (+beforeTask.priority + +afterTask.priority) / 2;
  }
  if (beforeTask && !afterTask) {
    return +beforeTask.priority + 1000;
  } else if (!beforeTask && afterTask) {
    return +afterTask.priority - 1000;
  } else {
    return 100000;
  }
};
