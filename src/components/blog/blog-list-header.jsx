import { Button } from "@/components/ui/button"

export function BlogListHeader({ title, description, showCreateButton = false }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1>{title}</h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>
      {showCreateButton && (
        <Button className="w-full md:w-auto">
          Create New Post
        </Button>
      )}
    </div>
  )
}