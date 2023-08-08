"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TaskCard from "../TaskCard";
import ChildTask from "./ChildTask";
import { DraggableLocation } from "react-beautiful-dnd";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

type TaskComponentProps = {
  tasks: ListProps[];
};

type DragEndprops = {
  type?: "inner" | "outer";
  destination: DraggableLocation | null | undefined;
  source: DraggableLocation;
  parentIndex?: number;
};

export default function TaskComponent({ tasks }: TaskComponentProps) {
  console.log("🚀 ~ file: index.tsx:42 ~ TaskComponent ~ tasks:", tasks);
  const [isDraggingDisabled, setIsDragingDisabled] = useState(true);
  const [list, setList] = useState<ListProps[]>([]);
  const [itemId, setItemId] = useState<string | number | null>(null);

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  const updateList = (
    list: ListProps[],
    parentIndex: number,
    newList: ListProps[],
    updatedList?: ListItem[]
  ) => {
    list.forEach((element, index) => {
      if (index !== parentIndex) {
        newList.push(element);
      } else {
        newList.push({ ...element, subtask: updatedList });
      }
    });
  };

  const reorderOuter = (srcIndex: number, destIndex: number) => {
    var updatedList = list;
    const [reorderedItem] = updatedList.splice(srcIndex, 1);
    updatedList.splice(destIndex, 0, reorderedItem);
    setList(updatedList);
  };

  const reorderInner = (
    srcIndex: number,
    destIndex: number,
    parentIndex?: number
  ) => {
    if (parentIndex) {
      let updatedList = [...(list[parentIndex]?.subtask || [])];
      const [reorderedItem] = updatedList.splice(srcIndex, 1);
      updatedList.splice(destIndex, 0, reorderedItem);
      let newList: ListProps[] = [];
      updateList(list, parentIndex, newList, updatedList);
      setList(newList);
    }
  };

  const onDragEnd = ({
    type,
    destination,
    source,
    parentIndex,
  }: DragEndprops) => {
    if (source && destination && type) {
      const srcIndex = source.index;
      const destIndex = destination.index;

      if (type === "inner") {
        reorderInner(srcIndex, destIndex, parentIndex);
      } else {
        reorderOuter(srcIndex, destIndex);
      }
    }
  };

  const onCheckChange = ({ type, index, parentIndex }: CheckChangeProps) => {
    if (type === "inner" && parentIndex) {
      let updatedChildList = list[parentIndex]?.subtask || [];
      updatedChildList[index].done = !updatedChildList[index].done;
      let newList: ListProps[] = [];
      updateList(list, parentIndex, newList, updatedChildList);
      setList(newList);
    } else if (type === "outer") {
      let updatedList = list;
      // if (updatedList[index]?.subtask?.length) {
      //   let newSubtaskList: ListItem[] = [];
      //   updatedList[index]?.subtask?.forEach((item) => {
      //     newSubtaskList.push({ ...item, done: !item?.done });
      //   });
      //   updatedList[index].subtask = newSubtaskList;
      // }
      updatedList[index].done = !updatedList[index].done;
      setList(updatedList);
    }
  };

  return (
    <DragDropContext
      onDragEnd={(droppedItem) =>
        onDragEnd({
          source: droppedItem?.source,
          destination: droppedItem?.destination,
          type: "outer",
        })
      }
    >
      <Droppable droppableId="listContainer">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="listContainer w-full"
          >
            {list?.map((item, index) => {
              return (
                <Draggable
                  isDragDisabled={isDraggingDisabled}
                  key={item.id.toString()}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(drProvided) => (
                    <div
                      className="item-container w-full"
                      key={item?.id}
                      ref={drProvided.innerRef}
                      {...drProvided.draggableProps}
                      {...drProvided.dragHandleProps}
                    >
                      <TaskCard
                        id={item?.id}
                        collapsible={!!item?.subtask?.length}
                        collapsed={itemId === item?.id}
                        onCollapse={() =>
                          setItemId((prev) =>
                            prev === item?.id ? null : item?.id
                          )
                        }
                        childs={item?.subtask}
                        isChecked={item?.done}
                        onCheckChange={() =>
                          onCheckChange({ type: "outer", index: index })
                        }
                        onDrag={() => setIsDragingDisabled(false)}
                        onDrop={() => setIsDragingDisabled(true)}
                        hasChild={!!item?.subtask?.length}
                        taskName={item?.taskName}
                      />
                      {itemId === item?.id && (
                        <ChildTask
                          onCheckChange={onCheckChange}
                          subtask={item?.subtask}
                          parentIndex={index}
                          onDragEnd={onDragEnd}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
