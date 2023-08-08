type ListItem = {
  id: string | number;
  taskName: string;
  done: boolean;
};

interface ListProps extends ListItem {
  subtask?: ListItem[];
}

type CheckChangeProps = {
  type?: "inner" | "outer";
  parentIndex?: number;
  index: number;
};