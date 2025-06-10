"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  loading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  canGoPrev,
  canGoNext,
  loading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between" data-testid="pagination">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!canGoPrev || loading}
          className="flex items-center gap-1"
          data-testid="next-previous-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext || loading}
          className="flex items-center gap-1"
          data-testid="next-page-btn"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
