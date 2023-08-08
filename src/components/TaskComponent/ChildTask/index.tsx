"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import TaskCard from "../../TaskCard";
import InputAdd from "../../Inputs/InputAdd";

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

type ChildTaskProps = {
  subtask?: ListItem[];
  parentIndex: number;
  onDragEnd: ({ type, destination, source }: any) => void;
};

export default function ChildTask({
  subtask,
  parentIndex,
  onDragEnd,
}: ChildTaskProps) {
  const [isDraggingChildDisabled, setIsDragingChildDisabled] = useState(true);

  return (
    <DragDropContext
      onDragEnd={(drItem) =>
        onDragEnd({
          ...drItem,
          type: "inner",
          parentIndex: parentIndex,
        })
      }
    >
      <Droppable droppableId="child-container">
        {(childProvided) => (
          <div
            className="child-container w-full bg-light px-2 py-1"
            {...childProvided.droppableProps}
            ref={childProvided.innerRef}
          >
            {subtask?.map((subItem, subIndex) => {
              return (
                <Draggable
                  key={subItem?.id}
                  isDragDisabled={isDraggingChildDisabled}
                  draggableId={subItem?.id?.toString()}
                  index={subIndex}
                >
                  {(DraggableChildProvided) => (
                    <div
                      className="cild-item-container"
                      ref={DraggableChildProvided.innerRef}
                      {...DraggableChildProvided.dragHandleProps}
                      {...DraggableChildProvided.draggableProps}
                    >
                      <TaskCard
                        isChild
                        onDrag={() => setIsDragingChildDisabled(false)}
                        onDrop={() => setIsDragingChildDisabled(true)}
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
    </DragDropContext>
  );
}
