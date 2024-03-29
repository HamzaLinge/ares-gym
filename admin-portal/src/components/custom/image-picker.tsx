"use client";

import FormError from "@/components/form-error";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { returnFileSize } from "@/utils/helpers";
import { ImageIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useImperativeFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";

/**
 * `ImagePicker` is a React component for selecting images from the user's device.
 * It provides validation for file types, sizes, and the number of files. Selected images
 * can be previewed, cleared, or individually removed. It integrates with external forms
 * by updating the form state with selected files through a callback.
 *
 * Props:
 * @param {Function} setFormWithSelectedFiles - Callback function to update the parent form state with the selected files.
 *
 * @returns {React.Component} The `ImagePicker` component allows users to select, preview, and manage image files before submitting them.
 *
 * Usage:
 * <ImagePicker setFormWithSelectedFiles={handleFileSelection} />
 *
 * Note: This component uses `useImperativeFilePicker` from `use-file-picker` for handling file selection.
 */
export default function ImagePicker({
  setFormWithSelectedFiles,
}: {
  setFormWithSelectedFiles: (files?: File[]) => void;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(
    undefined,
  );
  const {
    openFilePicker,
    filesContent,
    loading,
    errors,
    plainFiles,
    clear,
    removeFileByReference,
  } = useImperativeFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 6 }),
      new FileTypeValidator(["jpg", "png", "jpeg"]),
      new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 /* 10 MB */ }),
    ],
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      setSelectedFiles(plainFiles);
    },
    onClear: () => {
      setSelectedFiles(undefined);
    },
    onFileRemoved: (removedFile, removedIndex) => {
      if (selectedFiles) {
        const filteredSelectedFiles = selectedFiles.filter(
          (file, index) => index !== removedIndex,
        );
        setSelectedFiles(filteredSelectedFiles);
      }
    },
  });

  useEffect(() => {
    setFormWithSelectedFiles(selectedFiles);
  }, [selectedFiles]);

  const ClearButton = (
    <Button
      type="button"
      onClick={() => clear()}
      variant="destructive"
      className="bg-destructive/80 flex items-center gap-x-2"
    >
      <TrashIcon className="h-4 w-4" />
      <span>Clear</span>
    </Button>
  );

  if (loading) {
    return <Loading />;
  }

  if (errors.length) {
    return (
      <div className="flex flex-col items-center gap-y-2">
        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            onClick={() => openFilePicker()}
            className="flex items-center gap-x-2"
            variant={"default"}
          >
            <ReloadIcon className="h-4 w-4" />
            <span>Oops, retry!</span>
          </Button>
          <p className="font-semibold">or</p>
          {ClearButton}
        </div>

        <FormError>
          <div className="">
            {errors.map((err) => renderErrorFilePicker(err.name))}
          </div>
        </FormError>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full items-center justify-center gap-x-2">
        <Button
          onClick={() => openFilePicker()}
          variant={"outline"}
          type="button"
          className="flex items-center gap-x-2"
        >
          <ImageIcon className="h-4 w-4" />
          <span>Add Thumbnails</span>
        </Button>
        {plainFiles.length > 0 && (
          <>
            <p className="font-semibold">or</p>
            <Button
              type="button"
              onClick={() => clear()}
              variant="destructive"
              className="bg-destructive/80 flex items-center gap-x-2"
            >
              <TrashIcon className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </>
        )}
      </div>
      {plainFiles.map((file, i) => (
        <div
          key={`${file.name}-i`}
          className="bg-muted flex items-center justify-between rounded p-2"
        >
          <div className="flex items-center gap-x-2">
            <div className="border-background relative aspect-square w-20 border-2">
              <Image
                src={filesContent[i]?.content}
                alt={file.name}
                fill
                style={{ objectFit: "cover" }}
                sizes={"100px"}
              />
            </div>
            <p className="flex items-center gap-x-2 text-sm">
              {file.name}, {returnFileSize(file.size)}
            </p>
          </div>

          <Button
            onClick={() => removeFileByReference(file)}
            variant="destructive"
            className="bg-destructive/80 ml-4 aspect-square p-1"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

const renderErrorFilePicker = (name: string) => {
  let text = "Something went wrong!";
  switch (name) {
    case "FileTypeError":
      text = "Please, select only images!";
  }
  return <p key={name}>{text}</p>;
};
