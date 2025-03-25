/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Controller, useForm } from "react-hook-form";
import { FaListOl, FaListUl } from "react-icons/fa";

export function TiptapEditor({
  setContent,
}: {
  setContent: (para?: string) => void;
}) {
  const { control, handleSubmit, setValue, getValues, formState } = useForm({
    defaultValues: { description: "" },
  });

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, OrderedList, ListItem],
    content: "",
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("description", editor.getHTML(), { shouldValidate: true });
    },
  });

  const onSubmit = (data: { description: string }) => {
    console.log("Submitted Data:", data);
    setContent(editor?.getHTML());
  };

  // Function to preserve spaces and line breaks in the output content
  const formatOutputContent = (html: string) => {
    return html.replace(/<p><\/p>/g, "<p>&nbsp;</p>"); // Replace empty paragraphs with a non-breaking space (or use <br />)
  };
  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="font-medium text-gray-700">Description *</Label>

            {/* Toolbar */}
            <div className="flex gap-2 border-b pb-2 mb-2">
              {/* Bold */}
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-1 hover:bg-transparent ${
                  editor?.isActive("bold")
                    ? "bg-transparent text-foreground"
                    : "text-gray-300 bg-transparent"
                }`}
              >
                <b>B</b>
              </Button>

              {/* Italic */}
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-1 hover:bg-transparent ${
                  editor?.isActive("italic")
                    ? "bg-transparent text-foreground"
                    : "text-gray-300 bg-transparent"
                }`}
              >
                <i>I</i>
              </Button>

              {/* Bullet List */}
              <Button
                type="button"
                onClick={() => {
                  if (editor?.isActive("orderedList")) {
                    editor.chain().focus().toggleOrderedList().run(); // Remove ordered list first
                  }
                  editor?.chain().focus().toggleBulletList().run(); // Then toggle bullet list
                }}
                className={`p-1 hover:bg-transparent ${
                  editor?.isActive("bulletList")
                    ? "bg-transparent text-foreground"
                    : "text-gray-300 bg-transparent"
                }`}
              >
                <FaListUl />
              </Button>

              {/* Ordered List */}
              <Button
                type="button"
                onClick={() => {
                  if (editor?.isActive("bulletList")) {
                    editor.chain().focus().toggleBulletList().run(); // Remove bullet list first
                  }
                  editor?.chain().focus().toggleOrderedList().run(); // Then toggle ordered list
                }}
                className={`p-1 hover:bg-transparent ${
                  editor?.isActive("orderedList")
                    ? "bg-transparent text-foreground"
                    : "text-gray-300 bg-transparent"
                }`}
              >
                <FaListOl />
              </Button>
            </div>

            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <div className="mt-2 border rounded-lg p-2 bg-white min-h-[150px]">
                  <EditorContent
                    editor={editor}
                    className="editor-content h-full" // Add a class for custom styling
                  />
                </div>
              )}
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Display the HTML content of description under the editor */}
          <div className="mt-4">
            <h3 className="text-lg font-medium">Input Value:</h3>
            <div
              className="p-2 mt-2 text-active"
              style={{
                whiteSpace: "pre-wrap", // Preserve spaces and line breaks
                wordBreak: "break-word", // Prevent long words from overflowing
                minHeight: "100px", // Ensure the div has a defined height
              }}
              dangerouslySetInnerHTML={{
                __html:
                  formatOutputContent(getValues("description")) || "notext",
              }}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function Tpp({ content }: { content: string }) {
  // Function to preserve spaces and line breaks in the output content
  const formatOutputContent = (html: string) => {
    return html.replace(/<p><\/p>/g, "<p>&nbsp;</p>"); // Replace empty paragraphs with a non-breaking space (or use <br />)
  };
  return (
    <div>
      <div
        className="p-2 mt-2 text-active"
        style={{
          whiteSpace: "pre-wrap", // Preserve spaces and line breaks
          wordBreak: "break-word", // Prevent long words from overflowing
          minHeight: "100px", // Ensure the div has a defined height
        }}
        dangerouslySetInnerHTML={{ __html: formatOutputContent(content) }}
      />
    </div>
  );
}
