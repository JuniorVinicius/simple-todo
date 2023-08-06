"use client";
import InputAdd from "@/components/Inputs/InputAdd";
import SwitchPage from "@/components/SwitchPage";
import React, { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import dynamic from "next/dynamic";

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

const MOCK = [
  {
    id: 1,
    taskName: "Buy an car",
    done: false,
  },
  {
    id: 2,
    taskName: "Study",
    done: false,
    subtask: [
      {
        id: 2.1,
        taskName: "Math",
        done: false,
      },
      {
        id: 2.2,
        taskName: "English",
        done: false,
      },
    ],
  },
];

type ListItem = {
  id: string | number;
  taskName: string;
  done: boolean;
};

interface ListProps extends ListItem {
  subtask?: ListItem[];
}

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDraggingDisabled, setIsDragingDisabled] = useState(true);
  console.log("🚀 ~ file: page.tsx:68 ~ isDraggingDisabled:", isDraggingDisabled)
  const [list, setList] = useState<ListProps[]>(MOCK);

  const handleDrop = (droppedItem: any) => {
    if (!droppedItem.destination) return;
    var updatedList = [...list];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setList(updatedList);
  };

  const handleDropSubTask = (droppedItem: any, list?: ListItem[]) => {
    if (!droppedItem.destination) return;
    var updatedList = [...(list || [])];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setList(updatedList);
  };

  return (
    <div className="w-screen min-h-screen bg-slate-100 pt-5 flex flex-col items-center">
      <h1 className="text-2xl text-center align-baseline">
        Simple Todo<span className="animate-ping">|</span>
      </h1>

      <div className="min-w-80 w-4/5 max-w-xl flex flex-col items-start px-2">
        <div className="w-full py-10">
          <SwitchPage />
        </div>
        <InputAdd />
        <DragDropContext onDragEnd={handleDrop}>
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
                            collapse
                            onDrag={() => setIsDragingDisabled(false)}
                            onDrop={() => setIsDragingDisabled(true)}
                            hasChild={!!item?.subtask?.length}
                            taskName={item?.taskName}
                          />
                          {/* <DragDropContext
                              onDragEnd={(droppedItem) =>
                                handleDropSubTask(droppedItem, item?.subtask)
                              }
                            >
                              <Droppable droppableId="child-container">
                                {(childProvided) => (
                                  <div
                                    className="child-container w-full bg-light px-2 py-1"
                                    {...childProvided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {item?.subtask?.map((subItem, subIndex) => {
                                      return (
                                        <Draggable
                                          key={item?.id}
                                          draggableId={item?.id?.toString()}
                                          index={index}
                                        >
                                          {(DraggableChildProvided) => (
                                            <div
                                              className="cild-item-container"
                                              ref={
                                                DraggableChildProvided.innerRef
                                              }
                                              {...provided.dragHandleProps}
                                              {...provided.draggableProps}
                                            >
                                              <TaskCard
                                                isChild
                                                taskName={subItem?.taskName}
                                                id={subItem?.id}
                                              />
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                    {childProvided.placeholder}
                                    <div className="w-full pl-1">
                                      <InputAdd
                                        iconSize={16}
                                        title="Add New Subtask"
                                        placeholder="Subtask name"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext> */}
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
      </div>
    </div>
  );
}
