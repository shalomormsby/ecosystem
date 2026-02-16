'use client'

import * as React from "react"
import { useDropzone, type Accept, type FileRejection } from "react-dropzone"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const fileUploadZoneVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer",
  {
    variants: {
      state: {
        idle: "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
        active: "border-primary bg-primary/5",
        reject: "border-destructive bg-destructive/5",
        disabled: "border-border/50 bg-muted/20 cursor-not-allowed opacity-60",
      },
      size: {
        sm: "px-4 py-6 gap-1",
        default: "px-6 py-10 gap-2",
        lg: "px-8 py-14 gap-3",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "default",
    },
  }
)

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  /** Accepted file types (MIME types) */
  accept?: Accept
  /** Max file size in bytes */
  maxSize?: number
  /** Max number of files */
  maxFiles?: number
  /** Allow multiple file selection */
  multiple?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Called when valid files are dropped/selected */
  onFilesSelected?: (files: File[]) => void
  /** Called when files are rejected */
  onFilesRejected?: (rejections: FileRejection[]) => void
  /** Label text */
  label?: string
  /** Description text shown in the drop zone */
  description?: string
  /** Size variant */
  size?: "sm" | "default" | "lg"
}

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="text-foreground-secondary"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
)

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function FileUpload({
  className,
  accept,
  maxSize,
  maxFiles = 0,
  multiple = false,
  disabled = false,
  onFilesSelected,
  onFilesRejected,
  label,
  description,
  size = "default",
  ...props
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [errors, setErrors] = React.useState<string[]>([])

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles
        setFiles(newFiles)
        onFilesSelected?.(newFiles)
      }
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.flatMap((rejection) =>
          rejection.errors.map((err) => `${rejection.file.name}: ${err.message}`)
        )
        setErrors(errorMessages)
        onFilesRejected?.(rejectedFiles)
      } else {
        setErrors([])
      }
    },
    [files, multiple, onFilesSelected, onFilesRejected]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    multiple,
    disabled,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected?.(newFiles)
  }

  const state = disabled
    ? "disabled"
    : isDragReject
      ? "reject"
      : isDragActive
        ? "active"
        : "idle"

  return (
    <div data-slot="file-upload" className={cn("space-y-3", className)} {...props}>
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}

      <div
        {...getRootProps()}
        className={cn(fileUploadZoneVariants({ state, size }))}
        role="button"
        aria-label={label ?? "Upload files"}
      >
        <input {...getInputProps()} />
        <UploadIcon />
        <p className="text-sm font-medium text-foreground">
          {isDragActive
            ? "Drop files here"
            : "Drag & drop files here, or click to browse"}
        </p>
        {description && (
          <p className="text-xs text-foreground-secondary">{description}</p>
        )}
        {maxSize && (
          <p className="text-xs text-foreground-secondary">
            Max size: {formatFileSize(maxSize)}
          </p>
        )}
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="space-y-1" role="alert">
          {errors.map((error, i) => (
            <p key={i} className="text-sm text-destructive">{error}</p>
          ))}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul data-slot="file-upload-list" className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <FileIcon />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-foreground-secondary">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="shrink-0 rounded-sm p-1 text-foreground-secondary hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Remove ${file.name}`}
              >
                <XIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload, fileUploadZoneVariants }
