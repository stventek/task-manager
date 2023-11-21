import { SectionType } from "@/app/(protected)/board/_types/section";
import { TaskType } from "@/app/(protected)/board/_types/task";
import { LexoRank } from "lexorank";

export const handleDrop = (el: Element, items: SectionType[]) => {
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
    const beforeSectionRank = LexoRank.parse(beforeSection.priority);
    const afterSectionRank = LexoRank.parse(afterSection.priority);
    return beforeSectionRank.between(afterSectionRank).toString();
  }
  if (beforeSection && !afterSection) {
    const beforeSectionRank = LexoRank.parse(beforeSection.priority);
    return beforeSectionRank.genNext().toString;
  } else if (!beforeSection && afterSection) {
    const afterSectionRank = LexoRank.parse(afterSection.priority);
    return afterSectionRank.genPrev().toString();
  } else {
    return LexoRank.middle().toString();
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
    const beforeTaskRank = LexoRank.parse(beforeTask.priority);
    const afterTaskRank = LexoRank.parse(afterTask.priority);
    return beforeTaskRank.between(afterTaskRank).toString();
  }
  if (beforeTask && !afterTask) {
    const beforeTaskRank = LexoRank.parse(beforeTask.priority);
    return beforeTaskRank.genNext().toString;
  } else if (!beforeTask && afterTask) {
    const afterTaskRank = LexoRank.parse(afterTask.priority);
    return afterTaskRank.genPrev().toString();
  } else {
    return LexoRank.middle().toString();
  }
};
