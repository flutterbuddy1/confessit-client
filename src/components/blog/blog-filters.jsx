import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, RotateCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export function BlogFilters({ 
  searchQuery, 
  onSearchChange, 
  categories, 
  selectedCategories, 
  onCategoryToggle 
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          className="pl-9"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Categories
            {selectedCategories.length > 0 && (
              <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                {selectedCategories.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => onCategoryToggle(category.value)}
            >
              {category.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="outline">
        <RotateCw className="h-4 w-4" />
      </Button>
    </div>
  )
}