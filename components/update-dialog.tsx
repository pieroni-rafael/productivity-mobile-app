"use client";

import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UpdateDialogProps {
  currentVersion: string;
  latestVersion: string;
  onUpdate: () => void;
  onDismiss: () => void;
}

const UpdateDialog = ({
  currentVersion,
  latestVersion,
  onUpdate,
  onDismiss,
}: UpdateDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={true} onOpenChange={onDismiss}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("update_available")}</DialogTitle>
          <DialogDescription>{t("update_description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("current")}</span>
            <Badge variant="secondary">{currentVersion}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("latest")}</span>
            <Badge variant="default">{latestVersion}</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{t("whats_new")}:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t("update_feature_1")}</li>
              <li>• {t("update_feature_2")}</li>
              <li>• {t("update_feature_3")}</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onDismiss}>
            {t("update_later")}
          </Button>
          <Button onClick={onUpdate}>{t("update_now")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;