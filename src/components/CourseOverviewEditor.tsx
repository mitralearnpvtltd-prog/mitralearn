import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Underline } from "@tiptap/extension-underline";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Save,
  X,
  Edit3,
  Plus,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CourseOverviewEditorProps {
  courseId: string;
  initialContent: string | null;
  isAdmin: boolean;
  onContentUpdate?: (content: string) => void;
}

// Configure DOMPurify to allow safe tags
const sanitizeConfig = {
  ALLOWED_TAGS: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "strong", "em", "u", "s",
    "ul", "ol", "li",
    "table", "thead", "tbody", "tr", "th", "td",
    "a", "img",
    "blockquote", "pre", "code",
    "div", "span",
  ],
  ALLOWED_ATTR: [
    "href", "target", "rel",
    "src", "alt", "width", "height",
    "class", "style",
    "colspan", "rowspan",
  ],
  ALLOW_DATA_ATTR: false,
};

const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, sanitizeConfig);
};

// Toolbar button component
const ToolbarButton = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) => (
  <Toggle
    size="sm"
    pressed={active}
    onPressedChange={onClick}
    title={title}
    className="h-8 w-8 p-0"
  >
    {children}
  </Toggle>
);

export const CourseOverviewEditor = ({
  courseId,
  initialContent,
  isAdmin,
  onContentUpdate,
}: CourseOverviewEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState(initialContent || "");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse w-full my-4",
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border p-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border p-2 bg-muted font-semibold",
        },
      }),
    ],
    content: content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent !== content && !isEditing) {
      editor.commands.setContent(initialContent || "");
      setContent(initialContent || "");
    }
  }, [initialContent, editor, isEditing]);

  // Toggle editable state when isEditing changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  const handleSave = useCallback(async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const sanitizedContent = sanitizeHTML(editor.getHTML());

      const { error } = await supabase
        .from("courses")
        .update({ overview_content: sanitizedContent })
        .eq("id", courseId);

      if (error) throw error;

      setContent(sanitizedContent);
      setIsEditing(false);
      onContentUpdate?.(sanitizedContent);
      
      toast({
        title: "Overview saved",
        description: "Course overview has been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving overview:", error);
      toast({
        title: "Error saving overview",
        description: "Failed to save the course overview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [editor, courseId, onContentUpdate]);

  const handleCancel = useCallback(() => {
    if (editor) {
      editor.commands.setContent(initialContent || "");
      setContent(initialContent || "");
    }
    setIsEditing(false);
  }, [editor, initialContent]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  // Read-only view for non-admins or when not editing
  if (!isAdmin) {
    if (!content) return null;
    
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            Course Overview
          </h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none course-overview-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
          />
        </CardContent>
      </Card>
    );
  }

  // Admin view
  return (
    <Card className={`mt-6 transition-all duration-200 ${isEditing ? "ring-2 ring-primary" : ""}`}>
      <CardContent className="p-6">
        {/* Header with Edit/Save buttons */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display font-bold text-foreground">
            Course Overview
          </h3>
          
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Overview
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Toolbar - only visible when editing */}
        {isEditing && editor && (
          <div className="flex flex-wrap items-center gap-1 p-2 mb-4 bg-muted/50 rounded-lg border border-border">
            {/* Headings */}
            <ToolbarButton
              active={editor.isActive("heading", { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("heading", { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("heading", { level: 4 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              title="Heading 4"
            >
              <Heading4 className="w-4 h-4" />
            </ToolbarButton>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Text formatting */}
            <ToolbarButton
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </ToolbarButton>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Lists */}
            <ToolbarButton
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Insert elements */}
            <ToolbarButton
              active={editor.isActive("link")}
              onClick={addLink}
              title="Add Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={addImage} title="Add Image">
              <ImageIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={addTable} title="Insert Table">
              <TableIcon className="w-4 h-4" />
            </ToolbarButton>
          </div>
        )}

        {/* Editor content */}
        {content || isEditing ? (
          <div
            className={`prose prose-sm dark:prose-invert max-w-none course-overview-content ${
              isEditing
                ? "min-h-[200px] p-4 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary/20"
                : ""
            }`}
          >
            <EditorContent editor={editor} />
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-12 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-8 h-8" />
            <span className="font-medium">Click to add course overview</span>
          </button>
        )}
      </CardContent>
    </Card>
  );
};
