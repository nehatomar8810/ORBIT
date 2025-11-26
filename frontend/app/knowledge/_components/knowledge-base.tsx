"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Brain,
  FileText,
  Tag,
  Upload,
  Edit,
  Trash2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  StickyNote,
} from "lucide-react"

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddingEntry, setIsAddingEntry] = useState(false)

  const knowledgeEntries = [
    {
      id: 1,
      title: "Company Meeting Room Booking Process",
      content:
        "To book a meeting room, use the Google Calendar integration. Select the room from the resources list and check availability before confirming.",
      category: "procedures",
      tags: ["meetings", "calendar", "booking"],
      lastUpdated: "2024-01-15",
      type: "procedure",
    },
    {
      id: 2,
      title: "Client Communication Guidelines",
      content:
        "Always CC the project manager on client emails. Use professional tone and include project reference numbers in subject lines.",
      category: "guidelines",
      tags: ["communication", "clients", "email"],
      lastUpdated: "2024-01-14",
      type: "guideline",
    },
    {
      id: 3,
      title: "Expense Reporting FAQ",
      content:
        "Q: How do I submit expenses? A: Use the expense management plugin to upload receipts and categorize expenses. Approval is automatic for amounts under $100.",
      category: "faq",
      tags: ["expenses", "finance", "receipts"],
      lastUpdated: "2024-01-13",
      type: "faq",
    },
    {
      id: 4,
      title: "Project Status Update Template",
      content:
        "Weekly status updates should include: 1) Completed tasks, 2) Upcoming milestones, 3) Blockers or risks, 4) Resource needs.",
      category: "templates",
      tags: ["projects", "status", "reporting"],
      lastUpdated: "2024-01-12",
      type: "template",
    },
    {
      id: 5,
      title: "Emergency Contact Information",
      content: "IT Support: ext. 1234, HR: ext. 5678, Security: ext. 9999. After hours emergency line: +1-555-0123.",
      category: "reference",
      tags: ["contacts", "emergency", "support"],
      lastUpdated: "2024-01-11",
      type: "reference",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "procedures", label: "Procedures" },
    { value: "guidelines", label: "Guidelines" },
    { value: "faq", label: "FAQ" },
    { value: "templates", label: "Templates" },
    { value: "reference", label: "Reference" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "procedure":
        return BookOpen
      case "guideline":
        return Lightbulb
      case "faq":
        return HelpCircle
      case "template":
        return FileText
      case "reference":
        return StickyNote
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "procedure":
        return "bg-blue-800/30 text-blue-300"
      case "guideline":
        return "bg-yellow-800/30 text-yellow-300"
      case "faq":
        return "bg-green-800/30 text-green-300"
      case "template":
        return "bg-purple-800/30 text-purple-300"
      case "reference":
        return "bg-orange-800/30 text-orange-300"
      default:
        return "bg-slate-800/30 text-slate-300"
    }
  }

  const filteredEntries = knowledgeEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Knowledge Base</h1>
          <p className="text-gray-400 mt-1">Manage your AI agent's knowledge and reference materials</p>
        </div>
        <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800/30 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Knowledge Entry</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new knowledge entry for your AI agent to reference
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter entry title"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-slate-300">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content" className="text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter the knowledge content"
                  rows={6}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="tags" className="text-slate-300">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g., meetings, calendar, booking"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingEntry(false)}
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black">
                  Save Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => {
          const TypeIcon = getTypeIcon(entry.type)
          return (
            <Card key={entry.id} className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-800/30">
                      <TypeIcon className="h-4 w-4 text-gray-300" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeColor(entry.type)}>{entry.type}</Badge>
                        <span className="text-xs text-slate-400">Updated {entry.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 line-clamp-3">{entry.content}</p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-800/30 text-slate-300 border-slate-600">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEntries.length === 0 && (
        <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <Brain className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No knowledge entries found</h3>
            <p className="text-slate-400">Try adjusting your search terms or add new entries</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default KnowledgeBase
