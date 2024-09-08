export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  delta?: number;
  labels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}

export interface PaginationButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  className?: string;
}

export interface Instruction {
  key?: string;
  id: string;
  title: string;
  description: string | null;
  photo: string | null;
  icon: string | null;
  deleted?: boolean;
  videos?: Video[];
  services?: Service[];
}

export interface Video {
  id: string;
  title: string;
  url: string;
}
export interface Service {
  id: string;
  name: string;
}
