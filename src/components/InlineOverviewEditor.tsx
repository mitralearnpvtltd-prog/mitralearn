import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";

interface InlineOverviewEditorProps {
  lessonId: string;
  initialContent: string;
  onContentChange?: (content: string) => void;
}

// Sanitize HTML while preserving Notion-compatible formatting
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'ul', 'ol', 'li',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'img',
      'blockquote', 'code', 'pre',
      'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'style',
      'target', 'rel', 'width', 'height'
    ],
    ALLOW_DATA_ATTR: false,
  });
};

// Style overrides for the editor content
const editorStyles = `
  .overview-editor-content h1 { font-size: 2rem; font-weight: bold; margin: 1.5rem 0 1rem; color: hsl(var(--foreground)); }
  .overview-editor-content h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.75rem; color: hsl(var(--foreground)); }
  .overview-editor-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: hsl(var(--foreground)); }
  .overview-editor-content p { margin: 0.75rem 0; color: hsl(var(--muted-foreground)); line-height: 1.7; }
  .overview-editor-content ul, .overview-editor-content ol { margin: 0.75rem 0; padding-left: 1.5rem; color: hsl(var(--muted-foreground)); }
  .overview-editor-content li { margin: 0.25rem 0; }
  .overview-editor-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
  .overview-editor-content th, .overview-editor-content td { border: 1px solid hsl(var(--border)); padding: 0.75rem 1rem; text-align: left; }
  .overview-editor-content th { background: hsl(var(--muted)); font-weight: 600; color: hsl(var(--foreground)); }
  .overview-editor-content td { color: hsl(var(--muted-foreground)); }
  .overview-editor-content tr:nth-child(even) { background: hsl(var(--muted) / 0.5); }
  .overview-editor-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem auto; display: block; }
  .overview-editor-content a { color: hsl(var(--primary)); text-decoration: underline; }
  .overview-editor-content blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; margin: 1rem 0; font-style: italic; color: hsl(var(--muted-foreground)); }
  .overview-editor-content code { background: hsl(var(--muted)); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; }
  .overview-editor-content pre { background: hsl(var(--muted)); padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; }
  .overview-editor-content pre code { background: none; padding: 0; }
  .overview-editor-content strong, .overview-editor-content b { color: hsl(var(--foreground)); font-weight: 600; }
`;

export const InlineOverviewEditor = ({ 
  lessonId, 
  initialContent,
  onContentChange 
}: InlineOverviewEditorProps) => {
  const { isAdmin, isLoading: isAdminLoading } = useAdminRole();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Update content when initial content changes
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // Handle paste from Notion or other sources
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Get HTML content from clipboard
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    if (html) {
      // Sanitize and insert HTML
      const sanitized = sanitizeHtml(html);
      document.execCommand('insertHTML', false, sanitized);
    } else if (text) {
      // Fall back to plain text
      document.execCommand('insertText', false, text);
    }
  }, []);

  // Save content to database
  const handleSave = async () => {
    if (!editorRef.current) return;
    
    setIsSaving(true);
    
    try {
      const newContent = sanitizeHtml(editorRef.current.innerHTML);
      
      // Check if overview resource already exists
      const { data: existingResource, error: fetchError } = await supabase
        .from('lesson_resources')
        .select('resource_id')
        .eq('lesson_id', lessonId)
        .eq('resource_type', 'Markdown')
        .eq('source', 'Manual')
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingResource) {
        // Update existing resource
        const { error: updateError } = await supabase
          .from('lesson_resources')
          .update({ 
            content: newContent,
            updated_at: new Date().toISOString()
          })
          .eq('resource_id', existingResource.resource_id);
        
        if (updateError) throw updateError;
      } else {
        // Create new resource
        const { error: insertError } = await supabase
          .from('lesson_resources')
          .insert({
            lesson_id: lessonId,
            resource_type: 'Markdown',
            source: 'Manual',
            content: newContent,
            resource_order: 0
          });
        
        if (insertError) throw insertError;
      }

      setContent(newContent);
      onContentChange?.(newContent);
      setIsEditing(false);
      toast.success('Overview saved successfully');
    } catch (error) {
      console.error('Error saving overview:', error);
      toast.error('Failed to save overview');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
    setIsEditing(false);
  };

  // Inject styles
  useEffect(() => {
    const styleId = 'overview-editor-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = editorStyles;
      document.head.appendChild(style);
    }
  }, []);

  // Empty state for admin
  const isEmpty = !content || content.trim() === '' || content === '<p></p>';

  // Non-admin view
  if (isAdminLoading) {
    return null;
  }

  if (!isAdmin) {
    if (isEmpty) return null;
    return (
      <div 
        className="overview-editor-content"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  // Admin view
  return (
    <div className="relative">
      {/* Edit button - only shown when not editing */}
      {!isEditing && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </div>
      )}

      {/* Editing toolbar */}
      {isEditing && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Editing Overview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
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
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Content area */}
      {isEditing ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onPaste={handlePaste}
          className="overview-editor-content min-h-[200px] p-4 border-2 border-dashed border-primary/30 rounded-lg focus:outline-none focus:border-primary bg-background"
          dangerouslySetInnerHTML={{ __html: isEmpty ? '' : sanitizeHtml(content) }}
          data-placeholder="Paste content from Notion or start typing..."
        />
      ) : isEmpty ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
        >
          Click to add overview
        </button>
      ) : (
        <div 
          className="overview-editor-content"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      )}

      {/* Placeholder style for empty editor */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
