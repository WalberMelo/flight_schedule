import { Database, Search } from "lucide-react";
import React from "react";

import { LogAnalyzer } from "@/components/logAnalizer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function LogDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-2 items-center">
            <Database className="w-4 h-4" />
            Aircraft log Maintenance
          </Button>
        </DialogTrigger>
        {/* <DialogContent className="w-full max-w-5xl max-h-[90vh] overflow-auto"> */}
        <DialogContent className="sm:max-w-5xl max-w-[calc(100%-2rem)] w-full">
          <DialogHeader>
            <DialogTitle className="flex">
              <Search className="w-4 h-4 mr-2" />
              <span>Dataset</span>
            </DialogTitle>
            <DialogDescription>
              Aircraft istorical Maintenance Dataset
            </DialogDescription>
          </DialogHeader>
          <LogAnalyzer />
        </DialogContent>
      </Dialog>
    </div>
  );
}
